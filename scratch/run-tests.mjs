/**
 * Unit Test Runner for UtilityVerse Calculators and Converters
 */
import { allTools } from '../src/lib/registry.js';

console.log('🧪 Starting UtilityVerse Tool Suite Unit Tests...\n');

let passCount = 0;
let failCount = 0;

for (const tool of allTools) {
  console.log(`Testing [${tool.category.toUpperCase()}] ${tool.title} (${tool.slug})...`);

  // PDF tools require visual rendering or return stub indicators, 
  // we verify they execute their client side trigger stub correctly.
  const isPdf = tool.category === 'pdf';

  try {
    // Compile defaults
    const mockInputs = {};
    tool.inputs.forEach((field) => {
      mockInputs[field.name] = field.defaultValue;
    });

    const res = tool.calculate(mockInputs);

    if (res instanceof Promise) {
      // Async PDF/ocr loader stubs
      res.then((output) => {
        verifyOutput(tool, output, isPdf);
      }).catch((err) => {
        throw err;
      });
    } else {
      verifyOutput(tool, res, isPdf);
    }
    
    console.log(`✅ Passed: ${tool.title}`);
    passCount++;
  } catch (err) {
    console.error(`❌ Failed: ${tool.title} - Error:`, err.message);
    failCount++;
  }
}

function verifyOutput(tool, output, isPdf) {
  if (!output) {
    throw new Error('Calculation returned empty result.');
  }
  if (isPdf) {
    if (output.status !== 'custom_render_required') {
      throw new Error(`PDF tool calculation did not return custom_render_required status, got: ${JSON.stringify(output)}`);
    }
    return;
  }
  // Verify that all expected output fields are present in calculation results
  tool.outputs.forEach((outField) => {
    if (output[outField.name] === undefined) {
      throw new Error(`Missing expected output field: "${outField.name}"`);
    }
  });
}

console.log(`\n========================================`);
console.log(`📊 Test Results: ${passCount} Passed | ${failCount} Failed`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 All tool calculations executed successfully!');
  process.exit(0);
}
