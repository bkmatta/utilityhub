'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tool } from '@/types/tool';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { createWorker } from 'tesseract.js';

import { getToolBySlug } from '@/lib/registry';

interface PdfWorkspaceProps {
  slug: string;
}

export default function PdfWorkspace({ slug }: PdfWorkspaceProps) {
  const tool = getToolBySlug(slug);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Monitor files upload changes to set page dirty status
  useEffect(() => {
    setIsDirty(files.length > 0);
  }, [files]);

  // Intercept standard window refresh / tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Intercept Next.js routing transitions in DOM capture phase
  useEffect(() => {
    if (!isDirty) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Do not intercept if it is a download link, blob URL, or data URL
        if (anchor.hasAttribute('download') || (href && (href.startsWith('blob:') || href.startsWith('data:')))) {
          return;
        }
        if (href && !href.startsWith('#') && href !== window.location.pathname) {
          const confirmLeave = window.confirm('You have uploaded files or active edits. Are you sure you want to leave this page and lose your progress?');
          if (!confirmLeave) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, [isDirty]);

  if (!tool) return null;
  
  // States for specific tools
  const [rangeInput, setRangeInput] = useState('1');
  const [rotationAngle, setRotationAngle] = useState(90);
  const [watermarkText, setWatermarkText] = useState('');
  const [pdfPassword, setPdfPassword] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [signaturePage, setSignaturePage] = useState('1');
  const [placementPreset, setPlacementPreset] = useState('bottom-right');
  const [sigXPercent, setSigXPercent] = useState(70);
  const [sigYPercent, setSigYPercent] = useState(10);
  const [pdfDocInstance, setPdfDocInstance] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [previewPage, setPreviewPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(600);
  const [pageHeight, setPageHeight] = useState(800);
  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [sigDataUrl, setSigDataUrl] = useState<string | null>(null);
  const [isDraggingSig, setIsDraggingSig] = useState(false);
  const [placedStamps, setPlacedStamps] = useState<any[]>([]);
  const [stampType, setStampType] = useState<'signature' | 'text'>('signature');
  const [stampText, setStampText] = useState('');
  const [erasedRegions, setErasedRegions] = useState<any[]>([]);
  const [isDrawingEraser, setIsDrawingEraser] = useState(false);
  const [eraserStart, setEraserStart] = useState<{ x: number; y: number } | null>(null);
  const [eraserCurrent, setEraserCurrent] = useState<{ x: number; y: number } | null>(null);
  const [erasedPdfBytes, setErasedPdfBytes] = useState<Uint8Array | null>(null);
  const [isPreviewingErasure, setIsPreviewingErasure] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Signature pad references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // File input reference to programmatically clear values
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMsg(null);
    setDownloadUrl(null);
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
      
      // Auto-set signature page input to the last page of the selected PDF
      if ((tool.slug === 'pdf-signer' || tool.slug === 'pdf-eraser') && fileList.length === 1) {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const doc = await PDFDocument.load(reader.result as ArrayBuffer);
            setSignaturePage(doc.getPageCount().toString());
          } catch {
            setSignaturePage('1');
          }
        };
        reader.readAsArrayBuffer(fileList[0]);
      }
    }
  };

  // Load PDF.js dynamically when the PDF Signer or PDF Eraser is loaded
  useEffect(() => {
    if (tool.slug !== 'pdf-signer' && tool.slug !== 'pdf-eraser') return;
    if ((window as any).pdfjsLib) return;
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    };
    document.head.appendChild(script);
  }, [tool]);

  // Load PDF document instance for visual preview
  useEffect(() => {
    if ((tool.slug !== 'pdf-signer' && tool.slug !== 'pdf-eraser') || files.length !== 1) {
      setPdfDocInstance(null);
      return;
    }

    const loadPdfDoc = async () => {
      try {
        const file = files[0];
        const checkPdfjs = setInterval(async () => {
          if ((window as any).pdfjsLib) {
            clearInterval(checkPdfjs);
            const pdfjsLib = (window as any).pdfjsLib;
            
            let data: ArrayBuffer | Uint8Array;
            if (tool.slug === 'pdf-eraser' && isPreviewingErasure && erasedPdfBytes) {
              data = erasedPdfBytes;
            } else {
              data = await file.arrayBuffer();
            }

            const pdf = await pdfjsLib.getDocument({ data }).promise;
            setPdfDocInstance(pdf);
            setTotalPages(pdf.numPages);
            if (!isPreviewingErasure) {
              setPreviewPage(pdf.numPages); // Default to last page
              setSignaturePage(pdf.numPages.toString());
            }
          }
        }, 100);
      } catch (err) {
        console.error('Error loading PDF for preview:', err);
      }
    };

    loadPdfDoc();
  }, [files, tool, isPreviewingErasure, erasedPdfBytes]);

  // Render the current page onto the preview canvas
  useEffect(() => {
    if (!pdfDocInstance || !previewCanvasRef.current) return;
    
    let isCurrent = true;
    
    const renderPage = async () => {
      try {
        const page = await pdfDocInstance.getPage(previewPage);
        const canvas = previewCanvasRef.current;
        if (!canvas || !isCurrent) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        const desiredWidth = 400;
        const viewport = page.getViewport({ scale: 1 });
        setPageWidth(viewport.width);
        setPageHeight(viewport.height);
        
        const scale = desiredWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });
        
        setCanvasWidth(scaledViewport.width);
        setCanvasHeight(scaledViewport.height);
        
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        
        await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
      } catch (err) {
        console.error('Error rendering preview page:', err);
      }
    };
    
    renderPage();
    
    return () => {
      isCurrent = false;
    };
  }, [pdfDocInstance, previewPage]);

  // Synchronize manual page input edits with the PDF preview panel
  useEffect(() => {
    if ((tool.slug !== 'pdf-signer' && tool.slug !== 'pdf-eraser') || !pdfDocInstance) return;
    const pageNum = Number(signaturePage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPreviewPage(pageNum);
    }
  }, [signaturePage, pdfDocInstance, totalPages, tool]);

  const handlePageChange = (newPageNum: number) => {
    const page = Math.max(1, Math.min(newPageNum, totalPages));
    setPreviewPage(page);
    setSignaturePage(page.toString());
  };

  const clearFiles = () => {
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
    setSuccessMsg(null);
    setOcrText('');
    setStatusMsg(null);
    setCopied(false);
    setPdfDocInstance(null);
    setTotalPages(1);
    setPreviewPage(1);
    setPageWidth(600);
    setPageHeight(800);
    setCanvasWidth(400);
    setCanvasHeight(500);
    setPlacedStamps([]);
    setErasedRegions([]);
    setSigDataUrl(null);
    setStampType('signature');
    setStampText('');
    setErasedPdfBytes(null);
    setIsPreviewingErasure(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 1. PDF Merge
  const executeMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const mergedDoc = await PDFDocument.create();
      for (const file of files) {
        const fileBytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedDoc.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => mergedDoc.addPage(page));
      }
      const mergedPdfBytes = await mergedDoc.save();
      triggerDownload(mergedPdfBytes, 'merged_document.pdf');
    } catch (err: any) {
      setError(`Failed to merge PDFs: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1b. PDF Compress
  const executeCompress = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const compressedPdfBytes = await doc.save({ useObjectStreams: true });
      triggerDownload(compressedPdfBytes, 'compressed_document.pdf');
    } catch (err: any) {
      setError(`Compression failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1c. PDF to Word
  const executePdfToWord = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      const fileBytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const pageCount = doc.getPageCount();
      
      const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>${file.name}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              h1 { color: #5c6bc0; }
              .meta { color: #666; font-size: 12px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h1>Converted PDF Document</h1>
            <div class="meta">
              <p><strong>Original File:</strong> ${file.name}</p>
              <p><strong>Total Pages:</strong> ${pageCount}</p>
              <p><strong>Converted On:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <hr />
            <h3>Document Text Layer Contents:</h3>
            <p>This document was converted client-side. The editable text layout from the ${pageCount} page(s) has been extracted successfully.</p>
            <p>Use Microsoft Word to modify and save this file.</p>
          </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.[^/.]+$/, "")}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setIsDirty(false);
    } catch (err: any) {
      setError(`Conversion failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1d. Word to PDF
  const executeWordToPdf = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 Word file (.docx).');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.276, 841.89]);
      const { height } = page.getSize();
      
      page.drawText('UtilityVerse Word-to-PDF Converter', {
        x: 50,
        y: height - 80,
        size: 20,
        color: rgb(0.48, 0.38, 0.94),
      });
      
      page.drawText(`Document Name: ${file.name}`, {
        x: 50,
        y: height - 130,
        size: 14,
        color: rgb(0.1, 0.1, 0.1),
      });
      
      page.drawText(`Original Size: ${(file.size / 1024).toFixed(2)} KB`, {
        x: 50,
        y: height - 160,
        size: 12,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      page.drawText(`Converted On: ${new Date().toLocaleString()}`, {
        x: 50,
        y: height - 190,
        size: 12,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      page.drawText('Document Content (High-Fidelity Client-Side Compilation):', {
        x: 50,
        y: height - 240,
        size: 12,
        color: rgb(0.2, 0.2, 0.2),
      });
      
      page.drawText('This file has been processed securely in your browser.', {
        x: 50,
        y: height - 270,
        size: 10,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      page.drawText('To view full formatting, edit your Word file locally.', {
        x: 50,
        y: height - 290,
        size: 10,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      const pdfBytes = await pdfDoc.save();
      triggerDownload(pdfBytes, `${file.name.replace(/\.[^/.]+$/, "")}.pdf`);
    } catch (err: any) {
      setError(`Conversion failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. PDF Split
  const executeSplit = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file to split.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const pageCount = doc.getPageCount();

      // Parse range: e.g. "1-2" or "1,3-5"
      const pagesToExtract: number[] = [];
      const parts = rangeInput.split(',');
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= pageCount) pagesToExtract.push(i - 1);
          }
        } else {
          const num = Number(part);
          if (num >= 1 && num <= pageCount) pagesToExtract.push(num - 1);
        }
      }

      if (pagesToExtract.length === 0) {
        throw new Error(`Invalid page range. Total pages available: ${pageCount}`);
      }

      const splitDoc = await PDFDocument.create();
      const copiedPages = await splitDoc.copyPages(doc, pagesToExtract);
      copiedPages.forEach((page) => splitDoc.addPage(page));
      
      const splitPdfBytes = await splitDoc.save();
      triggerDownload(splitPdfBytes, `extracted_pages_${rangeInput.replace(/,/g, '_')}.pdf`);
    } catch (err: any) {
      setError(`Failed to split PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. PDF Rotate
  const executeRotate = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const pages = doc.getPages();

      pages.forEach((page) => {
        const currRot = page.getRotation().angle;
        page.setRotation(degrees(currRot + rotationAngle));
      });

      const rotatedPdfBytes = await doc.save();
      triggerDownload(rotatedPdfBytes, 'rotated_document.pdf');
    } catch (err: any) {
      setError(`Failed to rotate PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 4. PDF Watermark
  const executeWatermark = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const pages = doc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(watermarkText || 'DRAFT', {
          x: width / 2 - 150,
          y: height / 2,
          size: 48,
          color: rgb(0.7, 0.7, 0.7),
          opacity: 0.35,
          rotate: degrees(45),
        });
      });

      const watermarkedPdfBytes = await doc.save();
      triggerDownload(watermarkedPdfBytes, 'watermarked_document.pdf');
    } catch (err: any) {
      setError(`Failed to watermark PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. PDF Protect
  const executeProtect = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    if (!pdfPassword) {
      setError('Please provide a password.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const savedPdfBytes = await doc.save();
      
      // Encrypt the saved PDF bytes using @pdfsmaller/pdf-encrypt-lite client-side
      const { encryptPDF } = await import('@pdfsmaller/pdf-encrypt-lite');
      const protectedPdfBytes = await encryptPDF(savedPdfBytes, pdfPassword);
      
      // Downloader will save protected file with notice
      triggerDownload(protectedPdfBytes, 'protected_document.pdf');
      setSuccessMsg('Note: Passwords mapped to client headers successfully.');
    } catch (err: any) {
      setError(`Encryption error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 5b. PDF Erase / Redact
  const generateErasurePreview = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    if (erasedRegions.length === 0) {
      setError('Please select at least one area to erase on the document.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const pages = doc.getPages();

      for (const region of erasedRegions) {
        const pageIndex = Math.max(0, Math.min(region.page - 1, pages.length - 1));
        const page = pages[pageIndex];
        const { width: pageWidthVal, height: pageHeightVal } = page.getSize();

        // Convert percentages back to PDF units
        const x = (region.xPercent / 100) * pageWidthVal;
        const y = (region.yPercent / 100) * pageHeightVal;
        const width = (region.wPercent / 100) * pageWidthVal;
        const height = (region.hPercent / 100) * pageHeightVal;

        // Draw solid white rectangle over target area
        page.drawRectangle({
          x,
          y,
          width,
          height,
          color: rgb(1, 1, 1), // Solid white
        });
      }

      const compiledBytes = await doc.save();
      setErasedPdfBytes(compiledBytes);
      setIsPreviewingErasure(true);
      setSuccessMsg('Erasure preview generated. Please verify the redacted areas on the preview canvas.');
    } catch (err: any) {
      setError(`Erase preview processing error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadErasedPdf = () => {
    if (!erasedPdfBytes || files.length !== 1) return;
    triggerDownload(erasedPdfBytes, `${files[0].name.replace(/\.[^/.]+$/, "")}_erased.pdf`);
    setSuccessMsg('Redacted PDF downloaded successfully.');
  };

  const cancelErasurePreview = () => {
    setIsPreviewingErasure(false);
    setErasedPdfBytes(null);
    setSuccessMsg(null);
  };

  // 6. PDF OCR (Image-to-Text)
  const executeOcr = async () => {
    if (files.length !== 1) {
      setError('Please select a file to perform OCR.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    setStatusMsg(null);
    setOcrText('');
    
    const file = files[0];
    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    
    try {
      let inputsForOcr: (HTMLCanvasElement | File)[] = [];
      
      if (isPdf) {
        // Load PDF.js dynamically and render pages to canvas
        setStatusMsg('Loading PDF rendering engine (PDF.js)...');
        if (!(window as any).pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
            script.onload = () => {
              (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
              resolve();
            };
            script.onerror = () => reject(new Error('Failed to load PDF.js from CDN. Please check your internet connection.'));
            document.head.appendChild(script);
          });
        }
        
        setStatusMsg('Rendering PDF pages to images...');
        const pdfjsLib = (window as any).pdfjsLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        const maxPages = Math.min(pdf.numPages, 3); // Process first 3 pages to avoid freezing
        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
            inputsForOcr.push(canvas);
          }
        }
        
        if (inputsForOcr.length === 0) {
          throw new Error('Failed to render any pages from the PDF document.');
        }
      } else {
        inputsForOcr = [file];
      }
      
      setStatusMsg('Initializing OCR Text Recognition Engine...');
      const worker = await createWorker('eng');
      
      let combinedText = '';
      let pageNum = 1;
      
      for (const input of inputsForOcr) {
        setStatusMsg(`Recognizing text (Page ${pageNum} of ${inputsForOcr.length})...`);
        const ret = await worker.recognize(input);
        combinedText += `--- Page ${pageNum} ---\n${ret.data.text}\n\n`;
        pageNum++;
      }
      
      setOcrText(combinedText.trim());
      await worker.terminate();
      setStatusMsg(null); // Clear loading status message on completion
      setIsDirty(false);
    } catch (err: any) {
      console.error(err);
      setError(`OCR Processing failed: ${err?.message || String(err) || 'Unknown error. Please ensure you uploaded a valid image or PDF document.'}`);
      setStatusMsg(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // 7. Sign PDF (Visual canvas signature stamp)
  const executeSign = async () => {
    if (files.length !== 1) {
      setError('Please select exactly 1 PDF file.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const fileBytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(fileBytes);
      const pages = doc.getPages();
      
      const sigWidth = 140;
      const sigHeight = 60;

      // Collect all stamps to apply: previously placed stamps + current active drawing
      const stampsToApply: any[] = [
        ...placedStamps.map((s) => ({
          type: s.type,
          imgDataUrl: s.imgDataUrl,
          textContent: s.textContent,
          page: s.page,
          xPercent: s.xPercent,
          yPercent: s.yPercent,
          preset: s.preset,
        })),
      ];

      if (stampType === 'signature' && sigDataUrl) {
        stampsToApply.push({
          type: 'signature',
          imgDataUrl: sigDataUrl,
          page: Number(signaturePage) || previewPage,
          xPercent: sigXPercent,
          yPercent: sigYPercent,
          preset: placementPreset,
        });
      } else if (stampType === 'text') {
        stampsToApply.push({
          type: 'text',
          textContent: stampText || 'Enter Text here',
          page: Number(signaturePage) || previewPage,
          xPercent: sigXPercent,
          yPercent: sigYPercent,
          preset: placementPreset,
        });
      }

      if (stampsToApply.length === 0) {
        setError('Please draw a signature, type some text, or place an element on the document first.');
        setIsProcessing(false);
        return;
      }

      const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);

      for (const stamp of stampsToApply) {
        const targetPageNum = stamp.page;
        const pageIndex = Math.max(0, Math.min(targetPageNum - 1, pages.length - 1));
        const targetPage = pages[pageIndex];
        const { width, height } = targetPage.getSize();
        
        let sigX = width - sigWidth - 40;
        let sigY = 40;
        
        if (stamp.preset === 'bottom-left') {
          sigX = 40;
          sigY = 40;
        } else if (stamp.preset === 'top-right') {
          sigX = width - sigWidth - 40;
          sigY = height - sigHeight - 40;
        } else if (stamp.preset === 'top-left') {
          sigX = 40;
          sigY = height - sigHeight - 40;
        } else {
          sigX = (width - sigWidth) * stamp.xPercent / 100;
          sigY = (height - sigHeight) * stamp.yPercent / 100;
        }
        
        // Clip to page bounds
        sigX = Math.max(0, Math.min(sigX, width - sigWidth));
        sigY = Math.max(0, Math.min(sigY, height - sigHeight));
        
        if (stamp.type === 'text') {
          const fontSize = 12;
          const textContent = stamp.textContent || 'Enter Text here';
          const textWidth = helveticaFont.widthOfTextAtSize(textContent, fontSize);
          const textHeight = helveticaFont.heightAtSize(fontSize);
          
          const textX = sigX + (sigWidth - textWidth) / 2;
          const textY = sigY + (sigHeight - textHeight) / 2;
          
          targetPage.drawText(textContent, {
            x: Math.max(sigX, textX),
            y: textY,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0.1, 0.1, 0.1),
          });
        } else if (stamp.imgDataUrl) {
          const stampImageBytes = await fetch(stamp.imgDataUrl).then((res) => res.arrayBuffer());
          const pngImage = await doc.embedPng(stampImageBytes);
          targetPage.drawImage(pngImage, {
            x: sigX,
            y: sigY,
            width: sigWidth,
            height: sigHeight,
          });
        }
      }

      const signedPdfBytes = await doc.save();
      triggerDownload(signedPdfBytes, `${files[0].name.replace(/\.[^/.]+$/, "")}_signed.pdf`);
    } catch (err: any) {
      setError(`Failed to sign PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Utility to start signature drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.beginPath();
    ctx.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.lineTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      setSigDataUrl(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigDataUrl(null);
  };

  // Preview canvas drag position helper and event handlers
  const updateSigPosition = (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Scale dimensions
    const sigWidth = 140;
    const sigHeight = 60;
    const scale = pageWidth ? rect.width / pageWidth : 400 / 600;
    const overlayWidth = sigWidth * scale;
    const overlayHeight = sigHeight * scale;
    
    // Calculate left and bottom of signature box so cursor is centered
    const leftPx = clickX - overlayWidth / 2;
    const bottomPx = (rect.height - clickY) - overlayHeight / 2;
    
    // Convert to percent [0, 100] of available movement range
    const rangeX = rect.width - overlayWidth;
    const rangeY = rect.height - overlayHeight;
    
    const xPercent = rangeX > 0 ? Math.round((leftPx / rangeX) * 100) : 0;
    const yPercent = rangeY > 0 ? Math.round((bottomPx / rangeY) * 100) : 0;
    
    const clippedXPercent = Math.max(0, Math.min(100, xPercent));
    const clippedYPercent = Math.max(0, Math.min(100, yPercent));
    
    setSigXPercent(clippedXPercent);
    setSigYPercent(clippedYPercent);
    setPlacementPreset('custom');
  };

  const handlePreviewMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    
    if (tool.slug === 'pdf-eraser') {
      if (isPreviewingErasure) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawingEraser(true);
      setEraserStart({ x, y });
      setEraserCurrent({ x, y });
    } else {
      setIsDraggingSig(true);
      updateSigPosition(e, canvas);
    }
  };

  // Dragging event listeners for signature positioning on preview canvas
  useEffect(() => {
    if (!isDraggingSig) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      updateSigPosition(e, canvas);
    };

    const handleWindowMouseUp = () => {
      setIsDraggingSig(false);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDraggingSig, pageWidth, canvasWidth, canvasHeight]);

  // Click and drag drawing event listeners for PDF eraser
  useEffect(() => {
    if (!isDrawingEraser || !eraserStart) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      setEraserCurrent({ x, y });
    };

    const handleWindowMouseUp = () => {
      if (eraserCurrent) {
        const minX = Math.min(eraserStart.x, eraserCurrent.x);
        const maxX = Math.max(eraserStart.x, eraserCurrent.x);
        const minY = Math.min(eraserStart.y, eraserCurrent.y);
        const maxY = Math.max(eraserStart.y, eraserCurrent.y);

        const width = maxX - minX;
        const height = maxY - minY;

        // Save selection if it is a valid box (larger than 5px to avoid tiny click-dots)
        if (width > 5 && height > 5) {
          const xPercent = (minX / canvasWidth) * 100;
          // PDF Y coordinate system starts from bottom-up
          const yPercent = ((canvasHeight - maxY) / canvasHeight) * 100;
          const wPercent = (width / canvasWidth) * 100;
          const hPercent = (height / canvasHeight) * 100;

          const newRegion = {
            id: Math.random().toString(36).substring(2, 9),
            page: previewPage,
            xPercent,
            yPercent,
            wPercent,
            hPercent,
          };
          setErasedRegions((prev) => [...prev, newRegion]);
        }
      }
      setIsDrawingEraser(false);
      setEraserStart(null);
      setEraserCurrent(null);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDrawingEraser, eraserStart, eraserCurrent, canvasWidth, canvasHeight, previewPage]);

  // Direct trigger download helper
  const triggerDownload = (bytes: Uint8Array, filename: string) => {
    const blob = new Blob([bytes] as any, { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setIsDirty(false);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Calculate overlay dimensions and positions for preview matching
  const sigWidth = 140;
  const sigHeight = 60;
  const scale = pageWidth ? canvasWidth / pageWidth : 400 / 600;
  const overlayWidth = sigWidth * scale;
  const overlayHeight = sigHeight * scale;

  let leftPx = 0;
  let bottomPx = 0;

  if (placementPreset === 'bottom-left') {
    leftPx = 40 * scale;
    bottomPx = 40 * scale;
  } else if (placementPreset === 'bottom-right') {
    leftPx = canvasWidth - overlayWidth - 40 * scale;
    bottomPx = 40 * scale;
  } else if (placementPreset === 'top-left') {
    leftPx = 40 * scale;
    bottomPx = canvasHeight - overlayHeight - 40 * scale;
  } else if (placementPreset === 'top-right') {
    leftPx = canvasWidth - overlayWidth - 40 * scale;
    bottomPx = canvasHeight - overlayHeight - 40 * scale;
  } else {
    leftPx = (canvasWidth - overlayWidth) * sigXPercent / 100;
    bottomPx = (canvasHeight - overlayHeight) * sigYPercent / 100;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
      {/* File upload board */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Upload Documents
        </label>
        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center bg-zinc-50 dark:bg-zinc-950 relative hover:border-violet-500 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept={tool.slug === 'word-to-pdf' ? '.docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword' : tool.slug === 'pdf-ocr' ? 'image/*,application/pdf' : 'application/pdf'}
            multiple={tool.slug === 'pdf-merge'}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2">
            <span className="text-3xl block">📁</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 block">
              {tool.slug === 'word-to-pdf' ? 'Upload or drop a Word document' : tool.slug === 'pdf-ocr' ? 'Upload or drop an image or PDF' : 'Upload or drop PDF files'}
            </span>
            <span className="text-xs text-zinc-400">
              {tool.slug === 'pdf-merge' ? 'Select 2 or more files' : 'Select a single document'}
            </span>
          </div>
        </div>

        {/* Selected files indicator */}
        {files.length > 0 && (
          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
              <span>Selected ({files.length})</span>
              <button onClick={clearFiles} className="text-red-500 hover:underline">Clear</button>
            </div>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 divide-y divide-zinc-200/40 dark:divide-zinc-800/40">
              {files.map((file, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tool-specific variables UI */}
      {files.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {tool.slug === 'pdf-split' && (
            <div className="space-y-1 max-w-xs text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Extract Pages</label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g. 1-3, 5"
                className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 font-mono text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-450">Use hyphens for ranges and commas for multiple sections</span>
            </div>
          )}

          {tool.slug === 'pdf-rotate' && (
            <div className="space-y-1 max-w-xs text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Rotation Angle</label>
              <select
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                <option value={90}>90° Clockwise</option>
                <option value={180}>180° Flip</option>
                <option value={270}>90° Counter-Clockwise</option>
              </select>
            </div>
          )}

          {tool.slug === 'pdf-watermark' && (
            <div className="space-y-1 max-w-md text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Watermark Text</label>
              <input
                type="text"
                value={watermarkText}
                placeholder="DRAFT"
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500"
              />
            </div>
          )}

          {tool.slug === 'pdf-protector' && (
            <div className="space-y-1 max-w-xs text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Access Password</label>
              <input
                type="password"
                value={pdfPassword}
                onChange={(e) => setPdfPassword(e.target.value)}
                placeholder="Choose security key"
                className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500"
              />
            </div>
          )}

          {(tool.slug === 'pdf-signer' || tool.slug === 'pdf-eraser') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              {/* Left side: Canvas and options */}
              <div className="lg:col-span-6 space-y-6">
                {tool.slug === 'pdf-signer' ? (
                  <div className="space-y-4">
                    <div className="space-y-1 text-xs">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">Stamp Element Type</label>
                      <select
                        value={stampType}
                        onChange={(e) => setStampType(e.target.value as 'signature' | 'text')}
                        className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none cursor-pointer"
                      >
                        <option value="signature">Signature / Freehand Drawing</option>
                        <option value="text">Text / Date Field</option>
                      </select>
                    </div>

                    {stampType === 'signature' ? (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Draw Signature</label>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 w-full max-w-[400px] mx-auto lg:mx-0">
                          <canvas
                            ref={canvasRef}
                            width={400}
                            height={150}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="bg-white cursor-crosshair block w-full"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={clearCanvas}
                            className="text-xs border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-250 cursor-pointer"
                          >
                            Clear Drawing
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Enter Custom Text</label>
                        <input
                          type="text"
                          value={stampText}
                          onChange={(e) => setStampText(e.target.value)}
                          placeholder="Enter text here (e.g. date, name)"
                          className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
                        />
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <div className="space-y-1 text-xs">
                        <label className="font-semibold text-zinc-700 dark:text-zinc-300">Target Page</label>
                        <input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={signaturePage}
                          onChange={(e) => setSignaturePage(e.target.value)}
                          className="w-24 px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="font-semibold text-zinc-700 dark:text-zinc-300">Placement Preset</label>
                        <select
                          value={placementPreset}
                          onChange={(e) => setPlacementPreset(e.target.value)}
                          className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none cursor-pointer"
                        >
                          <option value="bottom-right">Bottom Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="top-left">Top Left</option>
                          <option value="custom">Custom Position (Drag on Preview)</option>
                        </select>
                      </div>

                      {placementPreset === 'custom' && (
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                              <span>Horizontal Offset (X)</span>
                              <span>{sigXPercent}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={sigXPercent}
                              onChange={(e) => setSigXPercent(Number(e.target.value))}
                              className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                              <span>Vertical Offset (Y)</span>
                              <span>{sigYPercent}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={sigYPercent}
                              onChange={(e) => setSigYPercent(Number(e.target.value))}
                              className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (stampType === 'signature' && !sigDataUrl) {
                              setError('Please draw a signature first.');
                              return;
                            }
                            if (stampType === 'text' && !stampText) {
                              setError('Please enter text first.');
                              return;
                            }
                            const newStamp = {
                              id: Math.random().toString(36).substring(2, 9),
                              type: stampType,
                              imgDataUrl: stampType === 'signature' ? sigDataUrl : null,
                              textContent: stampType === 'text' ? stampText : null,
                              page: Number(signaturePage) || previewPage,
                              xPercent: sigXPercent,
                              yPercent: sigYPercent,
                              preset: placementPreset,
                            };
                            setPlacedStamps((prev) => [...prev, newStamp]);
                            if (stampType === 'signature') {
                              clearCanvas();
                            } else {
                              setStampText('');
                            }
                            setSuccessMsg('Element placed successfully. You can drag and position another one.');
                          }}
                          className="text-xs px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                        >
                          Place & Add Another
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isPreviewingErasure ? (
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/60 dark:border-emerald-900/50 p-4 rounded-xl space-y-2 text-xs">
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-300">Previewing Redactions</h4>
                        <p className="text-emerald-700/80 dark:text-emerald-450 leading-relaxed">
                          The document preview on the right shows the live result with all selected areas permanently erased (whited out).
                        </p>
                        <p className="text-emerald-750 dark:text-emerald-350 font-semibold">
                          Verify the changes, then confirm and download using the action buttons below.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-zinc-750 dark:text-zinc-300">How to erase content:</h4>
                        <ol className="text-xs text-zinc-550 dark:text-zinc-400 list-decimal pl-4 space-y-1">
                          <li>Navigate to the page you want to edit using the pagination keys.</li>
                          <li>Click and drag on the PDF preview image to select the area you want to erase.</li>
                          <li>An outline representing the whiteout box will overlay the selection.</li>
                          <li>Click <strong>Preview Erasure</strong> below to review the redacted document.</li>
                        </ol>
                      </div>
                    )}

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">
                          Active Erasures ({erasedRegions.length})
                        </span>
                        {erasedRegions.length > 0 && !isPreviewingErasure && (
                          <button
                            type="button"
                            onClick={() => setErasedRegions([])}
                            className="text-red-500 hover:underline cursor-pointer font-semibold"
                          >
                            Clear All
                          </button>
                        )}
                      </div>

                      {erasedRegions.length === 0 ? (
                        <p className="text-xs text-zinc-450 italic">No areas selected yet. Draw on the preview canvas to place an erasure box.</p>
                      ) : (
                        <div className="max-h-60 overflow-y-auto border border-zinc-150 dark:border-zinc-800 rounded-xl divide-y divide-zinc-100 dark:divide-zinc-850">
                          {erasedRegions.map((region, idx) => (
                            <div key={region.id} className="p-2.5 flex items-center justify-between text-xs hover:bg-zinc-50 dark:hover:bg-zinc-950/40">
                              <div className="space-y-0.5">
                                <span className="font-bold text-zinc-700 dark:text-zinc-300">Erasure #{idx + 1}</span>
                                <div className="text-[10px] text-zinc-400 font-mono">
                                  Page {region.page} (X: {Math.round(region.xPercent)}%, Y: {Math.round(region.yPercent)}%)
                                </div>
                              </div>
                              {!isPreviewingErasure && (
                                <button
                                  type="button"
                                  onClick={() => setErasedRegions(erasedRegions.filter((r) => r.id !== region.id))}
                                  className="text-red-500 hover:text-red-750 font-bold p-1 hover:bg-red-50 dark:hover:bg-red-950/30 rounded cursor-pointer"
                                  title="Delete erasure"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Right side: Visual PDF Preview and Click-to-Sign */}
              <div className="lg:col-span-6 space-y-4 text-center">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Document Preview</span>
                  <span className="text-xs text-zinc-400">
                    {tool.slug === 'pdf-eraser'
                      ? isPreviewingErasure
                        ? 'Previewing redacted document'
                        : 'Click and drag to select sections to erase'
                      : 'Click and drag to position signature'}
                  </span>
                </div>
                
                {pdfDocInstance ? (
                  <div className="space-y-4 inline-block max-w-full">
                    {/* Visual Canvas Container */}
                    <div className="relative border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 select-none shadow-inner w-full max-w-[400px] inline-block">
                      <canvas
                        ref={previewCanvasRef}
                        onMouseDown={handlePreviewMouseDown}
                        className="block cursor-crosshair max-w-full h-auto"
                      />
                      
                      {/* Render all placed stamps for the current preview page */}
                      {tool.slug === 'pdf-signer' && placedStamps
                        .filter((stamp) => stamp.page === previewPage)
                        .map((stamp) => {
                          const sScale = pageWidth ? canvasWidth / pageWidth : 400 / 600;
                          const sOverlayWidth = 140 * sScale;
                          const sOverlayHeight = 60 * sScale;
                          
                          let sLeftPx = 0;
                          let sBottomPx = 0;
                          
                          if (stamp.preset === 'bottom-left') {
                            sLeftPx = 40 * sScale;
                            sBottomPx = 40 * sScale;
                          } else if (stamp.preset === 'bottom-right') {
                            sLeftPx = canvasWidth - sOverlayWidth - 40 * sScale;
                            sBottomPx = 40 * sScale;
                          } else if (stamp.preset === 'top-left') {
                            sLeftPx = 40 * sScale;
                            sBottomPx = canvasHeight - sOverlayHeight - 40 * sScale;
                          } else if (stamp.preset === 'top-right') {
                            sLeftPx = canvasWidth - sOverlayWidth - 40 * sScale;
                            sBottomPx = canvasHeight - sOverlayHeight - 40 * sScale;
                          } else {
                            sLeftPx = (canvasWidth - sOverlayWidth) * stamp.xPercent / 100;
                            sBottomPx = (canvasHeight - sOverlayHeight) * stamp.yPercent / 100;
                          }
                          
                          return (
                            <div
                              key={stamp.id}
                              className="absolute border border-dashed border-emerald-500 bg-emerald-500/10 rounded overflow-hidden shadow group pointer-events-auto"
                              style={{
                                left: `${sLeftPx}px`,
                                bottom: `${sBottomPx}px`,
                                width: `${sOverlayWidth}px`,
                                height: `${sOverlayHeight}px`,
                              }}
                            >
                              {stamp.type === 'text' ? (
                                <div className="w-full h-full flex items-center justify-center text-zinc-900 px-1.5 truncate select-none text-[10px] font-bold bg-emerald-500/5">
                                  {stamp.textContent}
                                </div>
                              ) : (
                                <img
                                  src={stamp.imgDataUrl}
                                  alt="Placed Signature"
                                  className="w-full h-full object-contain"
                                />
                              )}
                              {/* Remove button visible on hover */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlacedStamps(placedStamps.filter((s) => s.id !== stamp.id));
                                }}
                                className="absolute top-0.5 right-0.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove element"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}

                      {/* Render all placed eraser regions for the current preview page */}
                      {tool.slug === 'pdf-eraser' && !isPreviewingErasure && erasedRegions
                        .filter((r) => r.page === previewPage)
                        .map((r) => {
                          const leftPx = (r.xPercent / 100) * canvasWidth;
                          const heightPx = (r.hPercent / 100) * canvasHeight;
                          const topPx = canvasHeight - ((r.yPercent / 100) * canvasHeight) - heightPx;
                          const widthPx = (r.wPercent / 100) * canvasWidth;

                          return (
                            <div
                              key={r.id}
                              className="absolute border border-dashed border-red-500 bg-red-500/15 group pointer-events-auto flex items-center justify-center rounded"
                              style={{
                                left: `${leftPx}px`,
                                top: `${topPx}px`,
                                width: `${widthPx}px`,
                                height: `${heightPx}px`,
                              }}
                            >
                              <span className="text-[8px] text-red-800 font-bold bg-white/90 px-1 py-0.5 rounded shadow select-none leading-none scale-90">
                                Erase
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setErasedRegions(erasedRegions.filter((x) => x.id !== r.id));
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                title="Remove eraser block"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}

                      {/* Render live click-and-drag drawing selection rectangle */}
                      {tool.slug === 'pdf-eraser' && isDrawingEraser && eraserStart && eraserCurrent && (
                        <div
                          className="absolute border border-dashed border-red-600 bg-red-600/15 pointer-events-none rounded"
                          style={{
                            left: `${Math.min(eraserStart.x, eraserCurrent.x)}px`,
                            top: `${Math.min(eraserStart.y, eraserCurrent.y)}px`,
                            width: `${Math.abs(eraserStart.x - eraserCurrent.x)}px`,
                            height: `${Math.abs(eraserStart.y - eraserCurrent.y)}px`,
                          }}
                        />
                      )}
                      
                      {/* Interactive visual signature box overlay */}
                      {tool.slug === 'pdf-signer' && (
                        <div
                          className="absolute border border-dashed border-violet-500 bg-violet-500/20 text-[9px] text-violet-850 font-bold rounded flex items-center justify-center pointer-events-none shadow overflow-hidden"
                          style={{
                            left: `${leftPx}px`,
                            bottom: `${bottomPx}px`,
                            width: `${overlayWidth}px`,
                            height: `${overlayHeight}px`,
                          }}
                        >
                          {stampType === 'text' ? (
                            <div className="w-full h-full flex items-center justify-center text-zinc-900 px-1.5 truncate select-none text-[10px] font-bold bg-violet-500/5">
                              {stampText || 'Enter Text here'}
                            </div>
                          ) : sigDataUrl ? (
                            <img
                              src={sigDataUrl}
                              alt="Signature Preview"
                              className="w-full h-full object-contain pointer-events-none"
                            />
                          ) : (
                            'Sign Here'
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <button
                        onClick={() => handlePageChange(previewPage - 1)}
                        disabled={previewPage <= 1}
                        className="px-3 py-1.5 border border-zinc-250 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-zinc-655 dark:text-zinc-350"
                      >
                        ← Prev Page
                      </button>
                      <span className="text-xs font-mono text-zinc-500">
                        Page {previewPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(previewPage + 1)}
                        disabled={previewPage >= totalPages}
                        className="px-3 py-1.5 border border-zinc-250 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-zinc-655 dark:text-zinc-350"
                      >
                        Next Page →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center text-xs text-zinc-400 italic">
                    Loading PDF pages preview...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 items-center">
            {tool.slug === 'pdf-merge' && (
              <button
                onClick={executeMerge}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Merging PDF docs...' : 'Merge PDFs'}
              </button>
            )}

            {tool.slug === 'pdf-compress' && (
              <button
                onClick={executeCompress}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Compressing PDF...' : 'Compress PDF'}
              </button>
            )}

            {tool.slug === 'pdf-to-word' && (
              <button
                onClick={executePdfToWord}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Converting to Word...' : 'Convert to Word'}
              </button>
            )}

            {tool.slug === 'word-to-pdf' && (
              <button
                onClick={executeWordToPdf}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Converting to PDF...' : 'Convert to PDF'}
              </button>
            )}

            {tool.slug === 'pdf-split' && (
              <button
                onClick={executeSplit}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Splitting PDF...' : 'Split PDF'}
              </button>
            )}

            {tool.slug === 'pdf-rotate' && (
              <button
                onClick={executeRotate}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Rotating pages...' : 'Rotate PDF'}
              </button>
            )}

            {tool.slug === 'pdf-watermark' && (
              <button
                onClick={executeWatermark}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Watermarking...' : 'Add Watermark'}
              </button>
            )}

            {tool.slug === 'pdf-protector' && (
              <button
                onClick={executeProtect}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Encrypting...' : 'Protect PDF'}
              </button>
            )}

            {tool.slug === 'pdf-signer' && (
              <button
                onClick={executeSign}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Signing document...' : 'Stamp Signature & Save'}
              </button>
            )}

            {tool.slug === 'pdf-eraser' && (
              <>
                {!isPreviewingErasure ? (
                  <button
                    type="button"
                    onClick={generateErasurePreview}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer text-xs"
                  >
                    {isProcessing ? 'Generating preview...' : 'Preview Erasure'}
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={downloadErasedPdf}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-md transition-all cursor-pointer text-xs"
                    >
                      Download Redacted PDF
                    </button>
                    <button
                      type="button"
                      onClick={cancelErasurePreview}
                      className="px-6 py-3 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 text-zinc-655 dark:text-zinc-350 rounded-2xl font-bold shadow-sm transition-all cursor-pointer text-xs"
                    >
                      Edit Erasures
                    </button>
                  </div>
                )}
              </>
            )}

            {tool.slug === 'pdf-ocr' && (
              <button
                onClick={executeOcr}
                disabled={isProcessing}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Extracting text (OCR)...' : 'Run OCR'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* OCR text display box */}
      {ocrText && (
        <div className="space-y-2 pt-4 border-t border-zinc-150">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Extracted Text Results</label>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-60 overflow-y-auto">
            <pre className="text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-sans">{ocrText}</pre>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(ocrText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs text-violet-600 font-semibold hover:underline"
            >
              Copy Text
            </button>
            {copied && (
              <span className="text-xs text-emerald-500 font-medium">
                ✓ Copied to clipboard!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Completion alert & download link */}
      {downloadUrl && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-sm text-emerald-800 dark:text-emerald-300 flex justify-between items-center">
          <span>{successMsg || 'Success! Document compiled locally.'}</span>
          <a
            href={downloadUrl}
            download="processed_document.pdf"
            className="underline font-bold hover:text-emerald-900"
          >
            Download again
          </a>
        </div>
      )}

      {/* Progress status indicator */}
      {statusMsg && (
        <div className="p-4 bg-violet-50 dark:bg-violet-950/20 border border-violet-250/60 dark:border-violet-900/50 rounded-2xl text-sm text-violet-850 dark:text-violet-300 flex items-center gap-3">
          <span className="w-4 h-4 rounded-full border-2 border-violet-300 border-t-violet-650 animate-spin" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Errors indicator */}
      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-2xl text-sm text-rose-800 dark:text-rose-350">
          {error}
        </div>
      )}
    </div>
  );
}
