import { Tool, ToolCategory } from './types';

const financeTools: Tool[] = [
  {
    id: 'emi-calculator', slug: 'emi-calculator', title: 'EMI Calculator',
    description: 'Calculate monthly loan installments (EMI) with interest and amortization.',
    category: 'finance', icon: 'calculator',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'principal', label: 'Loan Amount', type: 'number', defaultValue: 1000000, unit: '₹', slider: { min: 10000, max: 10000000, step: 10000 } },
      { name: 'rate', label: 'Interest Rate (Annual %)', type: 'number', defaultValue: 8.5, unit: '%', slider: { min: 1, max: 30, step: 0.1 } },
      { name: 'tenure', label: 'Loan Tenure (Years)', type: 'number', defaultValue: 10, unit: 'yrs', slider: { min: 1, max: 30, step: 1 } },
    ],
    outputs: [
      { name: 'emi', label: 'Monthly EMI', type: 'currency' },
      { name: 'totalInterest', label: 'Total Interest', type: 'currency' },
      { name: 'totalPayment', label: 'Total Payable', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal), r = Number(inputs.rate) / 12 / 100, n = Number(inputs.tenure) * 12;
      if (r === 0) return { emi: P / n, totalInterest: 0, totalPayment: P };
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      return { emi: Math.round(emi * 100) / 100, totalInterest: Math.round((totalPayment - P) * 100) / 100, totalPayment: Math.round(totalPayment * 100) / 100 };
    },
  },
  {
    id: 'sip-calculator', slug: 'sip-calculator', title: 'SIP Calculator',
    description: 'Calculate wealth gain and maturity amount for SIP mutual fund investments.',
    category: 'finance', icon: 'trending-up',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'monthlyInvestment', label: 'Monthly Investment', type: 'number', defaultValue: 5000, unit: '₹', slider: { min: 500, max: 100000, step: 500 } },
      { name: 'expectedReturn', label: 'Expected Annual Return (%)', type: 'number', defaultValue: 12, unit: '%', slider: { min: 1, max: 30, step: 0.5 } },
      { name: 'timePeriod', label: 'Time Period (Years)', type: 'number', defaultValue: 10, unit: 'yrs', slider: { min: 1, max: 40, step: 1 } },
    ],
    outputs: [
      { name: 'maturityAmount', label: 'Maturity Amount', type: 'currency' },
      { name: 'totalInvested', label: 'Total Invested', type: 'currency' },
      { name: 'wealthGain', label: 'Wealth Gain', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.monthlyInvestment), r = Number(inputs.expectedReturn) / 12 / 100, n = Number(inputs.timePeriod) * 12;
      const maturityAmount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const totalInvested = P * n;
      return { maturityAmount: Math.round(maturityAmount), totalInvested, wealthGain: Math.round(maturityAmount - totalInvested) };
    },
  },
  {
    id: 'compound-interest-calculator', slug: 'compound-interest-calculator', title: 'Compound Interest',
    description: 'Calculate how compound interest grows your savings over time.',
    category: 'finance', icon: 'percent',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'principal', label: 'Principal Amount', type: 'number', defaultValue: 10000, unit: '₹', slider: { min: 1000, max: 1000000, step: 1000 } },
      { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 10, unit: '%', slider: { min: 1, max: 30, step: 0.5 } },
      { name: 'time', label: 'Time (Years)', type: 'number', defaultValue: 5, unit: 'yrs', slider: { min: 1, max: 50, step: 1 } },
      { name: 'n', label: 'Compounding Frequency', type: 'select', defaultValue: 12, options: [{ label: 'Monthly', value: 12 }, { label: 'Quarterly', value: 4 }, { label: 'Half-Yearly', value: 2 }, { label: 'Annually', value: 1 }] },
    ],
    outputs: [
      { name: 'totalAmount', label: 'Total Amount', type: 'currency' },
      { name: 'interestEarned', label: 'Interest Earned', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal), r = Number(inputs.rate) / 100, t = Number(inputs.time), n = Number(inputs.n);
      const totalAmount = P * Math.pow(1 + r / n, n * t);
      return { totalAmount: Math.round(totalAmount * 100) / 100, interestEarned: Math.round((totalAmount - P) * 100) / 100 };
    },
  },
  {
    id: 'gst-calculator', slug: 'gst-calculator', title: 'GST Calculator',
    description: 'Add or remove GST from prices with multiple tax slabs.',
    category: 'finance', icon: 'file-text',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'amount', label: 'Amount', type: 'number', defaultValue: 1000, unit: '₹', slider: { min: 0, max: 100000, step: 100 } },
      { name: 'gstRate', label: 'GST Rate (%)', type: 'select', defaultValue: 18, options: [{ label: '5%', value: 5 }, { label: '12%', value: 12 }, { label: '18%', value: 18 }, { label: '28%', value: 28 }] },
      { name: 'type', label: 'Calculation Type', type: 'select', defaultValue: 'add', options: [{ label: 'Add GST', value: 'add' }, { label: 'Remove GST', value: 'remove' }] },
    ],
    outputs: [
      { name: 'preGst', label: 'Pre-GST Amount', type: 'currency' },
      { name: 'gstAmount', label: 'GST Amount', type: 'currency' },
      { name: 'postGst', label: 'Post-GST Amount', type: 'currency' },
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount), rate = Number(inputs.gstRate) / 100;
      if (inputs.type === 'add') {
        const gstAmount = amount * rate;
        return { preGst: amount, gstAmount: Math.round(gstAmount * 100) / 100, postGst: Math.round((amount + gstAmount) * 100) / 100 };
      } else {
        const preGst = amount / (1 + rate);
        const gstAmount = amount - preGst;
        return { preGst: Math.round(preGst * 100) / 100, gstAmount: Math.round(gstAmount * 100) / 100, postGst: amount };
      }
    },
  },
];

const healthTools: Tool[] = [
  {
    id: 'bmi-calculator', slug: 'bmi-calculator', title: 'BMI Calculator',
    description: 'Calculate Body Mass Index to determine your weight category.',
    category: 'health', icon: 'activity',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, unit: 'kg', slider: { min: 20, max: 200, step: 1 } },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170, unit: 'cm', slider: { min: 90, max: 240, step: 1 } },
    ],
    outputs: [
      { name: 'bmi', label: 'Your BMI', type: 'number' },
      { name: 'category', label: 'Weight Status', type: 'text' },
      { name: 'idealRange', label: 'Healthy BMI Range', type: 'text' },
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight), h = Number(inputs.height) / 100;
      if (h <= 0) return { bmi: 0, category: 'Invalid', idealRange: 'N/A' };
      const bmi = w / (h * h);
      let category = 'Normal Weight';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 25 && bmi < 30) category = 'Overweight';
      else if (bmi >= 30) category = 'Obese';
      return { bmi: Math.round(bmi * 100) / 100, category, idealRange: '18.5 - 24.9 kg/m²' };
    },
  },
  {
    id: 'bmr-calculator', slug: 'bmr-calculator', title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate (daily calories your body needs at rest).',
    category: 'health', icon: 'zap',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, slider: { min: 20, max: 200, step: 1 } },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170, slider: { min: 90, max: 240, step: 1 } },
      { name: 'age', label: 'Age (years)', type: 'number', defaultValue: 30, slider: { min: 10, max: 100, step: 1 } },
      { name: 'gender', label: 'Gender', type: 'select', defaultValue: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    ],
    outputs: [
      { name: 'bmr', label: 'BMR (Calories/Day)', type: 'number' },
      { name: 'sedentary', label: 'Sedentary', type: 'number' },
      { name: 'active', label: 'Active', type: 'number' },
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight), h = Number(inputs.height), a = Number(inputs.age);
      const bmr = inputs.gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
      return { bmr: Math.round(bmr), sedentary: Math.round(bmr * 1.2), active: Math.round(bmr * 1.55) };
    },
  },
  {
    id: 'calorie-calculator', slug: 'calorie-calculator', title: 'Calorie Calculator',
    description: 'Find your daily calorie needs based on your goals.',
    category: 'health', icon: 'flame',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, slider: { min: 20, max: 200, step: 1 } },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170, slider: { min: 90, max: 240, step: 1 } },
      { name: 'age', label: 'Age', type: 'number', defaultValue: 30, slider: { min: 10, max: 100, step: 1 } },
      { name: 'gender', label: 'Gender', type: 'select', defaultValue: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { name: 'activity', label: 'Activity Level', type: 'select', defaultValue: 1.375, options: [{ label: 'Sedentary', value: 1.2 }, { label: 'Light', value: 1.375 }, { label: 'Moderate', value: 1.55 }, { label: 'Active', value: 1.725 }] },
    ],
    outputs: [
      { name: 'maintenance', label: 'Maintenance', type: 'number' },
      { name: 'weightLoss', label: 'Weight Loss', type: 'number' },
      { name: 'weightGain', label: 'Weight Gain', type: 'number' },
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight), h = Number(inputs.height), a = Number(inputs.age), act = Number(inputs.activity);
      const bmr = inputs.gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
      const maintenance = Math.round(bmr * act);
      return { maintenance, weightLoss: maintenance - 500, weightGain: maintenance + 500 };
    },
  },
];

const generalTools: Tool[] = [
  {
    id: 'age-calculator', slug: 'age-calculator', title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    category: 'general', icon: 'calendar',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'birthDate', label: 'Date of Birth (YYYY-MM-DD)', type: 'text', defaultValue: '1990-01-01', placeholder: 'YYYY-MM-DD' },
    ],
    outputs: [
      { name: 'years', label: 'Years', type: 'number' },
      { name: 'months', label: 'Total Months', type: 'number' },
      { name: 'days', label: 'Total Days', type: 'number' },
    ],
    calculate: (inputs) => {
      const birth = new Date(inputs.birthDate as string);
      const now = new Date();
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) years--;
      const totalMonths = years * 12 + (now.getMonth() - birth.getMonth());
      const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      return { years, months: totalMonths, days: totalDays };
    },
  },
  {
    id: 'percentage-calculator', slug: 'percentage-calculator', title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage change, and percentage of a number.',
    category: 'general', icon: 'percent',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'value', label: 'Value', type: 'number', defaultValue: 50, slider: { min: 0, max: 1000, step: 1 } },
      { name: 'total', label: 'Total', type: 'number', defaultValue: 200, slider: { min: 1, max: 10000, step: 1 } },
    ],
    outputs: [
      { name: 'percentage', label: 'Percentage', type: 'percentage' },
      { name: 'remaining', label: 'Remaining Amount', type: 'number' },
      { name: 'remainingPct', label: 'Remaining %', type: 'percentage' },
    ],
    calculate: (inputs) => {
      const v = Number(inputs.value), t = Number(inputs.total);
      if (t === 0) return { percentage: 0, remaining: 0, remainingPct: 0 };
      const pct = (v / t) * 100;
      return { percentage: Math.round(pct * 100) / 100, remaining: t - v, remainingPct: Math.round((100 - pct) * 100) / 100 };
    },
  },
  {
    id: 'discount-calculator', slug: 'discount-calculator', title: 'Discount Calculator',
    description: 'Find the final price after discount and calculate savings.',
    category: 'general', icon: 'tag',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'originalPrice', label: 'Original Price', type: 'number', defaultValue: 1000, slider: { min: 1, max: 100000, step: 10 } },
      { name: 'discountPct', label: 'Discount (%)', type: 'number', defaultValue: 20, slider: { min: 0, max: 99, step: 1 } },
    ],
    outputs: [
      { name: 'finalPrice', label: 'Final Price', type: 'currency' },
      { name: 'savings', label: 'You Save', type: 'currency' },
      { name: 'discountAmount', label: 'Discount Amount', type: 'currency' },
    ],
    calculate: (inputs) => {
      const p = Number(inputs.originalPrice), d = Number(inputs.discountPct);
      const discountAmount = (p * d) / 100;
      return { finalPrice: p - discountAmount, savings: discountAmount, discountAmount };
    },
  },
];

const developerTools: Tool[] = [
  {
    id: 'json-formatter', slug: 'json-formatter', title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON code with syntax highlighting.',
    category: 'developer', icon: 'code',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'json', label: 'Raw JSON', type: 'text', defaultValue: '{"name":"UtilityHub","status":"active","toolsCount":60}', placeholder: 'Paste JSON here...' },
      { name: 'indent', label: 'Indent Spaces', type: 'select', defaultValue: 2, options: [{ label: '2 Spaces', value: 2 }, { label: '4 Spaces', value: 4 }] },
    ],
    outputs: [
      { name: 'formatted', label: 'Formatted JSON', type: 'json' },
      { name: 'valid', label: 'Valid JSON', type: 'text' },
    ],
    calculate: (inputs) => {
      try {
        const parsed = JSON.parse(inputs.json as string);
        return { formatted: JSON.stringify(parsed, null, Number(inputs.indent)), valid: 'Yes — Valid JSON' };
      } catch (e: any) {
        return { formatted: inputs.json as string, valid: `Error: ${e.message}` };
      }
    },
  },
  {
    id: 'base64-encoder-decoder', slug: 'base64-encoder-decoder', title: 'Base64 Codec',
    description: 'Encode or decode text using Base64 encoding.',
    category: 'developer', icon: 'shuffle',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'text', label: 'Input Text', type: 'text', defaultValue: 'Hello, UtilityHub!', placeholder: 'Enter text...' },
      { name: 'mode', label: 'Mode', type: 'select', defaultValue: 'encode', options: [{ label: 'Encode to Base64', value: 'encode' }, { label: 'Decode from Base64', value: 'decode' }] },
    ],
    outputs: [
      { name: 'result', label: 'Output', type: 'text' },
    ],
    calculate: (inputs) => {
      try {
        if (inputs.mode === 'encode') {
          return { result: btoa(unescape(encodeURIComponent(inputs.text as string))) };
        } else {
          return { result: decodeURIComponent(escape(atob(inputs.text as string))) };
        }
      } catch (e: any) {
        return { result: `Error: ${e.message}` };
      }
    },
  },
  {
    id: 'uuid-generator', slug: 'uuid-generator', title: 'UUID Generator',
    description: 'Generate random UUID v4 identifiers for your projects.',
    category: 'developer', icon: 'hash',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'count', label: 'Number of UUIDs', type: 'number', defaultValue: 1, slider: { min: 1, max: 10, step: 1 } },
    ],
    outputs: [
      { name: 'uuids', label: 'Generated UUIDs', type: 'text' },
    ],
    calculate: (inputs) => {
      const count = Math.min(10, Math.max(1, Number(inputs.count)));
      const uuids = [];
      for (let i = 0; i < count; i++) {
        const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.floor(Math.random() * 16);
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        uuids.push(id);
      }
      return { uuids: uuids.join('\n') };
    },
  },
];

const converterTools: Tool[] = [
  {
    id: 'length-converter', slug: 'length-converter', title: 'Length Converter',
    description: 'Convert between meters, feet, inches, kilometers, and miles.',
    category: 'converters', icon: 'arrows-h',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'value', label: 'Value', type: 'number', defaultValue: 1, slider: { min: 0, max: 1000, step: 0.1 } },
      { name: 'from', label: 'From', type: 'select', defaultValue: 'meters', options: [{ label: 'Meters', value: 'meters' }, { label: 'Feet', value: 'feet' }, { label: 'Inches', value: 'inches' }, { label: 'Km', value: 'km' }, { label: 'Miles', value: 'miles' }, { label: 'Cm', value: 'cm' }] },
      { name: 'to', label: 'To', type: 'select', defaultValue: 'feet', options: [{ label: 'Meters', value: 'meters' }, { label: 'Feet', value: 'feet' }, { label: 'Inches', value: 'inches' }, { label: 'Km', value: 'km' }, { label: 'Miles', value: 'miles' }, { label: 'Cm', value: 'cm' }] },
    ],
    outputs: [{ name: 'result', label: 'Converted Value', type: 'number' }],
    calculate: (inputs) => {
      const toMeters: Record<string, number> = { meters: 1, feet: 0.3048, inches: 0.0254, km: 1000, miles: 1609.344, cm: 0.01 };
      const val = Number(inputs.value);
      const meters = val * (toMeters[inputs.from as string] || 1);
      const result = meters / (toMeters[inputs.to as string] || 1);
      return { result: Math.round(result * 1000000) / 1000000 };
    },
  },
  {
    id: 'temperature-converter', slug: 'temperature-converter', title: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    category: 'converters', icon: 'thermometer',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'value', label: 'Temperature', type: 'number', defaultValue: 100 },
      { name: 'from', label: 'From', type: 'select', defaultValue: 'celsius', options: [{ label: 'Celsius (°C)', value: 'celsius' }, { label: 'Fahrenheit (°F)', value: 'fahrenheit' }, { label: 'Kelvin (K)', value: 'kelvin' }] },
      { name: 'to', label: 'To', type: 'select', defaultValue: 'fahrenheit', options: [{ label: 'Celsius (°C)', value: 'celsius' }, { label: 'Fahrenheit (°F)', value: 'fahrenheit' }, { label: 'Kelvin (K)', value: 'kelvin' }] },
    ],
    outputs: [{ name: 'result', label: 'Converted Temperature', type: 'number' }],
    calculate: (inputs) => {
      const v = Number(inputs.value);
      let celsius = v;
      if (inputs.from === 'fahrenheit') celsius = (v - 32) * 5 / 9;
      else if (inputs.from === 'kelvin') celsius = v - 273.15;
      let result = celsius;
      if (inputs.to === 'fahrenheit') result = celsius * 9 / 5 + 32;
      else if (inputs.to === 'kelvin') result = celsius + 273.15;
      return { result: Math.round(result * 100) / 100 };
    },
  },
  {
    id: 'weight-converter', slug: 'weight-converter', title: 'Weight Converter',
    description: 'Convert between kilograms, pounds, grams, ounces, and more.',
    category: 'converters', icon: 'scale',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'value', label: 'Value', type: 'number', defaultValue: 1 },
      { name: 'from', label: 'From', type: 'select', defaultValue: 'kg', options: [{ label: 'Kilograms', value: 'kg' }, { label: 'Pounds', value: 'lbs' }, { label: 'Grams', value: 'g' }, { label: 'Ounces', value: 'oz' }] },
      { name: 'to', label: 'To', type: 'select', defaultValue: 'lbs', options: [{ label: 'Kilograms', value: 'kg' }, { label: 'Pounds', value: 'lbs' }, { label: 'Grams', value: 'g' }, { label: 'Ounces', value: 'oz' }] },
    ],
    outputs: [{ name: 'result', label: 'Converted Weight', type: 'number' }],
    calculate: (inputs) => {
      const toKg: Record<string, number> = { kg: 1, lbs: 0.453592, g: 0.001, oz: 0.0283495 };
      const kg = Number(inputs.value) * (toKg[inputs.from as string] || 1);
      const result = kg / (toKg[inputs.to as string] || 1);
      return { result: Math.round(result * 100000) / 100000 };
    },
  },
];

const businessTools: Tool[] = [
  {
    id: 'profit-margin-calculator', slug: 'profit-margin-calculator', title: 'Profit Margin',
    description: 'Calculate gross profit margin and markup percentage.',
    category: 'business', icon: 'dollar-sign',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'revenue', label: 'Revenue', type: 'number', defaultValue: 10000, slider: { min: 0, max: 1000000, step: 100 } },
      { name: 'cost', label: 'Cost', type: 'number', defaultValue: 7000, slider: { min: 0, max: 1000000, step: 100 } },
    ],
    outputs: [
      { name: 'profit', label: 'Gross Profit', type: 'currency' },
      { name: 'margin', label: 'Profit Margin', type: 'percentage' },
      { name: 'markup', label: 'Markup %', type: 'percentage' },
    ],
    calculate: (inputs) => {
      const r = Number(inputs.revenue), c = Number(inputs.cost);
      const profit = r - c;
      const margin = r > 0 ? (profit / r) * 100 : 0;
      const markup = c > 0 ? (profit / c) * 100 : 0;
      return { profit, margin: Math.round(margin * 100) / 100, markup: Math.round(markup * 100) / 100 };
    },
  },
  {
    id: 'roi-calculator', slug: 'roi-calculator', title: 'ROI Calculator',
    description: 'Calculate Return on Investment percentage and net profit.',
    category: 'business', icon: 'bar-chart-2',
    seo: { title: '', description: '', keywords: [], overview: '', howToUse: [], examples: [], faqs: [] },
    inputs: [
      { name: 'initialInvestment', label: 'Initial Investment', type: 'number', defaultValue: 10000, slider: { min: 0, max: 1000000, step: 100 } },
      { name: 'finalValue', label: 'Final Value', type: 'number', defaultValue: 15000, slider: { min: 0, max: 1000000, step: 100 } },
    ],
    outputs: [
      { name: 'roi', label: 'ROI', type: 'percentage' },
      { name: 'netProfit', label: 'Net Profit', type: 'currency' },
    ],
    calculate: (inputs) => {
      const init = Number(inputs.initialInvestment), final = Number(inputs.finalValue);
      const netProfit = final - init;
      const roi = init > 0 ? (netProfit / init) * 100 : 0;
      return { roi: Math.round(roi * 100) / 100, netProfit };
    },
  },
];

export const allTools: Tool[] = [...financeTools, ...healthTools, ...generalTools, ...developerTools, ...converterTools, ...businessTools];

const toolsBySlug = new Map<string, Tool>();
const toolsByCategory = new Map<string, Tool[]>();

allTools.forEach((tool) => {
  toolsBySlug.set(tool.slug, tool);
  const cat = toolsByCategory.get(tool.category) || [];
  cat.push(tool);
  toolsByCategory.set(tool.category, cat);
});

export function getToolBySlug(slug: string): Tool | undefined {
  return toolsBySlug.get(slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return toolsByCategory.get(category) || [];
}

export function searchTools(query: string): Tool[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allTools.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
}

export const CATEGORIES = [
  { slug: 'finance', label: 'Finance', icon: 'dollar-sign', color: '#10b981', bg: '#d1fae5' },
  { slug: 'health', label: 'Health', icon: 'heart', color: '#ef4444', bg: '#fee2e2' },
  { slug: 'general', label: 'General', icon: 'grid', color: '#f59e0b', bg: '#fef3c7' },
  { slug: 'converters', label: 'Converters', icon: 'refresh-cw', color: '#3b82f6', bg: '#dbeafe' },
  { slug: 'developer', label: 'Developer', icon: 'code', color: '#6366f1', bg: '#e0e7ff' },
  { slug: 'business', label: 'Business', icon: 'briefcase', color: '#06b6d4', bg: '#cffafe' },
];

export const TRENDING = ['bmi-calculator', 'emi-calculator', 'compound-interest-calculator', 'json-formatter', 'age-calculator', 'temperature-converter'];
