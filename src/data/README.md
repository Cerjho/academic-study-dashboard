# 📊 Study Data Documentation

This directory contains the static JSON data files for the academic study dashboard analyzing the impact of enrollment status on academic achievement.

## 📁 Data Files

### 1. `respondents.json`

**Purpose**: Study metadata and enrollment distribution

**Structure**:

- `studyMetadata`: Core information about the research study
  - `title`: Study title
  - `institution`: Research institution name
  - `program`: Academic program
  - `academicYear`: Study period
  - `totalRespondents`: Total number of participants
  - `dataCollectionDate`: When data was collected
  
- `enrollmentDistribution`: Breakdown by enrollment status
  - `status`: "Regular" or "Irregular"
  - `count`: Number of students
  - `percentage`: Percentage of total (to 2 decimal places)
  - `color`: Hex color code for visual consistency

**Sample**:

```json
{
  "studyMetadata": {
    "title": "The Impact of Enrollment Status on Academic Achievement",
    "institution": "Mabini College",
    "program": "Computer Science",
    "academicYear": "2024-2025",
    "totalRespondents": 73,
    "dataCollectionDate": "2024-11-15"
  },
  "enrollmentDistribution": [
    {
      "status": "Regular",
      "count": 55,
      "percentage": 75.34,
      "color": "#3B82F6"
    }
  ]
}
```

---

### 2. `gwaDistribution.json`

**Purpose**: Academic performance analysis by GWA (General Weighted Average) ranges

**Structure**:

- `categories`: Array of GWA ranges with student counts
  - `range`: GWA range (e.g., "1.00-1.50")
  - `label`: Descriptive label (Excellent, Very Good, Good, Fair)
  - `regular`: Data for regular students
    - `count`: Number of students
    - `percentage`: Percentage within regular cohort
  - `irregular`: Data for irregular students
    - `count`: Number of students
    - `percentage`: Percentage within irregular cohort

- `statistics`: Descriptive statistics for both groups
  - `regular` / `irregular`:
    - `mean`: Average GWA
    - `median`: Middle value
    - `stdDeviation`: Standard deviation
    - `mode`: Most frequent GWA

**GWA Scale** (Lower is better):

- 1.00-1.50: Excellent
- 1.51-2.00: Very Good
- 2.01-2.50: Good
- 2.51-3.00: Fair
- 3.01-5.00: Failing (not included in this dataset)

**Key Findings**:

- Regular students: Mean GWA = 1.86 (Very Good)
- Irregular students: Mean GWA = 2.50 (Satisfactory)
- Difference: 0.64 GWA points in favor of regular students
- Statistical significance: t(71) = -5.872, p < 0.001, Cohen's d = 1.59

---

### 3. `studyHabits.json`

**Purpose**: Correlation between study hours and academic performance

**Structure**:

- `studyHoursPerWeek`: Array of study hour ranges
  - `hoursRange`: Time range (e.g., "0-5", "6-10", "16+")
  - `regular`: Regular students' data
    - `count`: Number of students in this range
    - `avgGWA`: Average GWA for this group
  - `irregular`: Irregular students' data
    - `count`: Number of students
    - `avgGWA`: Average GWA

- `correlationCoefficient`: Pearson correlation (-1 to 1)
  - **-0.494**: Moderate negative correlation (r = -0.494, p < 0.001)
  - Interpretation: More study hours = Lower GWA (better performance in Philippine system)

**Pattern Observed**:

| Hours/Day | Regular Avg GWA | Irregular Avg GWA |
|-----------|-----------------|-------------------|
| <1 hour   | 1.85 (Very Good)| 2.58 (Satisfactory)|
| 1-2 hours | 2.20 (Good)     | 2.56 (Satisfactory)|
| 3-4 hours | 2.17 (Good)     | 2.50 (Satisfactory)|
| >4 hours  | 1.49 (Excellent)| 1.75 (Very Good)  |

---

### 4. `demographics.json`

**Purpose**: Year level distribution across enrollment status

**Structure**:

- `yearLevel`: Array of year level distributions
  - `year`: Academic year (1st-4th Year)
  - `regular`: Count,
  getDemographicsData,
  getAttendanceData,
  getTimeManagementData,
  getPerformanceFactorsData,
  getStatisticalTestsData,
  getQualitativeThemesData,
  getAllStudyData // Get all at once
} from '@/data';

// In your component
const respondents = getRespondentData();
const gwaData = getGWADistribution();
const studyData = getStudyHabitsData();
const statsData = getStatisticalTestsData();
const qualData = getQualitativeThemesData();
```

### Type Safety

All data structures have corresponding TypeScript interfaces in `@/types`:

**Core Data Types:**
- `RespondentData`
- `GWADistributionData`
- `StudyHabitsData`

**Extended Data Types:**
- `DemographicsData`
- `AttendanceData`
- `TimeManagementData`
- 73 survey responses from Computer Science students
- Survey via Google Forms (November 2024)
- Compliant with Data Privacy Act of 2012 (RA 10173)
- Email addresses collected for verification only, not linked to analysis
- All identifiable information anonymized in dashboar
  - `attendance`: Frequency level (Always, Often, Sometimes, Rarely, Never)
  - `regular`: Regular students data
    - `count`: Number of students
    - `avgGWA`: Average GWA (null if no students)
    - `percentage`: Percentage within regular group
  - `irregular`: Irregular students data (same structure)

---

### 6. `timeManagement.json`

**Purpose**: Self-reported time management skills vs academic performance

**Structure**:

- `categories`: Array of skill levels
  - `level`: Skill level (Excellent, Good, Fair, Poor)
  - `regular`: Regular students data
    - `count`: Number of students
    - `avgGWA`: Average GWA
    - `percentage`: Percentage within group
  - `irregular`: Irregular students data (same structure)

---

### 7. `performanceFactors.json`

**Purpose**: Multi-select factors affecting academic performance

**Structure**:

- `factors`: Array of contributing factors
  - `factor`: Description of challenge/barrier
  - `regular`: Count from regular students
  - `irregular`: Count from irregular students
  - `total`: Combined count
  - `regularPercentage`: Percentage of regular students reporting this
  - `irregularPercentage`: Percentage of irregular students reporting this

**Top Factors**: Heavy class load, Difficulty understanding lessons, Lack of study time, Motivation level, Personal/family concerns

---

### 8. `statisticalTests.json`

**Purpose**: Inferential statistics and hypothesis testing results

**Structure**:

- `gwaComparison`: Independent samples t-test results
  - `tStatistic`: t-value (-5.872)
  - `df`: Degrees of freedom (71)
  - `pValue`: Statistical significance (<0.0001)
  - `significant`: Boolean flag
  - `cohensD`: Effect size (1.59 - large)
  - `interpretation`: Plain language explanation
  - `confidenceInterval95`: Lower and upper bounds
  - `regularGroup`: Descriptive stats (n, mean, SD)
  - `irregularGroup`: Descriptive stats

- `correlations`: Pearson correlation analyses
  - `studyHoursVsGWA`: 
    - `r`: Correlation coefficient (-0.494)
    - `pValue`: Significance level (<0.001)
    - `interpretation`: Contextual explanation
    - `n`: Sample size

- `note`: Explanation of Philippine GWA system

---

### 9. `qualitativeThemes.json`

**Purpose**: Thematic analysis of open-ended student responses

**Structure**:

- `themes`: Array of identified themes
  - `theme`: Theme name
  - `description`: Detailed explanation
  - `frequency`: Number of relevant responses
  - `enrollmentStatus`: Which group(s) this applies to
  - `representativeQuotes`: Array of 2-3 example quotes

- `beliefDistribution`: Student beliefs about enrollment impact
  - `yes`: Counts by enrollment status
  - `maybe`: Counts by enrollment status
  - `no`: Counts by enrollment status

**Key Themes**: Structured Learning Environment, Catch-up Challenges, Time Management Concerns

---

## 🔧 Usage in Components

### Importing Data

```typescript
import { 
  getRespondentData, 
  getGWADistribution, 
  getStudyHabitsData 
} from '@/data';

// In your component
const respondents = getRespondentData();
const gwaData = getGWADistribution();
const studyData = getStudyHabitsData();
```

### Type Safety

All data structures have corresponding TypeScript interfaces in `@/types`:

- `RespondentData`
- `GWADistributionData`
- `StudyHabitsData`

---

## 📈 Data Integrity

**Validation Checks**:

- ✅ Total respondents = Sum of enrollment distribution (73)
- ✅ Enrollment percentages sum to ~100% (75.34 + 24.66 = 100.00)
- ✅ GWA category counts match enrollment distribution
- ✅ Study hours counts match enrollment distribution
- ✅ All percentages calculated consistently (2 decimal precision)

**Data Source**:

- Anonymize & Data Dictionary

### Key Terms

1. **GWA (General Weighted Average)**: Philippine grading system where 1.0 = highest, 5.0 = failing
2. **Regular Student**: Following standard curriculum sequence on schedule
3. **Irregular Student**: Deviating from standard sequence (failed/dropped courses, LOA, etc.)
4. **Sample Size**: n=73 (55 Regular, 18 Irregular)
5. **Academic Year**: 2024-2025 (single semester snapshot)
6. **Study Hours**: Reported as daily study time outside of class

### Statistical Notes

- **Significance Level**: α = 0.05 (95% confidence)
- **Effect Size Interpretation**: Cohen's d > 0.8 = large effect
- **Correlation**: r = -0.494 (moderate negative, statistically significant)
- **Missing Data**: Year level not explicitly collected; estimated distribution used

### Limitations

- Self-reported data may contain response bias
- Cross-sectional design limits causal inference
- Single institution limits 7, 2025

---

## 🔬 Data Processing

All processed data files were generated from `realRespondents.json` using:

```bash
npx tsx scripts/extract-comprehensive-data.ts
```

This script:
- Normalizes enrollment status ("Reular" → "Regular")
- Converts GWA ranges to numeric midpoints
- Calculates statistical tests (t-tests, correlations)
- Performs thematic coding of qualitative responses
- Generates distribution summaries

See [scripts/extract-comprehensive-data.ts](../../scripts/extract-comprehensive-data.ts) for full implementation.izability
- Small irregular student sample (n=18) limits subgroup analysis
- Year level data estimated, not measured
Consistent color coding across all visualizations (per research paper specification):

- **Regular Students**: `#3B82F6` (Blue-500) - Blue per paper
- **Irregular Students**: `#EF4444` (Red-500) - Red per paper specification
- **Neutral/Gray**: `#6B7280` (Gray-500)

These colors meet WCAG 2.1 AA contrast requirements and are colorblind-friendly when used with patterns or labels.

---

## 📝 Notes

1. **GWA System**: Philippines academic grading (1.0 = highest, 5.0 = failing)
2. **Sample Size**: n=73 is adequate for exploratory analysis but may limit generalizability
3. **Academic Year**: Data represents single academic year snapshot (2024-2025)
4. **Study Hours**: Reported as daily study time (not weekly)
5. **Limitations**: Self-reported study hours may contain recall bias
6. **Statistics**: Mean, median, and standard deviation values are calculated from distribution data
7. **Correlation**: r = -0.68 represents strong negative correlation between study hours and GWA

---

## 🔄 Data Updates

To update the data:

1. Modify the respective JSON file
2. Ensure TypeScript types still match
3. Run `npm run lint` to check for errors
4. Verify calculations (percentages, totals)
5. Test affected chart components

**Last Updated**: December 15, 2025
