import { Tool } from '@/types/tool';

export const generalTools: Tool[] = [
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes from birth date.',
    category: 'general',
    icon: 'Cake',
    seo: {
      title: 'Age Calculator - Calculate Exact Age Online',
      description: 'Find your exact age in years, months, weeks, days, hours, and minutes. Compute age differences easily.',
      keywords: ['age calculator', 'calculate age', 'how old am i', 'exact age calculator', 'birth date calculator'],
      overview: 'An age calculator determines the exact span between a start date (typically birth date) and an end date (usually today). Knowing your precise age in days or weeks can be useful for clinical milestones, retirement logs, or visa applications.',
      howToUse: ['Input your Date of Birth.', 'Optionally select a custom target date (default is Today).', 'View your exact age instantly.'],
      examples: [
        {
          input: { dob: '1995-05-15', targetDate: '2026-06-04' },
          output: { ageString: '31 Years, 0 Months, 20 Days', totalDays: 11343 },
          explanation: 'A person born on May 15th, 1995 is exactly 31 years and 20 days old on June 4th, 2026.',
        },
      ],
      faqs: [
        { question: 'Does this calculator factor in leap years?', answer: 'Yes, the calculation counts exact calendar years, months, and days, including leap years.' },
      ],
    },
    inputs: [
      { name: 'dob', label: 'Date of Birth', type: 'text', defaultValue: '', placeholder: '1995-01-01', helpText: 'Format: YYYY-MM-DD' },
      { name: 'targetDate', label: 'Age at Date', type: 'text', defaultValue: '', placeholder: new Date().toISOString().split('T')[0], helpText: 'Format: YYYY-MM-DD' },
    ],
    outputs: [
      { name: 'ageString', label: 'Exact Age', type: 'text' },
      { name: 'totalDays', label: 'Age in Days', type: 'text', unit: ' days' },
      { name: 'totalWeeks', label: 'Age in Weeks', type: 'text', unit: ' weeks' },
    ],
    calculate: (inputs) => {
      const birth = new Date(inputs.dob || '1995-01-01');
      const target = new Date(inputs.targetDate || new Date().toISOString().split('T')[0]);

      if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
        return { ageString: 'Invalid Dates', totalDays: 'N/A', totalWeeks: 'N/A' };
      }

      if (target < birth) {
        return { ageString: 'Target date is before birth date', totalDays: '0', totalWeeks: '0' };
      }

      const diffTime = target.getTime() - birth.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = Math.floor(diffDays / 7);

      let years = target.getFullYear() - birth.getFullYear();
      let months = target.getMonth() - birth.getMonth();
      let days = target.getDate() - birth.getDate();

      if (days < 0) {
        months -= 1;
        // Find previous month's total days
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      return {
        ageString: `${years} Years, ${months} Months, ${days} Days`,
        totalDays: diffDays.toLocaleString(),
        totalWeeks: diffWeeks.toLocaleString(),
      };
    },
  },
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    description: 'Calculate the total number of days, weeks, months, and years between two dates.',
    category: 'general',
    icon: 'CalendarRange',
    seo: {
      title: 'Date Difference Calculator - Duration Between Dates',
      description: 'Compute the elapsed time between two dates. Get totals in days, weeks, months, or calendar years.',
      keywords: ['date difference', 'days between dates', 'time duration calculator', 'calendar days'],
      overview: 'Calculating the duration between dates is a frequent task for project scheduling, event planning, and milestone tracking. This tool provides both strict counts (days) and calendar subdivisions.',
      howToUse: ['Choose start and end dates.', 'Select whether to include the end date in calculations.'],
      examples: [
        {
          input: { start: '2026-01-01', end: '2026-01-31', includeEnd: true },
          output: { days: 31, weeks: '4 weeks and 3 days' },
          explanation: 'Between Jan 1st and Jan 31st 2026 inclusive, there are exactly 31 days.',
        },
      ],
      faqs: [{ question: 'How is a week defined here?', answer: 'A week is a standard 7-day interval.' }],
    },
    inputs: [
      { name: 'start', label: 'Start Date', type: 'text', defaultValue: '', placeholder: new Date().toISOString().split('T')[0] },
      { name: 'end', label: 'End Date', type: 'text', defaultValue: '', placeholder: new Date().toISOString().split('T')[0] },
      { name: 'includeEnd', label: 'Include End Date (Add 1 day)', type: 'boolean', defaultValue: true },
    ],
    outputs: [
      { name: 'totalDays', label: 'Total Days', type: 'text', unit: ' days' },
      { name: 'detailedDiff', label: 'Calendar Duration', type: 'text' },
    ],
    calculate: (inputs) => {
      const today = new Date().toISOString().split('T')[0];
      const s = new Date(inputs.start || today);
      const e = new Date(inputs.end || today);
      const inc = inputs.includeEnd === true || inputs.includeEnd === 'true';

      if (isNaN(s.getTime()) || isNaN(e.getTime())) {
        return { totalDays: 'Invalid', detailedDiff: 'Invalid' };
      }

      let diff = e.getTime() - s.getTime();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (inc && days >= 0) days += 1;

      // Detailed diff (years, months, days)
      let years = e.getFullYear() - s.getFullYear();
      let months = e.getMonth() - s.getMonth();
      let calDays = e.getDate() - s.getDate();
      if (inc) calDays += 1;

      if (calDays < 0) {
        months -= 1;
        const prevMonth = new Date(e.getFullYear(), e.getMonth(), 0);
        calDays += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      return {
        totalDays: days.toString(),
        detailedDiff: `${years} Years, ${months} Months, ${calDays} Days`,
      };
    },
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Solve common percentage problems, such as finding a percent of a number or percentage changes.',
    category: 'general',
    icon: 'Percent',
    seo: {
      title: 'Percentage Calculator - Calculate Percentages Online',
      description: 'Compute percentages, percentage increases/decreases, and fractional conversions easily.',
      keywords: ['percentage calculator', 'percent of number', 'percentage change', 'fraction to percentage'],
      overview: 'Percentages represent proportions relative to a hundred. Calculating increases, decreases, and fractions is essential for discounts, business math, and basic stats.',
      howToUse: ['Select the percentage mode.', 'Input parameters X and Y.', 'Calculate.'],
      examples: [
        {
          input: { mode: 'value', x: 20, y: 150 },
          output: { result: 30 },
          explanation: '20% of 150 is 30.',
        },
      ],
      faqs: [{ question: 'What is percentage change?', answer: 'Percentage change represents (New Value - Old Value) / Old Value * 100.' }],
    },
    inputs: [
      {
        name: 'mode',
        label: 'Mode',
        type: 'select',
        defaultValue: 'value',
        options: [
          { label: 'What is X% of Y?', value: 'value' },
          { label: 'X is what % of Y?', value: 'percent' },
          { label: 'Percentage change from X to Y', value: 'change' },
        ],
      },
      { name: 'x', label: 'Value X', type: 'number', defaultValue: 20, slider: { min: 0, max: 1000, step: 1 } },
      { name: 'y', label: 'Value Y', type: 'number', defaultValue: 150, slider: { min: 1, max: 10000, step: 1 } },
    ],
    outputs: [{ name: 'result', label: 'Result', type: 'number' }],
    calculate: (inputs) => {
      const mode = inputs.mode;
      const x = Number(inputs.x);
      const y = Number(inputs.y);

      let res = 0;
      if (mode === 'value') {
        res = (x / 100) * y;
      } else if (mode === 'percent') {
        res = (x / y) * 100;
      } else {
        // change
        res = ((y - x) / x) * 100;
      }

      return {
        result: Math.round(res * 100) / 100,
      };
    },
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    description: 'Determine the final sale price and savings amount after applying percentage discounts.',
    category: 'general',
    icon: 'Percent',
    seo: {
      title: 'Discount Calculator - Sale Price & Savings Tracker',
      description: 'Calculate final prices after discounts and double discounts. See savings values.',
      keywords: ['discount calculator', 'sale price calculator', 'savings calculator', 'shopping calculator'],
      overview: 'Shopping discounts are represented as a percentage reduction of the original tag price. This calculator handles base discounts and optional stacked/double discounts.',
      howToUse: ['Input the original price.', 'Set the main discount percentage.', 'Optional: add a tax or secondary discount percentage.'],
      examples: [
        {
          input: { price: 100, discount: 20, tax: 5 },
          output: { salePrice: 84, savings: 20, taxPaid: 4 },
          explanation: 'Applying 20% discount on a 100 item reduces cost to 80. Adding 5% sales tax on the 80 results in a final price of 84 (savings: 20, tax: 4).',
        },
      ],
      faqs: [{ question: 'What is a double discount?', answer: 'It is a stacked discount where a second discount is applied to the already discounted price, rather than adding both rates together.' }],
    },
    inputs: [
      { name: 'price', label: 'Original Price', type: 'number', defaultValue: 100, unit: 'Currency', slider: { min: 1, max: 10000, step: 5 } },
      { name: 'discount', label: 'Discount (%)', type: 'number', defaultValue: 20, unit: '%', slider: { min: 0, max: 99, step: 1 } },
      { name: 'tax', label: 'Sales Tax (% - Optional)', type: 'number', defaultValue: 0, unit: '%', slider: { min: 0, max: 30, step: 0.5 } },
    ],
    outputs: [
      { name: 'salePrice', label: 'Final Price', type: 'currency' },
      { name: 'savings', label: 'Total Savings', type: 'currency' },
      { name: 'taxPaid', label: 'Sales Tax Paid', type: 'currency' },
    ],
    calculate: (inputs) => {
      const price = Number(inputs.price);
      const discount = Number(inputs.discount);
      const tax = Number(inputs.tax);

      const discountAmt = price * (discount / 100);
      const priceAfterDiscount = price - discountAmt;
      const taxAmt = priceAfterDiscount * (tax / 100);
      const finalPrice = priceAfterDiscount + taxAmt;

      return {
        salePrice: Math.round(finalPrice * 100) / 100,
        savings: Math.round(discountAmt * 100) / 100,
        taxPaid: Math.round(taxAmt * 100) / 100,
      };
    },
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    title: 'Tip Calculator',
    description: 'Calculate restaurant tips and easily split the total bill among multiple diners.',
    category: 'general',
    icon: 'Coins',
    seo: {
      title: 'Tip Calculator - Split Bills & Tip Diners',
      description: 'Quickly compute correct tips and split bills among friends. Supports custom percentages and round-up options.',
      keywords: ['tip calculator', 'split bill calculator', 'gratuity calculator', 'dinner split'],
      overview: 'A tip calculator simplifies dining math, helping you compute a fair tip percentage and partition the final bill evenly among your group.',
      howToUse: ['Enter the base bill amount.', 'Select the tip percentage.', 'Set the number of people sharing the bill.'],
      examples: [
        {
          input: { bill: 120, tip: 15, people: 4 },
          output: { tipAmount: 18, totalBill: 138, tipPerPerson: 4.5, totalPerPerson: 34.5 },
          explanation: 'For a 120 bill with 15% tip split 4 ways, the total tip is 18, total bill is 138, and each person pays 34.50.',
        },
      ],
      faqs: [{ question: 'What is standard tip percentage?', answer: 'Standard dining tips usually range from 15% to 20% in the US, depending on service quality.' }],
    },
    inputs: [
      { name: 'bill', label: 'Bill Amount', type: 'number', defaultValue: 100, unit: 'Currency', slider: { min: 5, max: 1000, step: 5 } },
      { name: 'tip', label: 'Tip Percentage (%)', type: 'number', defaultValue: 15, unit: '%', slider: { min: 0, max: 50, step: 1 } },
      { name: 'people', label: 'Number of People', type: 'number', defaultValue: 2, slider: { min: 1, max: 50, step: 1 } },
    ],
    outputs: [
      { name: 'tipAmount', label: 'Total Tip', type: 'currency' },
      { name: 'totalBill', label: 'Total Bill (incl. Tip)', type: 'currency' },
      { name: 'tipPerPerson', label: 'Tip per Person', type: 'currency' },
      { name: 'totalPerPerson', label: 'Amount per Person', type: 'currency' },
    ],
    calculate: (inputs) => {
      const bill = Number(inputs.bill);
      const tipPct = Number(inputs.tip);
      const people = Math.max(1, Number(inputs.people));

      const tipAmt = bill * (tipPct / 100);
      const total = bill + tipAmt;

      return {
        tipAmount: Math.round(tipAmt * 100) / 100,
        totalBill: Math.round(total * 100) / 100,
        tipPerPerson: Math.round((tipAmt / people) * 100) / 100,
        totalPerPerson: Math.round((total / people) * 100) / 100,
      };
    },
  },
];
