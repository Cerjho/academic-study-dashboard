/**
 * Process Real Respondents Data
 * 
 * This script processes the raw survey data from realRespondents.json
 * and generates the required data files for the dashboard.
 */

import * as fs from 'fs';
import * as path from 'path';

interface RealRespondent {
  "Timestamp": number;
  "Email Address": string;
  "  Enrollment Status  ": string;
  "  Current General Weighted Average (GWA)  ": string;
  "  How many hours per day do you spend studying outside of class?  ": string;
  "How often do you attend your scheduled classes?  ": string;
  "How would you describe your time-management skills?  ": string;
  "How frequently do you submit tasks/requirements on time?  ": string;
  "How often do you participate in class activities or discussions?  ": string;
  "Do you experience difficulty balancing workload in your subjects?  ": string;
  "What factors most affect your academic performance? (Choose up to 3)  ": string;
  "Do you believe your enrollment status affects your academic performance?  ": string;
  "  In what way does it affect you? (Short answer)": string;
}

// Read the raw data
const rawDataPath = path.join(__dirname, '../src/data/realRespondents.json');
const rawData: RealRespondent[] = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'));

// Clean and normalize data
function cleanEnrollmentStatus(status: string): 'Regular' | 'Irregular' {
  const normalized = status.trim().toLowerCase();
  if (normalized.includes('irregular')) {
    return 'Irregular';
  }
  // Covers "regular", "reular", etc.
  return 'Regular';
}

function normalizeGWARange(gwa: string): string {
  const cleaned = gwa.trim();
  // Map to consistent format: "1.0–1.49" -> "1.00-1.49"
  const mapping: Record<string, string> = {
    "1.0–1.49": "1.00-1.49",
    "1.5–1.99": "1.50-1.99",
    "2.0–2.49": "2.00-2.49",
    "2.5–2.99": "2.50-2.99",
  };
  return mapping[cleaned] || cleaned;
}

function getGWAMidpoint(range: string): number {
  const mapping: Record<string, number> = {
    "1.00-1.49": 1.25,
    "1.50-1.99": 1.75,
    "2.00-2.49": 2.25,
    "2.50-2.99": 2.75,
  };
  return mapping[range] || 2.5;
}

function normalizeStudyHours(hours: string): string {
  const cleaned = hours.trim();
  if (cleaned.includes('Less than 1')) return '<1 hour';
  if (cleaned.includes('1–2') || cleaned.includes('1-2')) return '1-2 hours';
  if (cleaned.includes('3–4') || cleaned.includes('3-4')) return '3-4 hours';
  if (cleaned.includes('More than 4')) return '>4 hours';
  return cleaned;
}

// Process the data - using all responses
const cleanData = rawData;

console.log(`Total responses: ${rawData.length}`);
console.log(`All responses included (no filtering)`);

// 1. Generate respondents.json
const regularCount = cleanData.filter(r => cleanEnrollmentStatus(r["  Enrollment Status  "]) === 'Regular').length;
const irregularCount = cleanData.filter(r => cleanEnrollmentStatus(r["  Enrollment Status  "]) === 'Irregular').length;
const total = cleanData.length;

const respondentsData = {
  studyMetadata: {
    title: "The Impact of Enrollment Status on Academic Achievement",
    institution: "Mabini College",
    program: "Computer Science",
    academicYear: "2024-2025",
    totalRespondents: total,
    dataCollectionDate: new Date(Math.min(...cleanData.map(r => r.Timestamp))).toISOString().split('T')[0]
  },
  enrollmentDistribution: [
    {
      status: "Regular",
      count: regularCount,
      percentage: parseFloat(((regularCount / total) * 100).toFixed(2)),
      color: "#3B82F6"
    },
    {
      status: "Irregular",
      count: irregularCount,
      percentage: parseFloat(((irregularCount / total) * 100).toFixed(2)),
      color: "#EF4444"
    }
  ]
};

// 2. Generate gwaDistribution.json
const gwaRanges = ["1.00-1.49", "1.50-1.99", "2.00-2.49", "2.50-2.99"];
const gwaLabels: Record<string, string> = {
  "1.00-1.49": "Excellent",
  "1.50-1.99": "Very Good",
  "2.00-2.49": "Good",
  "2.50-2.99": "Satisfactory"
};

const gwaCategories = gwaRanges.map(range => {
  const regularInRange = cleanData.filter(r => 
    cleanEnrollmentStatus(r["  Enrollment Status  "]) === 'Regular' &&
    normalizeGWARange(r["  Current General Weighted Average (GWA)  "]) === range
  );
  const irregularInRange = cleanData.filter(r => 
    cleanEnrollmentStatus(r["  Enrollment Status  "]) === 'Irregular' &&
    normalizeGWARange(r["  Current General Weighted Average (GWA)  "]) === range
  );
  
  return {
    range,
    label: gwaLabels[range],
    regular: {
      count: regularInRange.length,
      percentage: parseFloat(((regularInRange.length / regularCount) * 100).toFixed(2))
    },
    irregular: {
      count: irregularInRange.length,
      percentage: parseFloat(((irregularInRange.length / irregularCount) * 100).toFixed(2))
    }
  };
});

// Calculate statistics
function calculateStats(data: RealRespondent[], enrollmentStatus: 'Regular' | 'Irregular') {
  const filtered = data.filter(r => cleanEnrollmentStatus(r["  Enrollment Status  "]) === enrollmentStatus);
  const gwaValues = filtered.map(r => getGWAMidpoint(normalizeGWARange(r["  Current General Weighted Average (GWA)  "])));
  
  const mean = gwaValues.reduce((sum, val) => sum + val, 0) / gwaValues.length;
  const sorted = [...gwaValues].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0 
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  
  const variance = gwaValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / gwaValues.length;
  const stdDeviation = Math.sqrt(variance);
  
  // Mode calculation
  const frequency: Record<number, number> = {};
  gwaValues.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
  const mode = Object.keys(frequency).length > 0 
    ? parseFloat(Object.keys(frequency).reduce((a, b) => frequency[parseFloat(a)] > frequency[parseFloat(b)] ? a : b))
    : mean;
  
  return {
    mean: parseFloat(mean.toFixed(2)),
    median: parseFloat(median.toFixed(2)),
    stdDeviation: parseFloat(stdDeviation.toFixed(2)),
    mode: parseFloat(mode.toFixed(2))
  };
}

const gwaDistributionData = {
  categories: gwaCategories,
  statistics: {
    regular: calculateStats(cleanData, 'Regular'),
    irregular: calculateStats(cleanData, 'Irregular')
  }
};

// 3. Generate studyHabits.json
const studyHoursRanges = ["<1 hour", "1-2 hours", "3-4 hours", ">4 hours"];

const studyHoursData = studyHoursRanges.map(hoursRange => {
  const regularInRange = cleanData.filter(r => 
    cleanEnrollmentStatus(r["  Enrollment Status  "]) === 'Regular' &&
    normalizeStudyHours(r["  How many hours per day do you spend studying outside of class?  "]) === hoursRange
  );
  const irregularInRange = cleanData.filter(r => 
    cleanEnrollmentStatus(r["  Enrollment Status  "]) === 'Irregular' &&
    normalizeStudyHours(r["  How many hours per day do you spend studying outside of class?  "]) === hoursRange
  );
  
  const regularAvgGWA = regularInRange.length > 0
    ? regularInRange.reduce((sum, r) => sum + getGWAMidpoint(normalizeGWARange(r["  Current General Weighted Average (GWA)  "])), 0) / regularInRange.length
    : 0;
    
  const irregularAvgGWA = irregularInRange.length > 0
    ? irregularInRange.reduce((sum, r) => sum + getGWAMidpoint(normalizeGWARange(r["  Current General Weighted Average (GWA)  "])), 0) / irregularInRange.length
    : 0;
  
  return {
    hoursRange,
    regular: {
      count: regularInRange.length,
      avgGWA: parseFloat(regularAvgGWA.toFixed(2))
    },
    irregular: {
      count: irregularInRange.length,
      avgGWA: parseFloat(irregularAvgGWA.toFixed(2))
    }
  };
});

// Calculate correlation coefficient between study hours and GWA
function calculateCorrelation(data: RealRespondent[]): number {
  const studyHoursMapping: Record<string, number> = {
    "<1 hour": 0.5,
    "1-2 hours": 1.5,
    "3-4 hours": 3.5,
    ">4 hours": 5
  };
  
  const pairs = data.map(r => ({
    hours: studyHoursMapping[normalizeStudyHours(r["  How many hours per day do you spend studying outside of class?  "])] || 1.5,
    gwa: getGWAMidpoint(normalizeGWARange(r["  Current General Weighted Average (GWA)  "]))
  }));
  
  const n = pairs.length;
  const sumX = pairs.reduce((sum, p) => sum + p.hours, 0);
  const sumY = pairs.reduce((sum, p) => sum + p.gwa, 0);
  const sumXY = pairs.reduce((sum, p) => sum + p.hours * p.gwa, 0);
  const sumX2 = pairs.reduce((sum, p) => sum + p.hours * p.hours, 0);
  const sumY2 = pairs.reduce((sum, p) => sum + p.gwa * p.gwa, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : parseFloat((numerator / denominator).toFixed(3));
}

const studyHabitsData = {
  studyHoursPerDay: studyHoursData,
  correlationCoefficient: calculateCorrelation(cleanData),
  note: "Negative correlation indicates that more study hours correlate with lower GWA values (better grades)"
};

// Write the files
const dataDir = path.join(__dirname, '../src/data');

fs.writeFileSync(
  path.join(dataDir, 'respondents.json'),
  JSON.stringify(respondentsData, null, 2)
);

fs.writeFileSync(
  path.join(dataDir, 'gwaDistribution.json'),
  JSON.stringify(gwaDistributionData, null, 2)
);

fs.writeFileSync(
  path.join(dataDir, 'studyHabits.json'),
  JSON.stringify(studyHabitsData, null, 2)
);

console.log('\n✅ Data files generated successfully!');
console.log(`- respondents.json (${total} total respondents)`);
console.log(`- gwaDistribution.json`);
console.log(`- studyHabits.json`);
