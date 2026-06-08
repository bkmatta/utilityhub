import { Tool } from '@/types/tool';

export const healthTools: Tool[] = [
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate Body Mass Index (BMI) to determine your weight category (Underweight, Normal, Overweight, Obese).',
    category: 'health',
    icon: 'Activity',
    seo: {
      title: 'BMI Calculator - Free Body Mass Index Calculator',
      description: 'Find your BMI (Body Mass Index) quickly. Supports Metric and Imperial units with BMI category breakdown.',
      keywords: ['bmi calculator', 'body mass index', 'weight category', 'healthy weight', 'obesity index'],
      overview: 'Body Mass Index (BMI) is a value derived from the mass (weight) and height of a person. It is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m2. BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese based on tissue mass and fat.',
      formula: {
        expression: 'BMI = weight (kg) / (height (m) ^ 2)',
        explanation: 'For Imperial: BMI = 703 * weight (lbs) / (height (inches) ^ 2)',
      },
      howToUse: ['Select Metric or Imperial system.', 'Input your weight and height.', 'Click calculate to see your BMI and health classification.'],
      examples: [
        {
          input: { weight: 70, height: 175, unitSystem: 'metric' },
          output: { bmi: 22.86, category: 'Normal Weight', range: '18.5 - 24.9' },
          explanation: 'A person weighting 70kg at 1.75m has a BMI of 22.86, which falls squarely in the healthy Normal Weight range.',
        },
      ],
      faqs: [
        { question: 'Is BMI accurate for athletes?', answer: 'BMI can overestimate body fat in athletes or muscular people because muscle is denser than fat, causing higher weight values.' },
        { question: 'What is a healthy BMI range?', answer: 'For adults 20 and older, a normal/healthy BMI is between 18.5 and 24.9.' },
      ],
    },
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
      const w = Number(inputs.weight);
      const h = Number(inputs.height) / 100; // cm to m

      if (h <= 0) return { bmi: 0, category: 'Invalid height', idealRange: 'N/A' };

      const bmi = w / (h * h);
      let cat = 'Normal Weight';
      if (bmi < 18.5) cat = 'Underweight';
      else if (bmi >= 18.5 && bmi < 25) cat = 'Normal Weight';
      else if (bmi >= 25 && bmi < 30) cat = 'Overweight';
      else cat = 'Obese';

      return {
        bmi: Math.round(bmi * 100) / 100,
        category: cat,
        idealRange: '18.5 - 24.9 kg/m²',
      };
    },
  },
  {
    id: 'bmr-calculator',
    slug: 'bmr-calculator',
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) - the number of calories burned at rest.',
    category: 'health',
    icon: 'Flame',
    seo: {
      title: 'BMR Calculator - Calculate Basal Metabolic Rate',
      description: 'Compute your BMR (Basal Metabolic Rate) using the Mifflin-St Jeor equation. Learn your rest calorie needs.',
      keywords: ['bmr calculator', 'basal metabolic rate', 'mifflin st jeor', 'resting calories'],
      overview: 'Your Basal Metabolic Rate (BMR) is the amount of energy (calories) expended while at rest in a neutrally temperate environment. In this state, energy is used only to maintain vital organs.',
      formula: {
        expression: 'Men: BMR = 10W + 6.25H - 5A + 5 | Women: BMR = 10W + 6.25H - 5A - 161',
        explanation: 'Where W is weight in kg, H is height in cm, and A is age in years (Mifflin-St Jeor formula).',
      },
      howToUse: ['Input your age, gender, height, and weight.', 'View BMR in calories per day.'],
      examples: [
        {
          input: { age: 25, gender: 'male', height: 180, weight: 80 },
          output: { bmr: 1785 },
          explanation: 'An 80kg, 180cm, 25-year-old male burns 1,785 calories per day just resting.',
        },
      ],
      faqs: [{ question: 'What is Mifflin-St Jeor?', answer: 'It is a modern formula recognized as the most accurate estimation of resting energy expenditure in healthy adults.' }],
    },
    inputs: [
      { name: 'age', label: 'Age', type: 'number', defaultValue: 25, unit: 'years', slider: { min: 10, max: 100, step: 1 } },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175, unit: 'cm', slider: { min: 100, max: 230, step: 1 } },
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, unit: 'kg', slider: { min: 30, max: 180, step: 1 } },
    ],
    outputs: [{ name: 'bmr', label: 'Basal Metabolic Rate (BMR)', type: 'text', unit: ' kcal/day' }],
    calculate: (inputs) => {
      const a = Number(inputs.age);
      const gender = inputs.gender;
      const h = Number(inputs.height);
      const w = Number(inputs.weight);

      let bmr = 0;
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }

      return {
        bmr: Math.round(bmr).toString(),
      };
    },
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    title: 'Calorie Calculator',
    description: 'Calculate daily calories needed to maintain, lose, or gain weight based on activity level.',
    category: 'health',
    icon: 'Apple',
    seo: {
      title: 'Daily Calorie Calculator - Maintenance & Weight Loss Planner',
      description: 'Compute daily calories needed based on activity levels. See adjustments for weight loss and muscle building goals.',
      keywords: ['calorie calculator', 'daily calories', 'maintenance calories', 'calorie deficit', 'weight loss calories'],
      overview: 'Daily Energy Expenditure (TDEE) determines how many calories you burn each day. To maintain weight, intake should match TDEE. Deficits promote loss, surpluses support gain.',
      howToUse: ['Provide age, gender, dimensions, and activity multiplier.', 'Calculate targets.'],
      examples: [
        {
          input: { age: 30, gender: 'female', height: 165, weight: 60, activity: '1.375' },
          output: { maintenance: 1785, loseWeight: 1285, gainWeight: 2285 },
          explanation: 'A female with 1,298 BMR and light activity needs 1,785 maintenance calories, 1,285 to lose 0.5kg/week.',
        },
      ],
      faqs: [{ question: 'How big should my calorie deficit be?', answer: 'A deficit of 300 to 500 calories is generally safe and sustainable for fat loss.' }],
    },
    inputs: [
      { name: 'age', label: 'Age', type: 'number', defaultValue: 30, unit: 'years', slider: { min: 15, max: 80, step: 1 } },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170, unit: 'cm', slider: { min: 100, max: 220, step: 1 } },
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, unit: 'kg', slider: { min: 30, max: 150, step: 1 } },
      {
        name: 'activity',
        label: 'Activity Level',
        type: 'select',
        defaultValue: '1.375',
        options: [
          { label: 'Sedentary (Little or no exercise)', value: '1.2' },
          { label: 'Lightly Active (1-3 days/week)', value: '1.375' },
          { label: 'Moderately Active (3-5 days/week)', value: '1.55' },
          { label: 'Very Active (6-7 days/week)', value: '1.725' },
          { label: 'Extra Active (Hard exercise/physical job)', value: '1.9' },
        ],
      },
    ],
    outputs: [
      { name: 'maintenance', label: 'Maintenance Calories (TDEE)', type: 'text', unit: ' kcal/day' },
      { name: 'loseWeight', label: 'Weight Loss (500 kcal Deficit)', type: 'text', unit: ' kcal/day' },
      { name: 'gainWeight', label: 'Weight Gain (500 kcal Surplus)', type: 'text', unit: ' kcal/day' },
    ],
    calculate: (inputs) => {
      const a = Number(inputs.age);
      const gender = inputs.gender;
      const h = Number(inputs.height);
      const w = Number(inputs.weight);
      const activity = Number(inputs.activity);

      let bmr = 0;
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }

      const tdee = bmr * activity;
      return {
        maintenance: Math.round(tdee).toString(),
        loseWeight: Math.round(tdee - 500).toString(),
        gainWeight: Math.round(tdee + 500).toString(),
      };
    },
  },
  {
    id: 'water-intake-calculator',
    slug: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    description: 'Calculate your recommended daily water consumption targets based on body weight and activity levels.',
    category: 'health',
    icon: 'Droplet',
    seo: {
      title: 'Water Intake Calculator - Daily Hydration Target',
      description: 'Compute how much water you should drink per day. Adjust for exercise to prevent dehydration.',
      keywords: ['water intake calculator', 'daily hydration', 'how much water to drink', 'water calculator'],
      overview: 'Hydration affects energy levels, focus, organ function, and digestive health. Water intake targets scale with physical weight and active workout durations.',
      howToUse: ['Input weight and active exercise time.', 'Calculate recommended ounces and liters.'],
      examples: [
        {
          input: { weight: 70, exercise: 30 },
          output: { liters: 2.52, glasses: 10 },
          explanation: 'A 70kg individual exercising 30 mins should drink ~2.5 Liters of water daily.',
        },
      ],
      faqs: [{ question: 'Does coffee count towards hydration?', answer: 'Yes, caffeinated drinks contribute to daily liquid targets, though pure water is preferred.' }],
    },
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, unit: 'kg', slider: { min: 30, max: 180, step: 1 } },
      { name: 'exercise', label: 'Exercise Duration (Minutes/Day)', type: 'number', defaultValue: 30, unit: 'mins', slider: { min: 0, max: 180, step: 10 } },
    ],
    outputs: [
      { name: 'liters', label: 'Daily Water Volume (Liters)', type: 'text', unit: ' L' },
      { name: 'glasses', label: '8 oz Glasses Equivalent', type: 'text', unit: ' glasses' },
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weight); // kg
      const ex = Number(inputs.exercise); // minutes

      // Base: 35ml per kg of body weight
      let baseMl = w * 35;
      // Add: 350ml per 30 minutes of exercise
      const exMl = (ex / 30) * 350;
      const totalLiters = (baseMl + exMl) / 1000;
      const glasses = (totalLiters * 1000) / 250; // 250 ml glass

      return {
        liters: totalLiters.toFixed(2),
        glasses: Math.round(glasses).toString(),
      };
    },
  },
  {
    id: 'body-fat-calculator',
    slug: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using standard U.S. Navy circumference tape measurements.',
    category: 'health',
    icon: 'Heart',
    seo: {
      title: 'Body Fat Calculator - US Navy Method',
      description: 'Estimate body fat percentage using Navy circumference values (neck, waist, hip measurements).',
      keywords: ['body fat calculator', 'fat percentage', 'navy method body fat', 'lean body mass'],
      overview: 'Body fat percentage measures fat mass relative to overall tissue. The Navy Method estimation uses circumferences of the waist, neck, and hips (for females).',
      howToUse: ['Select gender.', 'Enter height and neck, waist (and hip if female) circumferences in cm.'],
      examples: [
        {
          input: { gender: 'male', height: 180, neck: 38, waist: 88, hip: 0 },
          output: { fatPercent: 16.5, category: 'Fitness' },
          explanation: 'A male with 180cm height, 38cm neck, and 88cm waist yields an estimated body fat of ~16.5%.',
        },
      ],
      faqs: [{ question: 'What are normal body fat values?', answer: 'For men, healthy fat is 14-24%. For women, healthy fat is 21-31%.' }],
    },
    inputs: [
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175, unit: 'cm', slider: { min: 100, max: 220, step: 1 } },
      { name: 'neck', label: 'Neck Circumference (cm)', type: 'number', defaultValue: 38, unit: 'cm', slider: { min: 25, max: 60, step: 0.5 } },
      { name: 'waist', label: 'Waist Circumference (cm)', type: 'number', defaultValue: 85, unit: 'cm', slider: { min: 50, max: 150, step: 0.5 } },
      { name: 'hip', label: 'Hip Circumference (cm) - Female Only', type: 'number', defaultValue: 90, unit: 'cm', slider: { min: 50, max: 150, step: 0.5 } },
    ],
    outputs: [
      { name: 'fatPercent', label: 'Estimated Body Fat', type: 'percentage' },
      { name: 'leanMass', label: 'Lean Mass Percentage', type: 'percentage' },
      { name: 'category', label: 'Fat Category', type: 'text' },
    ],
    calculate: (inputs) => {
      const gender = inputs.gender;
      const h = Number(inputs.height);
      const neck = Number(inputs.neck);
      const waist = Number(inputs.waist);
      const hip = Number(inputs.hip);

      let fat = 0;
      // US Navy formulas (in cm)
      if (gender === 'male') {
        // %Fat = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
        const diff = waist - neck;
        if (diff > 0) {
          fat = 86.01 * Math.log10(diff) - 70.041 * Math.log10(h) + 36.76;
        }
      } else {
        // %Fat = 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
        const sum = waist + hip - neck;
        if (sum > 0) {
          fat = 163.205 * Math.log10(sum) - 97.684 * Math.log10(h) - 78.387;
        }
      }

      if (fat < 2) fat = 2; // minimum boundary
      let cat = 'Acceptable';
      if (gender === 'male') {
        if (fat < 6) cat = 'Essential Fat';
        else if (fat < 14) cat = 'Athletes';
        else if (fat < 18) cat = 'Fitness';
        else if (fat < 25) cat = 'Acceptable';
        else cat = 'Obese';
      } else {
        if (fat < 14) cat = 'Essential Fat';
        else if (fat < 21) cat = 'Athletes';
        else if (fat < 25) cat = 'Fitness';
        else if (fat < 32) cat = 'Acceptable';
        else cat = 'Obese';
      }

      return {
        fatPercent: Math.round(fat * 10) / 10,
        leanMass: Math.round((100 - fat) * 10) / 10,
        category: cat,
      };
    },
  },
  {
    id: 'pregnancy-calculator',
    slug: 'pregnancy-calculator',
    title: 'Pregnancy Due Date Calculator',
    description: 'Calculate your estimated baby due date and current gestational age based on your last period.',
    category: 'health',
    icon: 'CalendarDays',
    seo: {
      title: 'Pregnancy Due Date Calculator - Gestational Age Estimator',
      description: 'Compute your pregnancy due date, current gestational age in weeks, and key milestone dates online.',
      keywords: ['pregnancy calculator', 'due date calculator', 'gestational age', 'baby due date', 'last menstrual period'],
      overview: 'Gestational age is calculated from the first day of your Last Menstrual Period (LMP). Due dates estimate a 40-week gestation span.',
      howToUse: ['Input the date of the first day of your last period.', 'Enter typical cycle length (default 28 days).'],
      examples: [
        {
          input: { lmp: '2026-01-01', cycle: 28 },
          output: { dueDate: '2026-10-08', weeks: '22 weeks' },
          explanation: 'LMP of Jan 1st 2026 yields a due date of Oct 8th 2026.',
        },
      ],
      faqs: [{ question: 'How accurate is the due date?', answer: 'Only about 4% of babies are born exactly on their due date; most arrive within 2 weeks either side.' }],
    },
    inputs: [
      { name: 'lmp', label: 'First Day of Last Period', type: 'text', defaultValue: new Date().toISOString().split('T')[0], helpText: 'Format: YYYY-MM-DD' },
      { name: 'cycle', label: 'Average Cycle Length (Days)', type: 'number', defaultValue: 28, unit: 'days', slider: { min: 20, max: 45, step: 1 } },
    ],
    outputs: [
      { name: 'dueDate', label: 'Estimated Due Date', type: 'text' },
      { name: 'progress', label: 'Gestational Age', type: 'text' },
      { name: 'trimester', label: 'Current Trimester', type: 'text' },
    ],
    calculate: (inputs) => {
      const lmpDate = new Date(inputs.lmp);
      if (isNaN(lmpDate.getTime())) {
        return { dueDate: 'Invalid Date', progress: 'N/A', trimester: 'N/A' };
      }

      const cycleAdjustment = Number(inputs.cycle) - 28;
      // Naegele's rule adjusted for cycle length: Add 280 days + cycleAdjustment to LMP
      const due = new Date(lmpDate.getTime());
      due.setDate(due.getDate() + 280 + cycleAdjustment);

      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;

      let trimester = 'First';
      if (weeks >= 13 && weeks < 27) trimester = 'Second';
      else if (weeks >= 27) trimester = 'Third';

      return {
        dueDate: due.toDateString(),
        progress: `${weeks} Weeks, ${days} Days`,
        trimester: `${trimester} Trimester`,
      };
    },
  },
  {
    id: 'ovulation-calculator',
    slug: 'ovulation-calculator',
    title: 'Ovulation Calculator',
    description: 'Predict your most fertile days and estimated ovulation window to plan for conception.',
    category: 'health',
    icon: 'Calendar',
    seo: {
      title: 'Ovulation Calculator - Fertile Window Predictor',
      description: 'Predict fertile days and ovulation periods based on cycle parameters to support family planning.',
      keywords: ['ovulation calculator', 'fertility window', 'conceptive days', 'ovulation calendar'],
      overview: 'Ovulation occurs approximately 14 days before your next period. The fertile window represents the five days before ovulation and the day of ovulation.',
      howToUse: ['Input last menstrual period date and normal cycle length.'],
      examples: [
        {
          input: { lmp: '2026-06-01', cycle: 28 },
          output: { ovulationDate: '2026-06-15', fertileRange: '2026-06-10 to 2026-06-16' },
          explanation: 'For a 28-day cycle starting June 1st, ovulation is June 15th with peak fertile window June 10-16.',
        },
      ],
      faqs: [{ question: 'What is a luteal phase?', answer: 'The luteal phase is the second half of the cycle, usually lasting 12 to 16 days from ovulation to period.' }],
    },
    inputs: [
      { name: 'lmp', label: 'Start Date of Last Period', type: 'text', defaultValue: new Date().toISOString().split('T')[0], helpText: 'Format: YYYY-MM-DD' },
      { name: 'cycle', label: 'Average Cycle Length (Days)', type: 'number', defaultValue: 28, unit: 'days', slider: { min: 21, max: 40, step: 1 } },
    ],
    outputs: [
      { name: 'ovulationDate', label: 'Estimated Ovulation Day', type: 'text' },
      { name: 'fertileWindow', label: 'Peak Fertile Window', type: 'text' },
    ],
    calculate: (inputs) => {
      const lmpDate = new Date(inputs.lmp);
      if (isNaN(lmpDate.getTime())) {
        return { ovulationDate: 'Invalid Date', fertileWindow: 'N/A' };
      }
      const cycle = Number(inputs.cycle);

      // Ovulation occurs (cycle - 14) days after LMP
      const ovDate = new Date(lmpDate.getTime());
      ovDate.setDate(ovDate.getDate() + (cycle - 14));

      const startFertile = new Date(ovDate.getTime());
      startFertile.setDate(startFertile.getDate() - 5);

      const endFertile = new Date(ovDate.getTime());
      endFertile.setDate(endFertile.getDate() + 1);

      return {
        ovulationDate: ovDate.toDateString(),
        fertileWindow: `${startFertile.toDateString()} - ${endFertile.toDateString()}`,
      };
    },
  },
  {
    id: 'heart-rate-calculator',
    slug: 'heart-rate-calculator',
    title: 'Heart Rate Zone Calculator',
    description: 'Calculate target heart rate training zones (aerobic, anaerobic, fat-burn) based on your age.',
    category: 'health',
    icon: 'HeartHandshake',
    seo: {
      title: 'Heart Rate Zone Calculator - Target Training Zones',
      description: 'Compute target heart rate zones for fat burning, cardio, and aerobic activities using age and resting pulse.',
      keywords: ['heart rate calculator', 'training zones', 'fat burn zone', 'cardio zones', 'max heart rate'],
      overview: 'Heart rate zones define exercise intensities based on a percentage of your maximum heart rate (MHR). Adjusting intensity supports training goals.',
      howToUse: ['Input your age.', 'Optional: input resting heart rate for Karvonen formula precision.'],
      examples: [
        {
          input: { age: 30, restingHR: 60 },
          output: { maxHR: 190, fatBurn: '112 - 131 bpm', aerobic: '131 - 151 bpm' },
          explanation: 'At age 30, max heart rate is 190 bpm. Target aerobic zone (70-80%) ranges from 131 to 151 bpm.',
        },
      ],
      faqs: [{ question: 'How is max heart rate calculated?', answer: 'A common standard formula is 220 minus your age.' }],
    },
    inputs: [
      { name: 'age', label: 'Age', type: 'number', defaultValue: 30, unit: 'years', slider: { min: 10, max: 90, step: 1 } },
      { name: 'restingHR', label: 'Resting Heart Rate (bpm - Optional)', type: 'number', defaultValue: 60, unit: 'bpm', slider: { min: 40, max: 100, step: 1 } },
    ],
    outputs: [
      { name: 'maxHR', label: 'Max Heart Rate', type: 'text', unit: ' bpm' },
      { name: 'fatBurn', label: 'Fat Burn Zone (55% - 70%)', type: 'text' },
      { name: 'aerobic', label: 'Aerobic Zone (70% - 85%)', type: 'text' },
      { name: 'peak', label: 'Anaerobic/Peak Zone (85% - 100%)', type: 'text' },
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const resting = Number(inputs.restingHR) || 60;
      
      const max = 220 - age;
      const reserve = max - resting; // Karvonen Formula

      // Fat burn (55-70% intensity)
      const fbMin = Math.round(reserve * 0.55 + resting);
      const fbMax = Math.round(reserve * 0.70 + resting);

      // Aerobic (70-85%)
      const aeMin = Math.round(reserve * 0.70 + resting);
      const aeMax = Math.round(reserve * 0.85 + resting);

      // Anaerobic (85-100%)
      const anMin = Math.round(reserve * 0.85 + resting);
      const anMax = max;

      return {
        maxHR: max.toString(),
        fatBurn: `${fbMin} - ${fbMax} bpm`,
        aerobic: `${aeMin} - ${aeMax} bpm`,
        peak: `${anMin} - ${anMax} bpm`,
      };
    },
  },
  {
    id: 'ideal-weight-calculator',
    slug: 'ideal-weight-calculator',
    title: 'Ideal Weight Calculator',
    description: 'Calculate standard ideal body weight estimates using Devine, Robinson, and Miller formulas.',
    category: 'health',
    icon: 'TrendingUp',
    seo: {
      title: 'Ideal Weight Calculator - Devine & Robinson Formulas',
      description: 'Compute estimated ideal body weight based on height and gender using standard clinical algorithms.',
      keywords: ['ideal weight calculator', 'devine formula weight', 'robinson formula', 'healthy weight estimator'],
      overview: 'Ideal Body Weight (IBW) was originally introduced for drug dosage estimations, but it remains a helpful index to assess healthy weights relative to height.',
      howToUse: ['Select gender.', 'Input height.'],
      examples: [
        {
          input: { gender: 'female', height: 165 },
          output: { devine: 54.9, robinson: 53.6 },
          explanation: 'For a 165cm (approx 5ft 5in) female, the Devine formula estimates ideal weight as 54.9 kg.',
        },
      ],
      faqs: [{ question: 'What is the Devine formula?', answer: 'Devine calculates: Men = 50.0 + 2.3 kg per inch over 5 feet, Women = 45.5 + 2.3 kg per inch over 5 feet.' }],
    },
    inputs: [
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        defaultValue: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175, unit: 'cm', slider: { min: 120, max: 220, step: 1 } },
    ],
    outputs: [
      { name: 'devine', label: 'Devine Formula Target', type: 'text', unit: ' kg' },
      { name: 'robinson', label: 'Robinson Formula Target', type: 'text', unit: ' kg' },
      { name: 'bmiRange', label: 'Healthy BMI Weight Range', type: 'text' },
    ],
    calculate: (inputs) => {
      const gender = inputs.gender;
      const hCm = Number(inputs.height);
      const hInches = hCm / 2.54;
      const inchesOver5Ft = Math.max(0, hInches - 60);

      let devine = 0;
      let robinson = 0;

      if (gender === 'male') {
        devine = 50.0 + 2.3 * inchesOver5Ft;
        robinson = 52.0 + 1.9 * inchesOver5Ft;
      } else {
        devine = 45.5 + 2.3 * inchesOver5Ft;
        robinson = 49.0 + 1.7 * inchesOver5Ft;
      }

      // BMI based range: bmi 18.5 to 25 -> weight = bmi * h_m^2
      const hM = hCm / 100;
      const minW = 18.5 * (hM * hM);
      const maxW = 24.9 * (hM * hM);

      return {
        devine: devine.toFixed(1),
        robinson: robinson.toFixed(1),
        bmiRange: `${minW.toFixed(1)} - ${maxW.toFixed(1)} kg`,
      };
    },
  },
  {
    id: 'macro-calculator',
    slug: 'macro-calculator',
    title: 'Macro Calculator',
    description: 'Calculate optimal macro-nutrient splits (carbohydrates, proteins, fats) based on dietary targets.',
    category: 'health',
    icon: 'Scale',
    seo: {
      title: 'Macro Calculator - Calculate Protein, Fat, Carbs splits',
      description: 'Compute macro-nutrient targets matching calorie inputs. Select muscle build, fat loss, or keto allocations.',
      keywords: ['macro calculator', 'macronutrients splits', 'protein carbs fat calculator', 'diet calculator'],
      overview: 'Macronutrients make up the caloric content of food (Proteins: 4kcal/g, Carbs: 4kcal/g, Fats: 9kcal/g). Customizing these ratios assists muscle growth or body composition.',
      howToUse: ['Input target daily calories.', 'Select macro goal profile.'],
      examples: [
        {
          input: { calories: 2000, profile: 'balanced' },
          output: { protein: 150, carbs: 200, fat: 67 },
          explanation: 'At 2000 calories with a balanced split (40% carbs, 30% protein, 30% fat), macros are: 200g carbs, 150g protein, 67g fat.',
        },
      ],
      faqs: [{ question: 'How much protein is recommended for athletes?', answer: 'Athletes typically require 1.6 to 2.2 grams of protein per kilogram of body weight.' }],
    },
    inputs: [
      { name: 'calories', label: 'Daily Calories Target', type: 'number', defaultValue: 2000, unit: 'kcal', slider: { min: 1000, max: 5000, step: 50 } },
      {
        name: 'profile',
        label: 'Diet Goal Profile',
        type: 'select',
        defaultValue: 'balanced',
        options: [
          { label: 'Balanced (40% Carbs, 30% Protein, 30% Fat)', value: 'balanced' },
          { label: 'Low Carb/High Protein (20% Carbs, 40% Protein, 40% Fat)', value: 'lowcarb' },
          { label: 'High Carb/Endurance (60% Carbs, 20% Protein, 20% Fat)', value: 'highcarb' },
          { label: 'Keto (5% Carbs, 25% Protein, 70% Fat)', value: 'keto' },
        ],
      },
    ],
    outputs: [
      { name: 'carbs', label: 'Carbohydrates (grams)', type: 'text', unit: ' g' },
      { name: 'protein', label: 'Protein (grams)', type: 'text', unit: ' g' },
      { name: 'fat', label: 'Fat (grams)', type: 'text', unit: ' g' },
    ],
    calculate: (inputs) => {
      const c = Number(inputs.calories);
      const profile = inputs.profile;

      let pctCarbs = 0.4;
      let pctProt = 0.3;
      let pctFat = 0.3;

      if (profile === 'lowcarb') {
        pctCarbs = 0.2; pctProt = 0.4; pctFat = 0.4;
      } else if (profile === 'highcarb') {
        pctCarbs = 0.6; pctProt = 0.2; pctFat = 0.2;
      } else if (profile === 'keto') {
        pctCarbs = 0.05; pctProt = 0.25; pctFat = 0.7;
      }

      const carbsG = (c * pctCarbs) / 4;
      const protG = (c * pctProt) / 4;
      const fatG = (c * pctFat) / 9;

      return {
        carbs: Math.round(carbsG).toString(),
        protein: Math.round(protG).toString(),
        fat: Math.round(fatG).toString(),
      };
    },
  },
];
