import { Tool } from '@/types/tool';

export const convertersTools: Tool[] = [
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    title: 'Currency Converter',
    description: 'Convert amounts between major global currencies (USD, EUR, GBP, INR, JPY, CAD, AUD) using rates.',
    category: 'converters',
    icon: 'RefreshCw',
    seo: {
      title: 'Currency Converter - Exchange Rates Calculator',
      description: 'Convert currency values instantly. Compare exchange rates between USD, EUR, GBP, INR, and more.',
      keywords: ['currency converter', 'exchange rates', 'convert usd to eur', 'forex converter'],
      overview: 'Currency conversion involves calculating the relative value of one national currency against another. Since forex markets fluctuate, standard index exchange values are referenced to calculate equivalents.',
      howToUse: ['Input the source amount.', 'Select the source (From) currency.', 'Select the destination (To) currency.'],
      examples: [
        {
          input: { amount: 100, from: 'USD', to: 'EUR' },
          output: { result: 92 },
          explanation: 'At a rate of 0.92, 100 USD equals 92 EUR.',
        },
      ],
      faqs: [{ question: 'Are these rates real-time?', answer: 'These rates are standard indicators. For commercial transactions, bank transaction rates should be consulted.' }],
    },
    inputs: [
      { name: 'amount', label: 'Amount', type: 'number', defaultValue: 100, slider: { min: 1, max: 100000, step: 10 } },
      {
        name: 'from',
        label: 'From',
        type: 'select',
        defaultValue: 'USD',
        options: [
          { label: 'USD - US Dollar', value: 'USD' },
          { label: 'EUR - Euro', value: 'EUR' },
          { label: 'GBP - British Pound', value: 'GBP' },
          { label: 'INR - Indian Rupee', value: 'INR' },
          { label: 'JPY - Japanese Yen', value: 'JPY' },
          { label: 'CAD - Canadian Dollar', value: 'CAD' },
          { label: 'AUD - Australian Dollar', value: 'AUD' },
        ],
      },
      {
        name: 'to',
        label: 'To',
        type: 'select',
        defaultValue: 'EUR',
        options: [
          { label: 'USD - US Dollar', value: 'USD' },
          { label: 'EUR - Euro', value: 'EUR' },
          { label: 'GBP - British Pound', value: 'GBP' },
          { label: 'INR - Indian Rupee', value: 'INR' },
          { label: 'JPY - Japanese Yen', value: 'JPY' },
          { label: 'CAD - Canadian Dollar', value: 'CAD' },
          { label: 'AUD - Australian Dollar', value: 'AUD' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Amount', type: 'number' }],
    calculate: (inputs) => {
      const amount = Number(inputs.amount);
      const from = inputs.from;
      const to = inputs.to;

      // Base: USD
      const rates: Record<string, number> = {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        INR: 83.5,
        JPY: 157.0,
        CAD: 1.37,
        AUD: 1.50,
      };

      const rateFrom = rates[from] || 1;
      const rateTo = rates[to] || 1;

      // Convert to USD, then to target
      const usd = amount / rateFrom;
      const converted = usd * rateTo;

      return {
        result: Math.round(converted * 100) / 100,
      };
    },
  },
  {
    id: 'length-converter',
    slug: 'length-converter',
    title: 'Length Converter',
    description: 'Convert lengths and distances between meters, kilometers, miles, yards, feet, and inches.',
    category: 'converters',
    icon: 'Ruler',
    seo: {
      title: 'Length & Distance Converter - Metric to Imperial',
      description: 'Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.',
      keywords: ['length converter', 'convert cm to inches', 'metric to imperial distance', 'distance converter'],
      overview: 'Length conversion factors are absolute defined constants, allowing direct linear shifts between metric and imperial dimensions.',
      howToUse: ['Provide length.', 'Select source unit.', 'Select destination unit.'],
      examples: [
        {
          input: { value: 1, from: 'm', to: 'ft' },
          output: { result: 3.28 },
          explanation: '1 meter equals approximately 3.28 feet.',
        },
      ],
      faqs: [{ question: 'What is a metric mile?', answer: 'In athletics, a metric mile is defined as 1,500 meters.' }],
    },
    inputs: [
      { name: 'value', label: 'Length Value', type: 'number', defaultValue: 10 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'm',
        options: [
          { label: 'Millimeters (mm)', value: 'mm' },
          { label: 'Centimeters (cm)', value: 'cm' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Inches (in)', value: 'in' },
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Yards (yd)', value: 'yd' },
          { label: 'Miles (mi)', value: 'mi' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'ft',
        options: [
          { label: 'Millimeters (mm)', value: 'mm' },
          { label: 'Centimeters (cm)', value: 'cm' },
          { label: 'Meters (m)', value: 'm' },
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Inches (in)', value: 'in' },
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Yards (yd)', value: 'yd' },
          { label: 'Miles (mi)', value: 'mi' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Length', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Meter
      const factors: Record<string, number> = {
        mm: 0.001,
        cm: 0.01,
        m: 1.0,
        km: 1000.0,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344,
      };

      const m = val * (factors[from] || 1);
      const res = m / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    title: 'Weight Converter',
    description: 'Convert weights and masses between grams, kilograms, pounds, ounces, and stones.',
    category: 'converters',
    icon: 'Scale',
    seo: {
      title: 'Weight & Mass Converter - Convert kg, lbs, oz',
      description: 'Convert values between milligrams, grams, kilograms, ounces, pounds, and stones.',
      keywords: ['weight converter', 'convert kg to lbs', 'pounds to kilograms', 'mass converter'],
      overview: 'Mass describes physical matter density. Converting weights translates force loads from metric kilograms to imperial pounds and ounces.',
      howToUse: ['Input weight magnitude, select original unit, and specify destination unit.'],
      examples: [{ input: { value: 10, from: 'kg', to: 'lb' }, output: { result: 22.0462 }, explanation: '10 kg equals 22.0462 pounds.' }],
      faqs: [{ question: 'How many ounces are in a pound?', answer: 'There are exactly 16 ounces in 1 standard avoirdupois pound.' }],
    },
    inputs: [
      { name: 'value', label: 'Weight Value', type: 'number', defaultValue: 1 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'kg',
        options: [
          { label: 'Milligrams (mg)', value: 'mg' },
          { label: 'Grams (g)', value: 'g' },
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Pounds (lb)', value: 'lb' },
          { label: 'Stones (st)', value: 'st' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'lb',
        options: [
          { label: 'Milligrams (mg)', value: 'mg' },
          { label: 'Grams (g)', value: 'g' },
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Pounds (lb)', value: 'lb' },
          { label: 'Stones (st)', value: 'st' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Weight', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Gram
      const factors: Record<string, number> = {
        mg: 0.001,
        g: 1.0,
        kg: 1000.0,
        oz: 28.349523125,
        lb: 453.59237,
        st: 6350.29318,
      };

      const g = val * (factors[from] || 1);
      const res = g / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    description: 'Convert temperature units between Celsius, Fahrenheit, and Kelvin scales instantly.',
    category: 'converters',
    icon: 'Flame',
    seo: {
      title: 'Temperature Converter - Celsius, Fahrenheit, Kelvin',
      description: 'Convert heat levels between Celsius, Fahrenheit, and Kelvin temperature scales.',
      keywords: ['temperature converter', 'celsius to fahrenheit', 'kelvin to celsius', 'fahrenheit calculator'],
      overview: 'Temperature scales measure average thermal kinetic energy. Celsius and Fahrenheit are relative markers, while Kelvin represents absolute thermo-scales.',
      howToUse: ['Input temperature.', 'Specify from and to unit scales.'],
      examples: [{ input: { value: 0, from: 'C', to: 'F' }, output: { result: 32 }, explanation: '0 degrees Celsius equals 32 degrees Fahrenheit.' }],
      faqs: [{ question: 'What is absolute zero?', answer: 'Absolute zero is 0 Kelvin (-273.15 degrees Celsius), representing a state of minimum thermodynamic motion.' }],
    },
    inputs: [
      { name: 'value', label: 'Temperature Value', type: 'number', defaultValue: 25 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'C',
        options: [
          { label: 'Celsius (°C)', value: 'C' },
          { label: 'Fahrenheit (°F)', value: 'F' },
          { label: 'Kelvin (K)', value: 'K' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'F',
        options: [
          { label: 'Celsius (°C)', value: 'C' },
          { label: 'Fahrenheit (°F)', value: 'F' },
          { label: 'Kelvin (K)', value: 'K' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Temperature', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      if (from === to) return { result: val };

      // Convert from source to Celsius first
      let c = 0;
      if (from === 'C') c = val;
      else if (from === 'F') c = (val - 32) * (5 / 9);
      else c = val - 273.15; // Kelvin

      // Convert Celsius to destination
      let res = 0;
      if (to === 'C') res = c;
      else if (to === 'F') res = c * (9 / 5) + 32;
      else res = c + 273.15; // Kelvin

      return {
        result: Math.round(res * 100) / 100,
      };
    },
  },
  {
    id: 'area-converter',
    slug: 'area-converter',
    title: 'Area Converter',
    description: 'Convert surface areas between square meters, square feet, acres, and hectares.',
    category: 'converters',
    icon: 'Maximize',
    seo: {
      title: 'Area Unit Converter - Square Feet, Acres, Hectares',
      description: 'Convert land and surface sizes. Translate square meters, square feet, square miles, acres, and hectares.',
      keywords: ['area converter', 'convert sq ft to acres', 'hectares to acres', 'land area calculator'],
      overview: 'Area measurements quantify flat two-dimensional regions. Land sizes commonly utilize acres and hectares, while interior spaces use square feet or square meters.',
      howToUse: ['Enter area magnitude.', 'Select input and output square metrics.'],
      examples: [{ input: { value: 1, from: 'ha', to: 'ac' }, output: { result: 2.4711 }, explanation: '1 hectare is equivalent to 2.4711 acres.' }],
      faqs: [{ question: 'How big is an acre?', answer: 'An acre contains exactly 43,560 square feet.' }],
    },
    inputs: [
      { name: 'value', label: 'Area Value', type: 'number', defaultValue: 1 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'sq_m',
        options: [
          { label: 'Square Meters (m²)', value: 'sq_m' },
          { label: 'Square Kilometers (km²)', value: 'sq_km' },
          { label: 'Square Feet (ft²)', value: 'sq_ft' },
          { label: 'Square Miles (mi²)', value: 'sq_mi' },
          { label: 'Acres (ac)', value: 'ac' },
          { label: 'Hectares (ha)', value: 'ha' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'sq_ft',
        options: [
          { label: 'Square Meters (m²)', value: 'sq_m' },
          { label: 'Square Kilometers (km²)', value: 'sq_km' },
          { label: 'Square Feet (ft²)', value: 'sq_ft' },
          { label: 'Square Miles (mi²)', value: 'sq_mi' },
          { label: 'Acres (ac)', value: 'ac' },
          { label: 'Hectares (ha)', value: 'ha' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Area', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Square Meter
      const factors: Record<string, number> = {
        sq_m: 1.0,
        sq_km: 1000000.0,
        sq_ft: 0.09290304,
        sq_mi: 2589988.110336,
        ac: 4046.8564224,
        ha: 10000.0,
      };

      const m2 = val * (factors[from] || 1);
      const res = m2 / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'volume-converter',
    slug: 'volume-converter',
    title: 'Volume Converter',
    description: 'Convert liquid and dry volumes between liters, milliliters, gallons, cups, and cubic meters.',
    category: 'converters',
    icon: 'Package',
    seo: {
      title: 'Volume Converter - Liters, Gallons, Cubic Meters',
      description: 'Convert capacities between milliliters, liters, cups, pints, quarts, gallons, and cubic meters.',
      keywords: ['volume converter', 'convert liters to gallons', 'gallons to liters', 'cup calculator'],
      overview: 'Volume defines the three-dimensional space occupied by substances. Cooking contexts rely on cups and fluid ounces, while industrial spaces utilize liters and cubic volumes.',
      howToUse: ['Provide quantity.', 'Select start volume unit.', 'Select end volume unit.'],
      examples: [{ input: { value: 1, from: 'gal', to: 'L' }, output: { result: 3.7854 }, explanation: '1 US gallon equals 3.7854 liters.' }],
      faqs: [{ question: 'What is the difference between US and UK gallons?', answer: 'A US liquid gallon is 3.785 liters, while an Imperial (UK) gallon is 4.546 liters.' }],
    },
    inputs: [
      { name: 'value', label: 'Volume Value', type: 'number', defaultValue: 1 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'L',
        options: [
          { label: 'Milliliters (ml)', value: 'ml' },
          { label: 'Liters (L)', value: 'L' },
          { label: 'Cubic Meters (m³)', value: 'cu_m' },
          { label: 'Cups (US)', value: 'cup' },
          { label: 'Pints (US)', value: 'pt' },
          { label: 'Quarts (US)', value: 'qt' },
          { label: 'Gallons (US)', value: 'gal' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'gal',
        options: [
          { label: 'Milliliters (ml)', value: 'ml' },
          { label: 'Liters (L)', value: 'L' },
          { label: 'Cubic Meters (m³)', value: 'cu_m' },
          { label: 'Cups (US)', value: 'cup' },
          { label: 'Pints (US)', value: 'pt' },
          { label: 'Quarts (US)', value: 'qt' },
          { label: 'Gallons (US)', value: 'gal' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Volume', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Liter
      const factors: Record<string, number> = {
        ml: 0.001,
        L: 1.0,
        cu_m: 1000.0,
        cup: 0.2365882365,
        pt: 0.473176473,
        qt: 0.946352946,
        gal: 3.785411784,
      };

      const l = val * (factors[from] || 1);
      const res = l / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    title: 'Speed Converter',
    description: 'Convert speed levels between km/h, mph, m/s, and knots.',
    category: 'converters',
    icon: 'Gauge',
    seo: {
      title: 'Speed Unit Converter - km/h, mph, knots',
      description: 'Convert velocities between meters per second, kilometers per hour, miles per hour, and knots.',
      keywords: ['speed converter', 'convert mph to kmh', 'kmh to mph conversion', 'velocity converter'],
      overview: 'Velocity describes displacement speed over time duration. Aviation and marine contexts use knots, while standard vehicles use km/h or mph.',
      howToUse: ['Input speed.', 'Specify source and target scales.'],
      examples: [{ input: { value: 100, from: 'kmh', to: 'mph' }, output: { result: 62.1371 }, explanation: '100 km/h is equivalent to 62.1371 mph.' }],
      faqs: [{ question: 'What is a knot?', answer: 'A knot represents 1 nautical mile per hour, or approximately 1.852 km/h.' }],
    },
    inputs: [
      { name: 'value', label: 'Speed Value', type: 'number', defaultValue: 60 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'kmh',
        options: [
          { label: 'Meters per Second (m/s)', value: 'ms' },
          { label: 'Kilometers per Hour (km/h)', value: 'kmh' },
          { label: 'Miles per Hour (mph)', value: 'mph' },
          { label: 'Knots (kt)', value: 'kt' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'mph',
        options: [
          { label: 'Meters per Second (m/s)', value: 'ms' },
          { label: 'Kilometers per Hour (km/h)', value: 'kmh' },
          { label: 'Miles per Hour (mph)', value: 'mph' },
          { label: 'Knots (kt)', value: 'kt' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Speed', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: m/s
      const factors: Record<string, number> = {
        ms: 1.0,
        kmh: 1 / 3.6,
        mph: 0.44704,
        kt: 0.514444,
      };

      const ms = val * (factors[from] || 1);
      const res = ms / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'time-converter',
    slug: 'time-converter',
    title: 'Time Converter',
    description: 'Convert intervals between seconds, minutes, hours, days, weeks, months, and years.',
    category: 'converters',
    icon: 'Timer',
    seo: {
      title: 'Time Converter - Seconds, Hours, Days, Years',
      description: 'Convert values between seconds, minutes, hours, days, weeks, months, and years.',
      keywords: ['time converter', 'convert hours to minutes', 'days to weeks', 'seconds to hours'],
      overview: 'Time units are defined by solar rotation counts and scientific decay constants. Standard ratios convert between granular seconds and macroscopic years.',
      howToUse: ['Input duration.', 'Specify source and target units.'],
      examples: [{ input: { value: 24, from: 'hr', to: 'min' }, output: { result: 1440 }, explanation: '24 hours equals 1,440 minutes.' }],
      faqs: [{ question: 'How long is a year?', answer: 'A standard calendar year is 365 days, while leap years contain 366 days.' }],
    },
    inputs: [
      { name: 'value', label: 'Time Value', type: 'number', defaultValue: 1 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'day',
        options: [
          { label: 'Seconds (s)', value: 'sec' },
          { label: 'Minutes (min)', value: 'min' },
          { label: 'Hours (hr)', value: 'hr' },
          { label: 'Days (d)', value: 'day' },
          { label: 'Weeks (w)', value: 'wk' },
          { label: 'Years (yr)', value: 'yr' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'hr',
        options: [
          { label: 'Seconds (s)', value: 'sec' },
          { label: 'Minutes (min)', value: 'min' },
          { label: 'Hours (hr)', value: 'hr' },
          { label: 'Days (d)', value: 'day' },
          { label: 'Weeks (w)', value: 'wk' },
          { label: 'Years (yr)', value: 'yr' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Time', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Second
      const factors: Record<string, number> = {
        sec: 1.0,
        min: 60.0,
        hr: 3600.0,
        day: 86400.0,
        wk: 604800.0,
        yr: 31536000.0, // 365 days
      };

      const s = val * (factors[from] || 1);
      const res = s / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'energy-converter',
    slug: 'energy-converter',
    title: 'Energy Converter',
    description: 'Convert work and energy units between Joules, calories, Watt-hours, and BTUs.',
    category: 'converters',
    icon: 'Zap',
    seo: {
      title: 'Energy Converter - Joules, Calories, kWh, BTUs',
      description: 'Convert energy values between Joules, calories, kilocalories, Watt-hours, kilowatt-hours, and British Thermal Units.',
      keywords: ['energy converter', 'convert joules to calories', 'kwh to joules', 'btu calculator'],
      overview: 'Energy describes thermal or electrical capacity to perform work. Nutrition utilizes calories (kcal), electricity uses kWh, and physics relies on Joules.',
      howToUse: ['Enter energy amount.', 'Specify original and output units.'],
      examples: [{ input: { value: 1, from: 'kwh', to: 'J' }, output: { result: 3600000 }, explanation: '1 kilowatt-hour is exactly 3.6 million Joules.' }],
      faqs: [{ question: 'What is a food calorie?', answer: 'A food calorie is a kilocalorie (kcal), equal to 1,000 standard physical chemistry calories.' }],
    },
    inputs: [
      { name: 'value', label: 'Energy Value', type: 'number', defaultValue: 1000 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'J',
        options: [
          { label: 'Joules (J)', value: 'J' },
          { label: 'Calories (cal)', value: 'cal' },
          { label: 'Kilocalories (kcal)', value: 'kcal' },
          { label: 'Watt-hours (Wh)', value: 'wh' },
          { label: 'Kilowatt-hours (kWh)', value: 'kwh' },
          { label: 'British Thermal Units (BTU)', value: 'btu' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'kcal',
        options: [
          { label: 'Joules (J)', value: 'J' },
          { label: 'Calories (cal)', value: 'cal' },
          { label: 'Kilocalories (kcal)', value: 'kcal' },
          { label: 'Watt-hours (Wh)', value: 'wh' },
          { label: 'Kilowatt-hours (kWh)', value: 'kwh' },
          { label: 'British Thermal Units (BTU)', value: 'btu' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Energy', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Joule
      const factors: Record<string, number> = {
        J: 1.0,
        cal: 4.184,
        kcal: 4184.0,
        wh: 3600.0,
        kwh: 3600000.0,
        btu: 1055.05585,
      };

      const j = val * (factors[from] || 1);
      const res = j / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
  {
    id: 'pressure-converter',
    slug: 'pressure-converter',
    title: 'Pressure Converter',
    description: 'Convert pressure values between Pascals, Bar, PSI, and Atmospheres.',
    category: 'converters',
    icon: 'Compass',
    seo: {
      title: 'Pressure Converter - Pascals, PSI, Bar, Atmospheres',
      description: 'Convert force density levels between Pascals, Bar, PSI, Torrs, and standard atmospheres.',
      keywords: ['pressure converter', 'convert psi to bar', 'bar to pascal conversion', 'psi calculator'],
      overview: 'Pressure is perpendicular force density per area unit. Industrial applications standardise on bar or PSI, physics uses Pascals, and meteorology measures atmospheres.',
      howToUse: ['Input pressure value.', 'Select starting and target pressure scales.'],
      examples: [{ input: { value: 1, from: 'atm', to: 'psi' }, output: { result: 14.6959 }, explanation: '1 standard atmosphere equals 14.6959 pounds per square inch.' }],
      faqs: [{ question: 'What is a Pascal?', answer: 'One Pascal (Pa) is a force of one Newton per square meter.' }],
    },
    inputs: [
      { name: 'value', label: 'Pressure Value', type: 'number', defaultValue: 1 },
      {
        name: 'from',
        label: 'From Unit',
        type: 'select',
        defaultValue: 'atm',
        options: [
          { label: 'Pascals (Pa)', value: 'pa' },
          { label: 'Bar (bar)', value: 'bar' },
          { label: 'Pounds per Square Inch (PSI)', value: 'psi' },
          { label: 'Standard Atmospheres (atm)', value: 'atm' },
          { label: 'Torrs / mmHg', value: 'torr' },
        ],
      },
      {
        name: 'to',
        label: 'To Unit',
        type: 'select',
        defaultValue: 'psi',
        options: [
          { label: 'Pascals (Pa)', value: 'pa' },
          { label: 'Bar (bar)', value: 'bar' },
          { label: 'Pounds per Square Inch (PSI)', value: 'psi' },
          { label: 'Standard Atmospheres (atm)', value: 'atm' },
          { label: 'Torrs / mmHg', value: 'torr' },
        ],
      },
    ],
    outputs: [{ name: 'result', label: 'Converted Pressure', type: 'number' }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const from = inputs.from;
      const to = inputs.to;

      // Base: Pascal
      const factors: Record<string, number> = {
        pa: 1.0,
        bar: 100000.0,
        psi: 6894.757293168,
        atm: 101325.0,
        torr: 133.322368421,
      };

      const pa = val * (factors[from] || 1);
      const res = pa / (factors[to] || 1);

      return {
        result: Math.round(res * 10000) / 10000,
      };
    },
  },
];
