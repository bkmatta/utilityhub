import { Tool } from '@/types/tool';

export const financeTools: Tool[] = [
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments (EMI) for home loans, car loans, or personal loans instantly with amortization schedule.',
    category: 'finance',
    icon: 'Calculator',
    seo: {
      title: 'EMI Calculator - Calculate Loan EMIs Online',
      description: 'Free online Equated Monthly Installment (EMI) calculator. Compute monthly payments, total interest, and total payable amount for any home, car, or personal loan.',
      keywords: ['emi calculator', 'loan emi', 'monthly installment calculator', 'home loan emi', 'car loan emi'],
      overview: 'An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is paid off in full. It is crucial to calculate your EMI in advance to plan your monthly budget and check your affordability for a loan.',
      formula: {
        expression: 'EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)',
        explanation: 'Where P is the Principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the loan tenure in months.',
      },
      howToUse: [
        'Enter the Principal loan amount you want to borrow.',
        'Adjust the annual interest rate offered by the bank.',
        'Select the loan tenure in years or months.',
        'View the monthly EMI, total interest, and total payment instantly.',
      ],
      examples: [
        {
          input: { principal: 100000, rate: 10, tenure: 1 },
          output: { emi: 8791.59, totalInterest: 5499.06, totalPayment: 105499.06 },
          explanation: 'For a loan of 100,000 at 10% interest for 1 year, the monthly EMI is 8,791.59, total interest is 5,499.06, and total payable amount is 105,499.06.',
        },
      ],
      faqs: [
        {
          question: 'What is the difference between flat interest rate and reducing balance rate?',
          answer: 'A flat rate calculates interest on the initial loan amount throughout the tenure, whereas reducing balance calculates interest on the outstanding loan principal, saving you money.',
        },
        {
          question: 'Can I prepay my loan to reduce my EMI?',
          answer: 'Yes, prepaying a portion of the loan reduces the principal amount, which allows you to either lower your monthly EMI or shorten the loan tenure.',
        },
      ],
    },
    inputs: [
      { name: 'principal', label: 'Loan Amount', type: 'number', defaultValue: 1000000, unit: 'Currency', slider: { min: 10000, max: 10000000, step: 10000 } },
      { name: 'rate', label: 'Interest Rate (Annual %)', type: 'number', defaultValue: 8.5, unit: '%', slider: { min: 1, max: 30, step: 0.1 } },
      { name: 'tenure', label: 'Loan Tenure (Years)', type: 'number', defaultValue: 10, unit: 'years', slider: { min: 1, max: 30, step: 1 } },
    ],
    outputs: [
      { name: 'emi', label: 'Monthly EMI', type: 'currency' },
      { name: 'totalInterest', label: 'Total Interest Payable', type: 'currency' },
      { name: 'totalPayment', label: 'Total Amount Payable', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.tenure) * 12;

      if (r === 0) {
        return {
          emi: P / n,
          totalInterest: 0,
          totalPayment: P,
        };
      }

      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - P;

      return {
        emi: Math.round(emi * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
      };
    },
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Detailed analysis of your personal, auto, or consolidation loan payments and overall cost.',
    category: 'finance',
    icon: 'Wallet',
    seo: {
      title: 'Loan Calculator - Compare & Calculate Personal Loans',
      description: 'Calculate monthly loan payments, total cost, and see an amortization table for personal, auto, and consolidation loans.',
      keywords: ['loan calculator', 'personal loan', 'auto loan', 'debt calculator', 'loan repayment'],
      overview: 'Understanding the true cost of a loan involves evaluating the monthly payments, total interest over the life of the loan, and any potential fees. This calculator lets you run loan scenarios to decide on the best repayment strategy.',
      howToUse: [
        'Input the loan amount, interest rate, and duration.',
        'Enter optional monthly extra payments to see how much faster you can pay it off.',
        'Click calculate to inspect total interest savings.',
      ],
      examples: [
        {
          input: { amount: 50000, rate: 7.5, term: 5 },
          output: { monthlyPayment: 1001.9, totalInterest: 10114.23, totalRepayment: 60114.23 },
          explanation: 'A 50,000 loan at 7.5% for 5 years results in a 1,001.90 monthly payment and 10,114.23 in total interest.',
        },
      ],
      faqs: [
        { question: 'What is APR?', answer: 'Annual Percentage Rate (APR) represents the true cost of the loan including interest rate and other bank processing fees.' },
      ],
    },
    inputs: [
      { name: 'amount', label: 'Loan Amount', type: 'number', defaultValue: 50000, unit: 'Currency', slider: { min: 1000, max: 1000000, step: 1000 } },
      { name: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 7.5, unit: '%', slider: { min: 1, max: 30, step: 0.1 } },
      { name: 'term', label: 'Loan Term (Years)', type: 'number', defaultValue: 5, unit: 'years', slider: { min: 1, max: 30, step: 1 } },
    ],
    outputs: [
      { name: 'monthlyPayment', label: 'Monthly Payment', type: 'currency' },
      { name: 'totalInterest', label: 'Total Interest', type: 'currency' },
      { name: 'totalRepayment', label: 'Total Repayment', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.amount);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.term) * 12;

      if (r === 0) {
        return { monthlyPayment: P / n, totalInterest: 0, totalRepayment: P };
      }

      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      return {
        monthlyPayment: Math.round(emi * 100) / 100,
        totalInterest: Math.round((totalPayment - P) * 100) / 100,
        totalRepayment: Math.round(totalPayment * 100) / 100,
      };
    },
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payments including property tax, insurance, and interest.',
    category: 'finance',
    icon: 'Home',
    seo: {
      title: 'Mortgage Calculator - Estimates Home Loan Payments',
      description: 'Estimate your monthly mortgage payments including interest, principal, taxes, home insurance, and PMI.',
      keywords: ['mortgage calculator', 'home purchase', 'home loan payment', 'pmi calculator'],
      overview: 'Purchasing a home involves additional expenses beyond standard principal and interest. Property taxes, home insurance, and private mortgage insurance (PMI) are critical elements of a realistic mortgage estimate.',
      howToUse: ['Enter home value and down payment.', 'Specify loan term, interest rate, property taxes, and insurance values.'],
      examples: [
        {
          input: { homeValue: 300000, downPayment: 60000, rate: 6, term: 30, propertyTax: 3000, homeInsurance: 1200 },
          output: { monthlyPayment: 1789.04, principalAndInterest: 1438.92, taxAndInsurance: 350.12 },
          explanation: 'For a 300,000 home with 20% down payment, the loan principal is 240,000. At 6% interest for 30 years, monthly principal+interest is 1,438.92, taxes+insurance is 350.12, totaling 1,789.04.',
        },
      ],
      faqs: [{ question: 'What is PMI?', answer: 'Private Mortgage Insurance (PMI) is required by lenders when down payment is less than 20% of the home purchase price.' }],
    },
    inputs: [
      { name: 'homeValue', label: 'Home Price', type: 'number', defaultValue: 400000, unit: 'Currency', slider: { min: 50000, max: 2000000, step: 10000 } },
      { name: 'downPayment', label: 'Down Payment', type: 'number', defaultValue: 80000, unit: 'Currency', slider: { min: 0, max: 1000000, step: 5000 } },
      { name: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.5, unit: '%', slider: { min: 1, max: 20, step: 0.1 } },
      { name: 'term', label: 'Loan Term', type: 'number', defaultValue: 30, unit: 'years', slider: { min: 10, max: 40, step: 5 } },
      { name: 'propertyTax', label: 'Annual Property Tax', type: 'number', defaultValue: 4000, unit: 'Currency' },
      { name: 'homeInsurance', label: 'Annual Home Insurance', type: 'number', defaultValue: 1500, unit: 'Currency' },
    ],
    outputs: [
      { name: 'monthlyPayment', label: 'Total Monthly Payment', type: 'currency' },
      { name: 'principalAndInterest', label: 'Principal & Interest', type: 'currency' },
      { name: 'taxAndInsurance', label: 'Monthly Taxes & Insurance', type: 'currency' },
    ],
    calculate: (inputs) => {
      const homeVal = Number(inputs.homeValue);
      const downPay = Number(inputs.downPayment);
      const P = homeVal - downPay;
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.term) * 12;

      let pAndI = 0;
      if (r === 0) {
        pAndI = P / n;
      } else {
        pAndI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      const tax = Number(inputs.propertyTax) / 12;
      const ins = Number(inputs.homeInsurance) / 12;
      const total = pAndI + tax + ins;

      return {
        monthlyPayment: Math.round(total * 100) / 100,
        principalAndInterest: Math.round(pAndI * 100) / 100,
        taxAndInsurance: Math.round((tax + ins) * 100) / 100,
      };
    },
  },
  {
    id: 'sip-calculator',
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    description: 'Calculate wealth gain and maturity amount of your systematic investment plan (SIP) mutual funds.',
    category: 'finance',
    icon: 'TrendingUp',
    seo: {
      title: 'SIP Calculator - Systematic Investment Plan Estimator',
      description: 'Estimate future returns of your Systematic Investment Plan (SIP) in mutual funds. Calculate total investment, wealth gained, and maturity values.',
      keywords: ['sip calculator', 'mutual funds', 'sip investment', 'sip returns', 'wealth creator'],
      overview: 'Systematic Investment Plan (SIP) is a method of investing a fixed sum regularly in mutual funds, benefiting from rupee cost averaging and power of compounding.',
      formula: {
        expression: 'M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)',
        explanation: 'Where P is periodic investment, i is monthly return rate, and n is number of payments.',
      },
      howToUse: ['Choose your monthly investment amount.', 'Define expected annual return rate.', 'Set investment duration.'],
      examples: [
        {
          input: { monthly: 5000, rate: 12, tenure: 10 },
          output: { invested: 600000, wealthGain: 561695.38, maturityValue: 1161695.38 },
          explanation: 'Investing 5,000 monthly for 10 years at 12% returns accumulates 11.61 lakhs.',
        },
      ],
      faqs: [{ question: 'Is SIP risk-free?', answer: 'No, SIPs are subject to stock market risks, but regular investing mitigates timing risks.' }],
    },
    inputs: [
      { name: 'monthly', label: 'Monthly Investment', type: 'number', defaultValue: 5000, unit: 'Currency', slider: { min: 500, max: 100000, step: 500 } },
      { name: 'rate', label: 'Expected Return Rate (Annual %)', type: 'number', defaultValue: 12, unit: '%', slider: { min: 1, max: 30, step: 0.5 } },
      { name: 'tenure', label: 'Time Period (Years)', type: 'number', defaultValue: 10, unit: 'years', slider: { min: 1, max: 40, step: 1 } },
    ],
    outputs: [
      { name: 'invested', label: 'Invested Amount', type: 'currency' },
      { name: 'wealthGain', label: 'Est. Returns', type: 'currency' },
      { name: 'maturityValue', label: 'Total Value', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.monthly);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.tenure) * 12;

      const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = P * n;
      const gain = maturity - invested;

      return {
        invested: Math.round(invested * 100) / 100,
        wealthGain: Math.round(gain * 100) / 100,
        maturityValue: Math.round(maturity * 100) / 100,
      };
    },
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate how compound interest affects your savings growth over time with customizable compounds.',
    category: 'finance',
    icon: 'Percent',
    seo: {
      title: 'Compound Interest Calculator - Calculate Savings Growth',
      description: 'Compute compound interest gains. Choose monthly, quarterly, or annual compound intervals to see how investments grow.',
      keywords: ['compound interest', 'compounding calculator', 'future value', 'interest calculator'],
      overview: 'Compound interest is interest calculated on the initial principal and the accumulated interest of previous periods.',
      formula: {
        expression: 'A = P * (1 + r/n)^(n*t)',
        explanation: 'Where P is initial principal, r annual rate, n compounds per year, t time in years.',
      },
      howToUse: ['Provide principal, interest rate, and years.', 'Select compounding frequency.'],
      examples: [
        {
          input: { principal: 10000, rate: 5, time: 5, compoundFrequency: 12 },
          output: { principalPaid: 10000, interestEarned: 2833.59, totalValue: 12833.59 },
          explanation: '10,000 at 5% interest compounded monthly for 5 years yields 12,833.59 total.',
        },
      ],
      faqs: [{ question: 'What is APY?', answer: 'Annual Percentage Yield (APY) represents the real rate of return taking compound interest into account.' }],
    },
    inputs: [
      { name: 'principal', label: 'Initial Principal', type: 'number', defaultValue: 10000, unit: 'Currency', slider: { min: 100, max: 1000000, step: 1000 } },
      { name: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.0, unit: '%', slider: { min: 0.1, max: 25, step: 0.1 } },
      { name: 'time', label: 'Time Period (Years)', type: 'number', defaultValue: 10, unit: 'years', slider: { min: 1, max: 50, step: 1 } },
      {
        name: 'compoundFrequency',
        label: 'Compounding Frequency',
        type: 'select',
        defaultValue: 12,
        options: [
          { label: 'Annually', value: 1 },
          { label: 'Semi-Annually', value: 2 },
          { label: 'Quarterly', value: 4 },
          { label: 'Monthly', value: 12 },
          { label: 'Daily', value: 365 },
        ],
      },
    ],
    outputs: [
      { name: 'principalPaid', label: 'Principal Paid', type: 'currency' },
      { name: 'interestEarned', label: 'Interest Earned', type: 'currency' },
      { name: 'totalValue', label: 'Total Future Value', type: 'currency' },
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal);
      const r = Number(inputs.rate) / 100;
      const t = Number(inputs.time);
      const n = Number(inputs.compoundFrequency);

      const total = P * Math.pow(1 + r / n, n * t);
      const interest = total - P;

      return {
        principalPaid: P,
        interestEarned: Math.round(interest * 100) / 100,
        totalValue: Math.round(total * 100) / 100,
      };
    },
  },
  {
    id: 'retirement-calculator',
    slug: 'retirement-calculator',
    title: 'Retirement Calculator',
    description: 'Determine how much money you need to save for a comfortable retirement adjusted for inflation.',
    category: 'finance',
    icon: 'Footprints',
    seo: {
      title: 'Retirement Calculator - Savings & Corpus Planner',
      description: 'Find out if you are saving enough for retirement. Adjust inflation, lifestyle expenses, and life expectancy to calculate required corpus.',
      keywords: ['retirement planner', 'retirement savings', 'pension calculator', 'retirement corpus'],
      overview: 'Planning for retirement requires understanding your post-retirement monthly expenses, inflation, expected investment returns, and how long your corpus needs to last.',
      howToUse: ['Input current age, retirement target age, and current income.', 'Input monthly expenses and expected inflation.'],
      examples: [
        {
          input: { currentAge: 30, retirementAge: 60, lifeExpectancy: 85, monthlyExpenses: 40000, inflation: 6, returnPre: 12, returnPost: 8 },
          output: { corpusNeeded: 55293200, monthlySavingRequired: 16800 },
          explanation: 'With inflation, a 40,000 expense grows to 2.29 lakhs at age 60. To fund this for 25 years, a corpus of ~5.5 Crore is needed, requiring ~16,800 monthly savings.',
        },
      ],
      faqs: [{ question: 'What is the 4% rule?', answer: 'It is a thumb rule stating you can safely withdraw 4% of your retirement portfolio in the first year and adjust for inflation thereafter.' }],
    },
    inputs: [
      { name: 'currentAge', label: 'Current Age', type: 'number', defaultValue: 30, unit: 'years', slider: { min: 18, max: 70, step: 1 } },
      { name: 'retirementAge', label: 'Target Retirement Age', type: 'number', defaultValue: 60, unit: 'years', slider: { min: 40, max: 80, step: 1 } },
      { name: 'lifeExpectancy', label: 'Life Expectancy', type: 'number', defaultValue: 85, unit: 'years', slider: { min: 60, max: 100, step: 1 } },
      { name: 'monthlyExpenses', label: 'Current Monthly Expenses', type: 'number', defaultValue: 50000, unit: 'Currency', slider: { min: 5000, max: 500000, step: 5000 } },
      { name: 'inflation', label: 'Annual Inflation Rate (%)', type: 'number', defaultValue: 6.0, unit: '%', slider: { min: 1, max: 15, step: 0.1 } },
      { name: 'returnPre', label: 'Pre-Retirement Investment Return (%)', type: 'number', defaultValue: 12.0, unit: '%', slider: { min: 4, max: 20, step: 0.5 } },
      { name: 'returnPost', label: 'Post-Retirement Investment Return (%)', type: 'number', defaultValue: 8.0, unit: '%', slider: { min: 4, max: 15, step: 0.5 } },
    ],
    outputs: [
      { name: 'adjustedExpenses', label: 'Monthly Expense at Retirement', type: 'currency' },
      { name: 'corpusNeeded', label: 'Required Retirement Corpus', type: 'currency' },
      { name: 'monthlySavingRequired', label: 'Required Monthly Savings', type: 'currency' },
    ],
    calculate: (inputs) => {
      const currentAge = Number(inputs.currentAge);
      const retirementAge = Number(inputs.retirementAge);
      const lifeExpectancy = Number(inputs.lifeExpectancy);
      const monthlyExpenses = Number(inputs.monthlyExpenses);
      const inflation = Number(inputs.inflation) / 100;
      const returnPre = Number(inputs.returnPre) / 100;
      const returnPost = Number(inputs.returnPost) / 100;

      const yearsToRetirement = retirementAge - currentAge;
      const yearsInRetirement = lifeExpectancy - retirementAge;

      // Expenses at retirement
      const adjustedExpenses = monthlyExpenses * Math.pow(1 + inflation, yearsToRetirement);

      // Real return in retirement
      const realReturnPost = (1 + returnPost) / (1 + inflation) - 1;

      // Corpus needed (present value of growing annuity in retirement)
      // PV = PMT * [1 - (1+g)^-n] / r  (where PMT is annual, g is 0 since we adjusted via real return post-ret)
      const annualExpensesRet = adjustedExpenses * 12;
      let corpus = 0;
      if (realReturnPost === 0) {
        corpus = annualExpensesRet * yearsInRetirement;
      } else {
        corpus = annualExpensesRet * ((1 - Math.pow(1 + realReturnPost, -yearsInRetirement)) / realReturnPost);
      }

      // Monthly savings pre-retirement to reach corpus
      const nPre = yearsToRetirement * 12;
      const rPre = returnPre / 12;
      let savings = 0;
      if (rPre === 0) {
        savings = corpus / nPre;
      } else {
        savings = corpus / (((Math.pow(1 + rPre, nPre) - 1) / rPre) * (1 + rPre));
      }

      return {
        adjustedExpenses: Math.round(adjustedExpenses * 100) / 100,
        corpusNeeded: Math.round(corpus * 100) / 100,
        monthlySavingRequired: Math.round(savings * 100) / 100,
      };
    },
  },
  {
    id: 'gst-calculator',
    slug: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate Goods and Services Tax (GST) easily by adding or removing GST percentages.',
    category: 'finance',
    icon: 'Percent',
    seo: {
      title: 'GST Calculator Online - Add or Remove GST',
      description: 'Quickly calculate GST (Goods & Services Tax) for any amount. Add tax or extract tax with different slabs like 5%, 12%, 18%, 24%.',
      keywords: ['gst calculator', 'tax adder', 'remove gst', 'sales tax', 'gst slabs'],
      overview: 'Goods and Services Tax (GST) is an indirect tax applied to the supply of goods and services. Calculating either the tax added onto a price or extracting the tax already in the price is essential for merchants and consumers.',
      howToUse: ['Enter the initial base amount.', 'Select the GST rate.', 'Choose whether to Add GST or Remove GST.'],
      examples: [
        {
          input: { baseAmount: 1000, gstRate: 18, action: 'add' },
          output: { netAmount: 1180, gstAmount: 180, originalAmount: 1000 },
          explanation: 'Adding 18% GST to 1,000 results in 1,180 total cost and 180 tax.',
        },
      ],
      faqs: [{ question: 'What is IGST, CGST, and SGST?', answer: 'CGST and SGST are levied on intra-state supply (shared equally by Central and State), while IGST is levied on inter-state supply (goes to Central).' }],
    },
    inputs: [
      { name: 'baseAmount', label: 'Amount', type: 'number', defaultValue: 10000, unit: 'Currency', slider: { min: 100, max: 1000000, step: 100 } },
      { name: 'gstRate', label: 'GST Rate (%)', type: 'number', defaultValue: 18, unit: '%', slider: { min: 1, max: 40, step: 1 } },
      {
        name: 'action',
        label: 'Action',
        type: 'select',
        defaultValue: 'add',
        options: [
          { label: 'Add GST', value: 'add' },
          { label: 'Remove GST', value: 'remove' },
        ],
      },
    ],
    outputs: [
      { name: 'original', label: 'Base Amount', type: 'currency' },
      { name: 'gstAmount', label: 'GST Tax Amount', type: 'currency' },
      { name: 'totalAmount', label: 'Total Billing Amount', type: 'currency' },
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.baseAmount);
      const rate = Number(inputs.gstRate);
      const isAdd = inputs.action === 'add';

      let gst = 0;
      let total = 0;
      let base = 0;

      if (isAdd) {
        gst = amount * (rate / 100);
        total = amount + gst;
        base = amount;
      } else {
        base = amount / (1 + rate / 100);
        gst = amount - base;
        total = amount;
      }

      return {
        original: Math.round(base * 100) / 100,
        gstAmount: Math.round(gst * 100) / 100,
        totalAmount: Math.round(total * 100) / 100,
      };
    },
  },
  {
    id: 'tax-calculator',
    slug: 'tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Calculate estimated income tax liability based on standard income brackets and deductions.',
    category: 'finance',
    icon: 'Scale',
    seo: {
      title: 'Income Tax Calculator - Estimate Yearly Tax',
      description: 'Estimate your yearly federal/national income tax. Input income and standard deductions for quick estimations.',
      keywords: ['tax calculator', 'income tax liability', 'tax bracket calculator', 'income tax estimator'],
      overview: 'Income taxes are progressive, meaning higher incomes fall into higher tax rate bands. Deductions lower the adjusted gross income, decreasing overall tax liability.',
      howToUse: ['Enter gross annual income.', 'Enter total applicable deductions.'],
      examples: [
        {
          input: { income: 80000, deductions: 12000 },
          output: { taxableIncome: 68000, estimatedTax: 10400, netIncome: 57600 },
          explanation: 'Gross income of 80,000 minus 12,000 deductions leaves 68,000 taxable. Using a simplified bracket model, the tax liability is 10,400.',
        },
      ],
      faqs: [{ question: 'What is taxable income?', answer: 'Taxable income is gross income minus allowable deductions and exemptions.' }],
    },
    inputs: [
      { name: 'income', label: 'Gross Annual Income', type: 'number', defaultValue: 75000, unit: 'Currency', slider: { min: 1000, max: 1000000, step: 5000 } },
      { name: 'deductions', label: 'Deductions & Exemptions', type: 'number', defaultValue: 12500, unit: 'Currency', slider: { min: 0, max: 100000, step: 500 } },
    ],
    outputs: [
      { name: 'taxableIncome', label: 'Taxable Income', type: 'currency' },
      { name: 'estimatedTax', label: 'Estimated Tax Liability', type: 'currency' },
      { name: 'netIncome', label: 'Take Home Income', type: 'currency' },
    ],
    calculate: (inputs) => {
      const gross = Number(inputs.income);
      const deductions = Number(inputs.deductions);
      const taxable = Math.max(0, gross - deductions);

      // Simplified general tax bracket logic (e.g. US single-like or basic global progressive)
      // 10% on first $10k
      // 12% on $10k-$40k
      // 22% on $40k-$85k
      // 24% on $85k+
      let tax = 0;
      if (taxable <= 10000) {
        tax = taxable * 0.1;
      } else if (taxable <= 40000) {
        tax = 10000 * 0.1 + (taxable - 10000) * 0.12;
      } else if (taxable <= 85000) {
        tax = 10000 * 0.1 + 30000 * 0.12 + (taxable - 40000) * 0.22;
      } else {
        tax = 10000 * 0.1 + 30000 * 0.12 + 45000 * 0.22 + (taxable - 85000) * 0.24;
      }

      return {
        taxableIncome: taxable,
        estimatedTax: Math.round(tax * 100) / 100,
        netIncome: Math.round((taxable - tax + deductions) * 100) / 100,
      };
    },
  },
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Calculate the Return on Investment (ROI) and annualized rate of return for any venture.',
    category: 'finance',
    icon: 'Briefcase',
    seo: {
      title: 'ROI Calculator - Return on Investment Tracker',
      description: 'Compute total returns, simple ROI, and annualized ROI of investments like stock, property, or business projects.',
      keywords: ['roi calculator', 'return on investment', 'annualized return', 'profitability calculator'],
      overview: 'Return on Investment (ROI) measures the efficiency or profitability of an investment. Annualizing the ROI allows comparison between investments of different holding periods.',
      formula: {
        expression: 'ROI = (Gain - Cost) / Cost * 100',
        explanation: 'Simple ROI represents total percentage gain, whereas annualized ROI factors in investment duration.',
      },
      howToUse: ['Input initial investment amount and final returned value.', 'Specify holding period in years.'],
      examples: [
        {
          input: { cost: 10000, value: 15000, years: 3 },
          output: { gain: 5000, roi: 50, annualizedRoi: 14.47 },
          explanation: 'An investment of 10,000 that grows to 15,000 in 3 years gains 5,000 (50% ROI), which translates to an annualized return of 14.47%.',
        },
      ],
      faqs: [{ question: 'What is annualized ROI?', answer: 'Annualized ROI calculates the geometric mean rate of return per year, adjusting for compounding over time.' }],
    },
    inputs: [
      { name: 'cost', label: 'Amount Invested (Cost)', type: 'number', defaultValue: 10000, unit: 'Currency', slider: { min: 100, max: 1000000, step: 1000 } },
      { name: 'value', label: 'Amount Returned (Value)', type: 'number', defaultValue: 15000, unit: 'Currency', slider: { min: 100, max: 2000000, step: 1000 } },
      { name: 'years', label: 'Holding Period (Years)', type: 'number', defaultValue: 3, unit: 'years', slider: { min: 0.1, max: 20, step: 0.1 } },
    ],
    outputs: [
      { name: 'gain', label: 'Investment Gain', type: 'currency' },
      { name: 'roi', label: 'Simple ROI', type: 'percentage' },
      { name: 'annualizedRoi', label: 'Annualized ROI', type: 'percentage' },
    ],
    calculate: (inputs) => {
      const cost = Number(inputs.cost);
      const value = Number(inputs.value);
      const years = Number(inputs.years);

      const gain = value - cost;
      const roi = (gain / cost) * 100;
      
      // Annualized ROI = ((Value / Cost) ^ (1 / years)) - 1
      const ann = (Math.pow(value / cost, 1 / years) - 1) * 100;

      return {
        gain: Math.round(gain * 100) / 100,
        roi: Math.round(roi * 100) / 100,
        annualizedRoi: Math.round(ann * 100) / 100,
      };
    },
  },
  {
    id: 'inflation-calculator',
    slug: 'inflation-calculator',
    title: 'Inflation Calculator',
    description: 'Calculate purchasing power change or future expense requirements adjusted for annual inflation.',
    category: 'finance',
    icon: 'ArrowUpRight',
    seo: {
      title: 'Inflation Calculator - Future Buying Power Planner',
      description: 'Find out how inflation erodes your money value. Calculate future costs of products or purchasing power changes.',
      keywords: ['inflation calculator', 'purchasing power', 'buying power', 'future value cost'],
      overview: 'Inflation reduces the value of a currency over time, meaning a fixed sum of money buys fewer goods in the future. Planning for retirement, tuition, or building assets requires calculating inflation effects.',
      howToUse: ['Provide starting amount.', 'Provide expected average inflation rate.', 'Input years.'],
      examples: [
        {
          input: { amount: 1000, inflation: 3, years: 10 },
          output: { futureCost: 1343.92, currentValueInFuture: 744.09 },
          explanation: 'At 3% inflation, an item costing 1,000 today costs 1,343.92 in 10 years, and today\'s 1,000 buying power shrinks to 744.09 equivalent.',
        },
      ],
      faqs: [{ question: 'What is CPI?', answer: 'Consumer Price Index (CPI) measures the average change over time in prices paid by consumers for market goods.' }],
    },
    inputs: [
      { name: 'amount', label: 'Starting Value', type: 'number', defaultValue: 1000, unit: 'Currency', slider: { min: 100, max: 100000, step: 100 } },
      { name: 'inflation', label: 'Average Inflation Rate (%)', type: 'number', defaultValue: 4.0, unit: '%', slider: { min: 0.1, max: 20, step: 0.1 } },
      { name: 'years', label: 'Years', type: 'number', defaultValue: 10, unit: 'years', slider: { min: 1, max: 50, step: 1 } },
    ],
    outputs: [
      { name: 'futureCost', label: 'Future Value (Adjusted Up)', type: 'currency' },
      { name: 'currentValueInFuture', label: 'Purchasing Power (Eroded Value)', type: 'currency' },
    ],
    calculate: (inputs) => {
      const amt = Number(inputs.amount);
      const r = Number(inputs.inflation) / 100;
      const t = Number(inputs.years);

      const fut = amt * Math.pow(1 + r, t);
      const buy = amt / Math.pow(1 + r, t);

      return {
        futureCost: Math.round(fut * 100) / 100,
        currentValueInFuture: Math.round(buy * 100) / 100,
      };
    },
  },
];
