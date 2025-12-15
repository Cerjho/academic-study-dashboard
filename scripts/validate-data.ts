/**
 * Data Validation Script
 *
 * Run this to verify data integrity during development.
 * Usage: node --loader ts-node/esm scripts/validate-data.ts
 */

import {
  getRespondentData,
  getGWADistribution,
  getStudyHabitsData,
} from '../src/data';
import { validateAllData } from '../src/lib/validation';

const respondents = getRespondentData();
const gwa = getGWADistribution();
const studyHabits = getStudyHabitsData();

console.log('🔍 Validating study data...\n');

const validation = validateAllData(respondents, gwa, studyHabits);

if (validation.valid) {
  console.log('✅ All data validation checks passed!\n');
  console.log('📊 Data Summary:');
  console.log(`   Total Respondents: ${respondents.studyMetadata.totalRespondents}`);
  console.log(`   Regular Students: ${respondents.enrollmentDistribution[0].count} (${respondents.enrollmentDistribution[0].percentage}%)`);
  console.log(`   Irregular Students: ${respondents.enrollmentDistribution[1].count} (${respondents.enrollmentDistribution[1].percentage}%)`);
  console.log(`   GWA Categories: ${gwa.categories.length}`);
  console.log(`   Study Hour Ranges: ${studyHabits.studyHoursPerWeek.length}`);
  console.log(`   Correlation Coefficient: ${studyHabits.correlationCoefficient}`);
} else {
  console.error('❌ Data validation failed:\n');
  validation.errors.forEach((error, index) => {
    console.error(`   ${index + 1}. ${error}`);
  });
  process.exit(1);
}
