

import React, { useState, useRef, useEffect } from 'react';
import { getToolBySlug } from '@/lib/registry';

interface ImageWorkspaceProps {
  slug: string;
}

export default function ImageWorkspace({ slug }: ImageWorkspaceProps) {
  const tool = getToolBySlug(slug);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Tool inputs states
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30);

  // Hidden references to store original aspect ratio and dimensions
  const originalDimsRef = useRef<{ w: number; h: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIsDirty(files.length > 0);
  }, [files]);

  // Intercept window unload warning
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

  // Intercept route change transitions
  useEffect(() => {
    if (!isDirty) return;
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (anchor.hasAttribute('download') || (href && (href.startsWith('blob:') || href.startsWith('data:')))) {
          return;
        }
        if (href && !href.startsWith('#') && href !== window.location.pathname) {
          const confirmLeave = window.confirm('You have uploaded files or active edits. Are you sure you want to leave this page?');
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

  // Load image dimensions upon file selection
  useEffect(() => {
    if (files.length !== 1) {
      originalDimsRef.current = null;
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      originalDimsRef.current = { w: img.width, h: img.height };
      setWidth(img.width);
      setHeight(img.height);
      URL.revokeObjectURL(url);
    };
  }, [files]);

  if (!tool) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMsg(null);
    setDownloadUrl(null);
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
    setSuccessMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio && originalDimsRef.current && val > 0) {
      const ratio = originalDimsRef.current.h / originalDimsRef.current.w;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio && originalDimsRef.current && val > 0) {
      const ratio = originalDimsRef.current.w / originalDimsRef.current.h;
      setWidth(Math.round(val * ratio));
    }
  };

  const triggerDownload = (blob: Blob, filename: string) => {
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

  // 1. Image Compressor
  const executeCompress = async () => {
    if (files.length !== 1) return;
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available.');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const savings = ((file.size - blob.size) / file.size * 100).toFixed(0);
            triggerDownload(blob, `compressed_${file.name.replace(/\.[^/.]+$/, "")}.jpg`);
            setSuccessMsg(`Image compressed successfully! Size reduced from ${(file.size / 1024).toFixed(1)} KB to ${(blob.size / 1024).toFixed(1)} KB (Saved ${savings}%).`);
          } else {
            setError('Compression failed.');
          }
          setIsProcessing(false);
          URL.revokeObjectURL(img.src);
        },
        'image/jpeg',
        quality / 100
      );
    } catch (err: any) {
      setError(`Error compressing image: ${err.message}`);
      setIsProcessing(false);
    }
  };

  // 2. Image Resizer
  const executeResize = async () => {
    if (files.length !== 1) return;
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available.');
      ctx.drawImage(img, 0, 0, width, height);

      const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const ext = file.type === 'image/png' ? 'png' : 'jpg';

      canvas.toBlob((blob) => {
        if (blob) {
          triggerDownload(blob, `resized_${file.name.replace(/\.[^/.]+$/, "")}.${ext}`);
          setSuccessMsg(`Image resized to ${width}x${height} px successfully.`);
        } else {
          setError('Resizing failed.');
        }
        setIsProcessing(false);
        URL.revokeObjectURL(img.src);
      }, type);
    } catch (err: any) {
      setError(`Error resizing image: ${err.message}`);
      setIsProcessing(false);
    }
  };

  // 3. Background Remover (Chroma key masking)
  const executeBgRemove = async () => {
    if (files.length !== 1) return;
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available.');
      ctx.drawImage(img, 0, 0);

      // Parse chroma key color
      const hex = bgColor.replace('#', '');
      const rTarget = parseInt(hex.substring(0, 2), 16) || 255;
      const gTarget = parseInt(hex.substring(2, 4), 16) || 255;
      const bTarget = parseInt(hex.substring(4, 6), 16) || 255;

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Tolerance criteria: mapping percentage to Euclidean color distance
      // Max distance is sqrt(255^2 * 3) ~ 441.67
      const maxDist = Math.sqrt(255 * 255 * 3);
      const threshold = (tolerance / 100) * maxDist;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const dist = Math.sqrt(
          (r - rTarget) * (r - rTarget) +
          (g - gTarget) * (g - gTarget) +
          (b - bTarget) * (b - bTarget)
        );

        if (dist <= threshold) {
          data[i + 3] = 0; // Transparent
        }
      }

      ctx.putImageData(imgData, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          triggerDownload(blob, `transparent_${file.name.replace(/\.[^/.]+$/, "")}.png`);
          setSuccessMsg('Background color removed and PNG downloaded successfully.');
        } else {
          setError('Background removal failed.');
        }
        setIsProcessing(false);
        URL.revokeObjectURL(img.src);
      }, 'image/png');
    } catch (err: any) {
      setError(`Background remover error: ${err.message}`);
      setIsProcessing(false);
    }
  };

  // 4. HEIC to JPG Converter
  const executeHeicToJpg = async () => {
    if (files.length !== 1) return;
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      
      // Load heic2any dynamically from CDN
      if (!(window as any).heic2any) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load HEIC decoder library.'));
          document.head.appendChild(script);
        });
      }

      const heic2any = (window as any).heic2any;
      const converted = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.85
      });

      const finalBlob = Array.isArray(converted) ? converted[0] : converted;
      triggerDownload(finalBlob, `${file.name.replace(/\.[^/.]+$/, "")}_converted.jpg`);
      setSuccessMsg('HEIC photo converted to JPEG successfully.');
    } catch (err: any) {
      setError(`HEIC conversion error: ${err.message || 'The uploaded file is not a valid HEIC format.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. WebP Converter
  const executeWebp = async () => {
    if (files.length !== 1) return;
    setIsProcessing(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available.');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          triggerDownload(blob, `${file.name.replace(/\.[^/.]+$/, "")}.webp`);
          setSuccessMsg('Image converted to WebP format successfully.');
        } else {
          setError('WebP conversion failed.');
        }
        setIsProcessing(false);
        URL.revokeObjectURL(img.src);
      }, 'image/webp');
    } catch (err: any) {
      setError(`WebP conversion error: ${err.message}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
      {/* File upload board */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Upload Image File
        </label>
        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center bg-zinc-50 dark:bg-zinc-950 relative hover:border-violet-500 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept={slug === 'heic-to-jpg' ? '.heic' : 'image/*'}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2">
            <span className="text-3xl block">🖼️</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 block">
              {slug === 'heic-to-jpg' ? 'Upload or drop a .heic image' : 'Upload or drop your image file'}
            </span>
            <span className="text-xs text-zinc-400">
              {slug === 'heic-to-jpg' ? 'Supports Apple HEIC format' : 'Supports PNG, JPEG, WebP, GIF'}
            </span>
          </div>
        </div>

        {/* Selected files indicator */}
        {files.length > 0 && (
          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
              <span>Selected Image</span>
              <button onClick={clearFiles} className="text-red-500 hover:underline">Clear</button>
            </div>
            <ul className="text-xs text-zinc-650 dark:text-zinc-400 divide-y divide-zinc-200/40 dark:divide-zinc-800/40">
              {files.map((file, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="font-mono">{(file.size / 1024).toFixed(1)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tool-specific variables UI */}
      {files.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {slug === 'image-compressor' && (
            <div className="space-y-2 max-w-xs text-xs">
              <div className="flex justify-between font-semibold text-zinc-700 dark:text-zinc-300">
                <span>Compression Quality</span>
                <span>{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-650"
              />
            </div>
          )}

          {slug === 'image-resizer' && (
            <div className="space-y-4 max-w-md text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Width (pixels)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Height (pixels)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none">
                <input
                  type="checkbox"
                  checked={maintainRatio}
                  onChange={(e) => setMaintainRatio(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-violet-600 focus:ring-violet-500"
                />
                <span className="text-xs text-zinc-650 dark:text-zinc-400">Lock Aspect Ratio Proportions</span>
              </label>
            </div>
          )}

          {slug === 'background-remover' && (
            <div className="space-y-4 max-w-md text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Target Backdrop Hex</label>
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-semibold text-zinc-700 dark:text-zinc-300">
                    <span>Color Tolerance</span>
                    <span>{tolerance}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    step={5}
                    value={tolerance}
                    onChange={(e) => setTolerance(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-650"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 items-center pt-2">
            {slug === 'image-compressor' && (
              <button
                onClick={executeCompress}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer text-xs"
              >
                {isProcessing ? 'Compressing...' : 'Compress Image'}
              </button>
            )}

            {slug === 'image-resizer' && (
              <button
                onClick={executeResize}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer text-xs"
              >
                {isProcessing ? 'Resizing...' : 'Resize Image'}
              </button>
            )}

            {slug === 'background-remover' && (
              <button
                onClick={executeBgRemove}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer text-xs"
              >
                {isProcessing ? 'Removing backdrop...' : 'Remove Background'}
              </button>
            )}

            {slug === 'heic-to-jpg' && (
              <button
                onClick={executeHeicToJpg}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer text-xs"
              >
                {isProcessing ? 'Converting HEIC...' : 'Convert to JPEG'}
              </button>
            )}

            {slug === 'webp-converter' && (
              <button
                onClick={executeWebp}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer text-xs"
              >
                {isProcessing ? 'Converting WebP...' : 'Convert to WebP'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion alert & download link */}
      {downloadUrl && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-sm text-emerald-800 dark:text-emerald-300 flex justify-between items-center">
          <span>{successMsg || 'Success! Image compiled locally.'}</span>
          <a
            href={downloadUrl}
            download="processed_image"
            className="underline font-bold hover:text-emerald-900"
          >
            Download again
          </a>
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
