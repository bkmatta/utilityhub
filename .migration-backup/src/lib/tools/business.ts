import { Tool } from '@/types/tool';

export const businessTools: Tool[] = [
  {
    id: 'invoice-generator',
    slug: 'invoice-generator',
    title: 'Invoice Generator',
    description: 'Create professional, print-ready invoices locally. Enter items and taxes to generate structured bills.',
    category: 'business',
    icon: 'FileSpreadsheet',
    seo: {
      title: 'Invoice Generator - Free Online Invoice Maker',
      description: 'Generate professional invoices locally. Compute subtotals, tax rates, and print or save as PDF instantly.',
      keywords: ['invoice generator', 'invoice maker', 'billing software', 'free invoice template', 'create invoices'],
      overview: 'Generating invoices document transactions for clients. This calculator lets you input client details and line items, calculating totals and compiling printable templates.',
      howToUse: ['Enter your company and client contact details.', 'Fill out invoice numbers and due dates.', 'Enter line items in Description | Cost | Quantity format.', 'Click calculate and print the resulting invoice.'],
      examples: [{ input: { company: 'Acme', client: 'Client Inc', items: 'Consulting | 100 | 5' }, output: { subtotal: 500, tax: 50, total: 550 }, explanation: 'Compiles invoice with line items, tax aggregates, and print buttons.' }],
      faqs: [{ question: 'How do I save it as a PDF?', answer: 'Click the Print button and select "Save as PDF" in your system printer destination settings.' }],
    },
    inputs: [
      { name: 'companyName', label: 'Company Name', type: 'text', defaultValue: '', placeholder: 'Acme Solutions' },
      { name: 'companyDetails', label: 'Company Address & Details', type: 'text', defaultValue: '', placeholder: '123 Tech Blvd, Suite 100\nCity, State 12345\ncontact@acmesolutions.com' },
      { name: 'clientName', label: 'Bill To (Client Name)', type: 'text', defaultValue: '', placeholder: 'Client Enterprises' },
      { name: 'clientDetails', label: 'Client Address & Details', type: 'text', defaultValue: '', placeholder: '456 Business Way\nCity, State 67890\nbilling@cliententerprises.com' },
      { name: 'invoiceNo', label: 'Invoice Number', type: 'text', defaultValue: '', placeholder: 'INV-2026-001' },
      { name: 'invoiceDate', label: 'Invoice Date', type: 'text', defaultValue: '', placeholder: '2026-06-07' },
      { name: 'dueDate', label: 'Due Date', type: 'text', defaultValue: '', placeholder: '2026-07-07' },
      { name: 'lineItems', label: 'Line Items (Format: Description | Rate | Qty)', type: 'text', defaultValue: '', placeholder: 'Software Consulting | 150 | 12\nCloud Server Hosting | 75 | 2\nMonthly Support retainer | 300 | 1' },
      { name: 'taxRate', label: 'Tax Rate (%)', type: 'number', defaultValue: 0, placeholder: '10' },
    ],
    outputs: [
      { name: 'invoiceHtml', label: 'Invoice Preview', type: 'html' },
    ],
    calculate: (inputs) => {
      const company = String(inputs.companyName || 'Acme Solutions');
      const companyAddr = String(inputs.companyDetails || '123 Tech Blvd, Suite 100\nCity, State 12345\ncontact@acmesolutions.com').replace(/\n/g, '<br/>');
      const client = String(inputs.clientName || 'Client Enterprises');
      const clientAddr = String(inputs.clientDetails || '456 Business Way\nCity, State 67890\nbilling@cliententerprises.com').replace(/\n/g, '<br/>');
      const invNo = String(inputs.invoiceNo || 'INV-2026-001');
      const invDate = String(inputs.invoiceDate || '2026-06-07');
      const due = String(inputs.dueDate || '2026-07-07');
      const taxRate = Number(inputs.taxRate || 0);

      // Parse items
      const itemsText = String(inputs.lineItems || '').trim();
      const itemsList = itemsText
        ? itemsText.split('\n').filter(line => line.trim())
        : [
            'Software Consulting | 150 | 12',
            'Cloud Server Hosting | 75 | 2',
            'Monthly Support retainer | 300 | 1'
          ];
      let subtotal = 0;
      let rowsHtml = '';

      itemsList.forEach((line) => {
        const parts = line.split('|').map(p => p.trim());
        const desc = parts[0] || 'Generic Item';
        const rate = Number(parts[1]) || 0;
        const qty = Number(parts[2]) || 1;
        const total = rate * qty;
        subtotal += total;

        rowsHtml += `
          <tr class="border-b border-zinc-200">
            <td class="py-2.5 text-xs text-zinc-700 font-sans">${desc}</td>
            <td class="py-2.5 text-xs text-zinc-650 font-mono text-center">${qty}</td>
            <td class="py-2.5 text-xs text-zinc-650 font-mono text-right">$${rate.toFixed(2)}</td>
            <td class="py-2.5 text-xs text-zinc-800 font-mono text-right font-semibold">$${total.toFixed(2)}</td>
          </tr>
        `;
      });

      const tax = subtotal * (taxRate / 100);
      const totalAmount = subtotal + tax;

      const html = `
        <div id="invoice-print-area" class="bg-white p-6 max-w-2xl mx-auto rounded-xl border border-zinc-200 shadow-sm text-zinc-850">
          <div class="flex justify-between items-start pb-6 border-b border-zinc-100">
            <div>
              <h2 class="text-lg font-black text-zinc-900 uppercase tracking-tight">${company}</h2>
              <p class="text-[10px] text-zinc-500 font-light mt-1">${companyAddr}</p>
            </div>
            <div class="text-right">
              <h1 class="text-xl font-black text-violet-650 tracking-tight">INVOICE</h1>
              <p class="text-xs font-mono font-semibold text-zinc-650 mt-1">${invNo}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 py-6 border-b border-zinc-100">
            <div>
              <span class="text-[10px] uppercase font-bold text-zinc-400">Bill To</span>
              <h3 class="text-xs font-bold text-zinc-800 mt-0.5">${client}</h3>
              <p class="text-[10px] text-zinc-500 font-light mt-0.5">${clientAddr}</p>
            </div>
            <div class="text-right space-y-1">
              <div>
                <span class="text-[9px] uppercase font-bold text-zinc-400">Date:</span>
                <span class="text-xs font-mono text-zinc-700 ml-1 font-medium">${invDate}</span>
              </div>
              <div>
                <span class="text-[9px] uppercase font-bold text-zinc-400">Due Date:</span>
                <span class="text-xs font-mono text-zinc-700 ml-1 font-medium">${due}</span>
              </div>
            </div>
          </div>

          <table class="w-full text-left my-6 border-collapse">
            <thead>
              <tr class="border-b-2 border-zinc-350 bg-zinc-50/50">
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500">Description</th>
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500 text-center w-16">Qty</th>
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500 text-right w-24">Rate</th>
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500 text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="flex justify-end pt-4">
            <div class="w-64 space-y-2 text-xs">
              <div class="flex justify-between text-zinc-500">
                <span>Subtotal:</span>
                <span class="font-mono font-medium">$${subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-zinc-500">
                <span>Tax (${taxRate}%):</span>
                <span class="font-mono font-medium">$${tax.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-base font-black text-zinc-900 border-t border-zinc-150 pt-2 mt-2">
                <span>Total Due:</span>
                <span class="font-mono text-violet-650">$${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-zinc-100 flex justify-between items-center no-print">
            <span class="text-[9px] text-zinc-400 italic">UtilityHub Invoice Generator</span>
            <button 
              type="button" 
              onclick="window.print()" 
              class="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
            >
              Print Invoice / Save PDF
            </button>
          </div>
        </div>
      `;

      return { invoiceHtml: html };
    },
  },
  {
    id: 'quotation-generator',
    slug: 'quotation-generator',
    title: 'Quotation Generator',
    description: 'Create professional pricing estimates and quotations for clients locally.',
    category: 'business',
    icon: 'FileText',
    seo: {
      title: 'Quotation Generator - Free Price Estimate Creator',
      description: 'Generate price estimates and quotes online. Input custom products and taxes, print or export instantly.',
      keywords: ['quotation generator', 'price estimate maker', 'free quote template', 'create quotation online'],
      overview: 'Pricing quotes outline estimated transaction rates for clients before starting work. This local generator constructs styled quotes.',
      howToUse: ['Enter details for your organization and target client.', 'Select quotation number and expiration dates.', 'Paste line items in Description | Rate | Qty format.', 'Download or print results.'],
      examples: [{ input: { company: 'Acme', client: 'John Doe', items: 'Development | 120 | 8' }, output: { subtotal: 960, tax: 96, total: 1056 }, explanation: 'Calculates project rates and generates estimate sheets.' }],
      faqs: [{ question: 'Can I add terms and conditions?', answer: 'Yes, write custom payment rules and validity periods inside the quotation details field.' }],
    },
    inputs: [
      { name: 'companyName', label: 'Company Name', type: 'text', defaultValue: '', placeholder: 'Acme Solutions' },
      { name: 'companyDetails', label: 'Company Address & Contact', type: 'text', defaultValue: '', placeholder: '123 Tech Blvd, Suite 100\nCity, State 12345\nsales@acmesolutions.com' },
      { name: 'clientName', label: 'Prepare For (Client Name)', type: 'text', defaultValue: '', placeholder: 'Prospective Client Ltd' },
      { name: 'clientDetails', label: 'Client Contact Info', type: 'text', defaultValue: '', placeholder: '789 Enterprise Blvd\nCity, State 90120\nprocurement@prospectiveclient.com' },
      { name: 'quoteNo', label: 'Quotation Number', type: 'text', defaultValue: '', placeholder: 'QT-2026-095' },
      { name: 'quoteDate', label: 'Quotation Date', type: 'text', defaultValue: '', placeholder: '2026-06-07' },
      { name: 'validUntil', label: 'Valid Until', type: 'text', defaultValue: '', placeholder: '2026-06-21' },
      { name: 'lineItems', label: 'Line Items (Format: Description | Rate | Qty)', type: 'text', defaultValue: '', placeholder: 'Custom Web Design | 1200 | 1\nDatabase Setup & Migrations | 150 | 6\nAPI Integration Suite | 80 | 10' },
      { name: 'taxRate', label: 'Tax Rate (%)', type: 'number', defaultValue: 0, placeholder: '10' },
      { name: 'terms', label: 'Terms & Conditions', type: 'text', defaultValue: '', placeholder: '1. 50% advance payment required upon quote approval.\n2. Work will be delivered within 14 business days.' },
    ],
    outputs: [
      { name: 'quoteHtml', label: 'Quotation Preview', type: 'html' },
    ],
    calculate: (inputs) => {
      const company = String(inputs.companyName || 'Acme Solutions');
      const companyAddr = String(inputs.companyDetails || '123 Tech Blvd, Suite 100\nCity, State 12345\nsales@acmesolutions.com').replace(/\n/g, '<br/>');
      const client = String(inputs.clientName || 'Prospective Client Ltd');
      const clientAddr = String(inputs.clientDetails || '789 Enterprise Blvd\nCity, State 90120\nprocurement@prospectiveclient.com').replace(/\n/g, '<br/>');
      const quoteNo = String(inputs.quoteNo || 'QT-2026-095');
      const qDate = String(inputs.quoteDate || '2026-06-07');
      const valid = String(inputs.validUntil || '2026-06-21');
      const taxRate = Number(inputs.taxRate || 0);
      const terms = String(inputs.terms || '1. 50% advance payment required upon quote approval.\n2. Work will be delivered within 14 business days.').replace(/\n/g, '<br/>');

      // Parse items
      const itemsText = String(inputs.lineItems || '').trim();
      const itemsList = itemsText
        ? itemsText.split('\n').filter(line => line.trim())
        : [
            'Custom Web Design | 1200 | 1',
            'Database Setup & Migrations | 150 | 6',
            'API Integration Suite | 80 | 10'
          ];
      let subtotal = 0;
      let rowsHtml = '';

      itemsList.forEach((line) => {
        const parts = line.split('|').map(p => p.trim());
        const desc = parts[0] || 'Consulting';
        const rate = Number(parts[1]) || 0;
        const qty = Number(parts[2]) || 1;
        const total = rate * qty;
        subtotal += total;

        rowsHtml += `
          <tr class="border-b border-zinc-200">
            <td class="py-2.5 text-xs text-zinc-700 font-sans">${desc}</td>
            <td class="py-2.5 text-xs text-zinc-650 font-mono text-center">${qty}</td>
            <td class="py-2.5 text-xs text-zinc-650 font-mono text-right">$${rate.toFixed(2)}</td>
            <td class="py-2.5 text-xs text-zinc-800 font-mono text-right font-semibold">$${total.toFixed(2)}</td>
          </tr>
        `;
      });

      const tax = subtotal * (taxRate / 100);
      const totalAmount = subtotal + tax;

      const html = `
        <div id="quote-print-area" class="bg-white p-6 max-w-2xl mx-auto rounded-xl border border-zinc-200 shadow-sm text-zinc-850">
          <div class="flex justify-between items-start pb-6 border-b border-zinc-100">
            <div>
              <h2 class="text-lg font-black text-zinc-900 uppercase tracking-tight">${company}</h2>
              <p class="text-[10px] text-zinc-500 font-light mt-1">${companyAddr}</p>
            </div>
            <div class="text-right">
              <h1 class="text-xl font-black text-cyan-650 tracking-tight">QUOTATION</h1>
              <p class="text-xs font-mono font-semibold text-zinc-650 mt-1">${quoteNo}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 py-6 border-b border-zinc-100">
            <div>
              <span class="text-[10px] uppercase font-bold text-zinc-400">Prepared For</span>
              <h3 class="text-xs font-bold text-zinc-800 mt-0.5">${client}</h3>
              <p class="text-[10px] text-zinc-500 font-light mt-0.5">${clientAddr}</p>
            </div>
            <div class="text-right space-y-1">
              <div>
                <span class="text-[9px] uppercase font-bold text-zinc-400">Quote Date:</span>
                <span class="text-xs font-mono text-zinc-700 ml-1 font-medium">${qDate}</span>
              </div>
              <div>
                <span class="text-[9px] uppercase font-bold text-zinc-400">Valid Until:</span>
                <span class="text-xs font-mono text-zinc-700 ml-1 font-medium">${valid}</span>
              </div>
            </div>
          </div>

          <table class="w-full text-left my-6 border-collapse">
            <thead>
              <tr class="border-b-2 border-zinc-350 bg-zinc-50/50">
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500">Description</th>
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500 text-center w-16">Qty</th>
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500 text-right w-24">Rate</th>
                <th class="py-2 text-[10px] uppercase font-bold text-zinc-500 text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="grid grid-cols-2 gap-4 pt-4">
            <div>
              <span class="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Terms</span>
              <p class="text-[9px] text-zinc-500 leading-relaxed font-light">${terms}</p>
            </div>
            <div class="flex justify-end">
              <div class="w-64 space-y-2 text-xs">
                <div class="flex justify-between text-zinc-500">
                  <span>Subtotal:</span>
                  <span class="font-mono font-medium">$${subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-zinc-500">
                  <span>Tax (${taxRate}%):</span>
                  <span class="font-mono font-medium">$${tax.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-base font-black text-zinc-900 border-t border-zinc-150 pt-2 mt-2">
                  <span>Estimate Total:</span>
                  <span class="font-mono text-cyan-650">$${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-4 border-t border-zinc-100 flex justify-between items-center no-print">
            <span class="text-[9px] text-zinc-400 italic">UtilityHub Quotation Generator</span>
            <button 
              type="button" 
              onclick="window.print()" 
              class="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
            >
              Print Quote / Save PDF
            </button>
          </div>
        </div>
      `;

      return { quoteHtml: html };
    },
  },
  {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Calculate your net take-home monthly salary by deducting taxes, pension contributions, and insurance.',
    category: 'business',
    icon: 'CreditCard',
    seo: {
      title: 'Salary Calculator - Calculate Net Take-Home Pay',
      description: 'Calculate your monthly take-home salary. Input basic salary, allowances, bonuses, and standard tax rates for breakdown results.',
      keywords: ['salary calculator', 'take home pay', 'monthly net salary', 'tax deduction calculator', 'net pay calculator'],
      overview: 'Gross salary comprises allowances and base pay. Subtracting progressive income taxes, social security, pension schemes, and insurance premiums determines the final net take-home salary.',
      formula: {
        expression: 'Net Salary = (Basic + Allowances + Bonuses) - (Tax Deductions + Insurance Deductions)',
        explanation: 'Basic salary plus allowances and bonuses constitute gross pay. Deductions are subtracted to yield net take-home.',
      },
      howToUse: ['Enter your basic monthly base salary.', 'Add monthly allowances and expected bonuses.', 'Define tax rate % and custom insurance deductions.', 'Click calculate to review net pay.'],
      examples: [{ input: { basic: 5000, allowances: 500, taxRate: 15, deductions: 250 }, output: { gross: 5500, taxAmount: 825, totalDeductions: 1075, netSalary: 4425 }, explanation: 'A gross salary of 5,500 with 15% tax and 250 other deductions yields 4,425 net take-home.' }],
      faqs: [{ question: 'Are bonuses taxed?', answer: 'Yes, bonuses are generally taxed as standard wage income depending on progressive brackets.' }],
    },
    inputs: [
      { name: 'basic', label: 'Basic Monthly Salary', type: 'number', defaultValue: 5000, unit: 'Currency', slider: { min: 500, max: 50000, step: 100 } },
      { name: 'allowances', label: 'Monthly Allowances', type: 'number', defaultValue: 500, unit: 'Currency', slider: { min: 0, max: 10000, step: 50 } },
      { name: 'bonuses', label: 'Monthly Bonus / Commissions', type: 'number', defaultValue: 0, unit: 'Currency', slider: { min: 0, max: 10000, step: 50 } },
      { name: 'taxRate', label: 'Income Tax Rate (%)', type: 'number', defaultValue: 12, unit: '%', slider: { min: 0, max: 50, step: 0.5 } },
      { name: 'deductions', label: 'Other Deductions (Pension, Insurance)', type: 'number', defaultValue: 200, unit: 'Currency', slider: { min: 0, max: 5000, step: 10 } },
    ],
    outputs: [
      { name: 'grossPay', label: 'Gross Monthly Pay', type: 'currency' },
      { name: 'taxAmount', label: 'Tax Deductions', type: 'currency' },
      { name: 'totalDeductions', label: 'Total Deductions', type: 'currency' },
      { name: 'netPay', label: 'Net Take-Home Salary', type: 'currency' },
    ],
    calculate: (inputs) => {
      const basic = Number(inputs.basic);
      const allowances = Number(inputs.allowances);
      const bonuses = Number(inputs.bonuses);
      const taxRate = Number(inputs.taxRate);
      const deductions = Number(inputs.deductions);

      const gross = basic + allowances + bonuses;
      const taxAmt = gross * (taxRate / 100);
      const totalDeduct = taxAmt + deductions;
      const net = gross - totalDeduct;

      return {
        grossPay: Math.round(gross * 100) / 100,
        taxAmount: Math.round(taxAmt * 100) / 100,
        totalDeductions: Math.round(totalDeduct * 100) / 100,
        netPay: Math.round(net * 100) / 100,
      };
    },
  },
  {
    id: 'profit-margin-calculator',
    slug: 'profit-margin-calculator',
    title: 'Profit Margin Calculator',
    description: 'Calculate gross profit, profit margin percentage, and markup percentage based on item cost and selling price.',
    category: 'business',
    icon: 'TrendingUp',
    seo: {
      title: 'Profit Margin Calculator - Calculate Markup & Margin',
      description: 'Compute business profit metrics. Calculate gross profit, gross margin %, and markup % easily online.',
      keywords: ['profit margin calculator', 'markup calculator', 'profitability calculator', 'gross profit margin'],
      overview: 'Gross margin is the ratio of gross profit to revenue (selling price). Markup is the ratio of gross profit to cost. Understanding both helps set pricing targets.',
      formula: {
        expression: 'Gross Margin = (Selling - Cost) / Selling * 100; Markup = (Selling - Cost) / Cost * 100',
        explanation: 'Margin is calculated relative to selling price; markup is calculated relative to cost price.',
      },
      howToUse: ['Enter the cost of the item/service (COGS).', 'Enter the target selling price.', 'Click calculate to review gross margin and markup percentages.'],
      examples: [{ input: { cost: 80, selling: 120 }, output: { profit: 40, margin: 33.33, markup: 50 }, explanation: 'An item costing 80 and sold for 120 generates 40 profit, which is a 33.33% profit margin and a 50% markup.' }],
      faqs: [{ question: 'What is a good profit margin?', answer: 'A good profit margin varies widely by industry; wholesale margins might be 15%, while retail or SaaS margins can exceed 70%.' }],
    },
    inputs: [
      { name: 'cost', label: 'Cost of Goods Sold (Cost)', type: 'number', defaultValue: 100, unit: 'Currency', slider: { min: 1, max: 10000, step: 10 } },
      { name: 'selling', label: 'Selling Price (Revenue)', type: 'number', defaultValue: 150, unit: 'Currency', slider: { min: 1, max: 20000, step: 10 } },
    ],
    outputs: [
      { name: 'profit', label: 'Gross Profit', type: 'currency' },
      { name: 'margin', label: 'Gross Margin', type: 'percentage' },
      { name: 'markup', label: 'Markup', type: 'percentage' },
    ],
    calculate: (inputs) => {
      const cost = Number(inputs.cost);
      const selling = Number(inputs.selling);

      if (cost <= 0 || selling <= 0) {
        return { profit: 0, margin: 0, markup: 0 };
      }

      const profit = selling - cost;
      const margin = (profit / selling) * 100;
      const markup = (profit / cost) * 100;

      return {
        profit: Math.round(profit * 100) / 100,
        margin: Math.round(margin * 100) / 100,
        markup: Math.round(markup * 100) / 100,
      };
    },
  },
];
