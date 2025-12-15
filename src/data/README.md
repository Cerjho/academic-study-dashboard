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
- Regular students: Mean GWA = 1.85 (Very Good)
- Irregular students: Mean GWA = 2.15 (Good)
- Difference: 0.30 GWA points in favor of regular students

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
  - **-0.78**: Strong negative correlation
  - Interpretation: More study hours = Lower GWA (better performance)

**Pattern Observed**:
| Hours/Week | Regular Avg GWA | Irregular Avg GWA |
|-----------|-----------------|-------------------|
| 0-5       | 2.45 (Good)     | 2.70 (Fair)       |
| 6-10      | 2.05 (Good)     | 2.30 (Good)       |
| 11-15     | 1.75 (Very Good)| 1.95 (Very Good)  |
| 16+       | 1.55 (Excellent)| 1.70 (Very Good)  |

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
- Anonymized student records from Mabini College
- IRB-approved research study
- Data collection period: November 2024
- No personally identifiable information (PII) included

---

## 🎨 Color Palette

Consistent color coding across all visualizations:
- **Regular Students**: `#3B82F6` (Blue-500)
- **Irregular Students**: `#F97316` (Orange-500)
- **Neutral/Gray**: `#6B7280` (Gray-500)

These colors meet WCAG 2.1 AA contrast requirements and are colorblind-friendly when used with patterns or labels.

---

## 📝 Notes

1. **GWA System**: Philippines academic grading (1.0 = highest, 5.0 = failing)
2. **Sample Size**: n=73 is adequate for exploratory analysis but may limit generalizability
3. **Academic Year**: Data represents single academic year snapshot
4. **Limitations**: Self-reported study hours may contain recall bias

---

## 🔄 Data Updates

To update the data:
1. Modify the respective JSON file
2. Ensure TypeScript types still match
3. Run `npm run lint` to check for errors
4. Verify calculations (percentages, totals)
5. Test affected chart components

**Last Updated**: December 15, 2025
