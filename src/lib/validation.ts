/**
 * Data Validation Utilities
 *
 * Functions to validate the integrity and consistency of study data.
 */

import type {
  RespondentData,
  GWADistributionData,
  StudyHabitsData,
} from '@/types';

/**
 * Validates that enrollment distribution sums correctly
 */
export function validateEnrollmentData(data: RespondentData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check total counts
  const totalCount = data.enrollmentDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  if (totalCount !== data.studyMetadata.totalRespondents) {
    errors.push(
      `Enrollment counts (${totalCount}) don't match total respondents (${data.studyMetadata.totalRespondents})`
    );
  }

  // Check percentage sum
  const totalPercentage = data.enrollmentDistribution.reduce(
    (sum, item) => sum + item.percentage,
    0
  );
  if (Math.abs(totalPercentage - 100) > 0.01) {
    errors.push(
      `Enrollment percentages sum to ${totalPercentage.toFixed(2)}%, expected 100%`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates GWA distribution data consistency
 */
export function validateGWAData(
  gwaData: GWADistributionData,
  respondentData: RespondentData
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  const regularTotal = respondentData.enrollmentDistribution.find(
    (e) => e.status === 'Regular'
  )?.count;
  const irregularTotal = respondentData.enrollmentDistribution.find(
    (e) => e.status === 'Irregular'
  )?.count;

  // Check regular student counts
  const regularSum = gwaData.categories.reduce(
    (sum, cat) => sum + cat.regular.count,
    0
  );
  if (regularSum !== regularTotal) {
    errors.push(
      `Regular GWA counts (${regularSum}) don't match enrollment data (${regularTotal})`
    );
  }

  // Check irregular student counts
  const irregularSum = gwaData.categories.reduce(
    (sum, cat) => sum + cat.irregular.count,
    0
  );
  if (irregularSum !== irregularTotal) {
    errors.push(
      `Irregular GWA counts (${irregularSum}) don't match enrollment data (${irregularTotal})`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates study habits data consistency
 */
export function validateStudyHabitsData(
  studyData: StudyHabitsData,
  respondentData: RespondentData
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  const regularTotal = respondentData.enrollmentDistribution.find(
    (e) => e.status === 'Regular'
  )?.count;
  const irregularTotal = respondentData.enrollmentDistribution.find(
    (e) => e.status === 'Irregular'
  )?.count;

  // Check regular student counts
  const regularSum = studyData.studyHoursPerWeek.reduce(
    (sum, range) => sum + range.regular.count,
    0
  );
  if (regularSum !== regularTotal) {
    errors.push(
      `Regular study hours counts (${regularSum}) don't match enrollment data (${regularTotal})`
    );
  }

  // Check irregular student counts
  const irregularSum = studyData.studyHoursPerWeek.reduce(
    (sum, range) => sum + range.irregular.count,
    0
  );
  if (irregularSum !== irregularTotal) {
    errors.push(
      `Irregular study hours counts (${irregularSum}) don't match enrollment data (${irregularTotal})`
    );
  }

  // Validate correlation coefficient range
  if (
    studyData.correlationCoefficient < -1 ||
    studyData.correlationCoefficient > 1
  ) {
    errors.push(
      `Correlation coefficient (${studyData.correlationCoefficient}) must be between -1 and 1`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates all study data
 */
export function validateAllData(
  respondents: RespondentData,
  gwa: GWADistributionData,
  studyHabits: StudyHabitsData
): {
  valid: boolean;
  errors: string[];
} {
  const allErrors: string[] = [];

  const enrollmentValidation = validateEnrollmentData(respondents);
  const gwaValidation = validateGWAData(gwa, respondents);
  const studyHabitsValidation = validateStudyHabitsData(
    studyHabits,
    respondents
  );

  allErrors.push(...enrollmentValidation.errors);
  allErrors.push(...gwaValidation.errors);
  allErrors.push(...studyHabitsValidation.errors);

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
