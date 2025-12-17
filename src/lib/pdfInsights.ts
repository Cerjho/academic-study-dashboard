/**
 * PDF Insights Data
 * 
 * Key findings, methodology, and research insights extracted from the study PDF
 */

export const pdfInsights = {
  // Abstract/Overview
  overview: {
    title: "Study Overview",
    content: "This study examines the impact of enrollment status (Regular vs. Irregular) on academic achievement among Computer Science students at Mabini College. The research analyzes 72 students' General Weighted Average (GWA), study habits, attendance patterns, and time management skills to identify significant differences in academic performance."
  },

  // Research Questions
  researchQuestions: [
    "Is there a significant difference in academic performance (GWA) between Regular and Irregular students?",
    "How do study habits differ between the two enrollment status groups?",
    "What factors most significantly affect academic performance in each group?",
    "Does enrollment status affect students' time management and attendance patterns?"
  ],

  // Methodology
  methodology: {
    title: "Research Methodology",
    content: "This study employed a quantitative comparative research design using survey questionnaires distributed to Computer Science students at Mabini College. Data collection included demographic information, enrollment status, GWA, study hours, class attendance, and time management practices. Statistical analysis included descriptive statistics, independent t-tests, and correlation analysis to compare Regular and Irregular student groups.",
    sampleSize: 72,
    dataCollection: "Google Forms survey questionnaire",
    analysis: ["Descriptive Statistics", "Independent T-Test", "Pearson Correlation", "Cohen's d Effect Size"]
  },

  // Key Findings
  keyFindings: [
    {
      category: "Academic Performance",
      finding: "Regular students demonstrate higher average GWA compared to Irregular students",
      significance: "Statistical significance found (p < 0.05)",
      implication: "Enrollment status is a significant predictor of academic achievement",
      tooltip: "Regular students maintain better academic performance, likely due to consistent course load and scheduling"
    },
    {
      category: "Study Habits",
      finding: "Positive correlation exists between study hours and academic performance",
      significance: "Moderate to strong correlation observed",
      implication: "Increased study time is associated with improved GWA across both groups",
      tooltip: "Students who dedicate more hours to studying tend to achieve higher grades regardless of enrollment status"
    },
    {
      category: "Attendance Patterns",
      finding: "Regular students show higher class attendance rates than Irregular students",
      significance: "Significant difference observed",
      implication: "Consistent attendance contributes to better academic outcomes",
      tooltip: "Regular attendance allows students to fully engage with course material and participate in class activities"
    },
    {
      category: "Time Management",
      finding: "Regular students report better time management skills",
      significance: "Statistically significant difference",
      implication: "Time management is a critical skill affecting academic success",
      tooltip: "Effective time management helps students balance coursework, study time, and other responsibilities"
    },
    {
      category: "Performance Factors",
      finding: "Key factors affecting performance include study habits, personal motivation, and workload balance",
      significance: "Identified through factor analysis",
      implication: "Multiple interconnected factors influence academic achievement",
      tooltip: "Academic success depends on both individual effort and environmental factors"
    }
  ],

  // Statistical Insights
  statisticalInsights: {
    gwaComparison: {
      title: "GWA Statistical Analysis",
      description: "Independent t-test comparing Regular and Irregular students' academic performance",
      interpretation: "The t-test results indicate a statistically significant difference in GWA between enrollment groups, suggesting that enrollment status plays a meaningful role in academic achievement.",
      tooltip: "Lower p-values (< 0.05) indicate stronger evidence of genuine differences between groups"
    },
    effectSize: {
      title: "Cohen's d Effect Size",
      description: "Measures the magnitude of difference between groups",
      interpretation: "Effect size helps determine if the statistical difference is also practically meaningful in real-world educational contexts.",
      ranges: {
        small: "d = 0.2 - 0.5: Small practical difference",
        medium: "d = 0.5 - 0.8: Moderate practical difference",
        large: "d ≥ 0.8: Large practical difference"
      },
      tooltip: "Effect size shows not just if groups differ, but by how much—critical for understanding practical significance"
    },
    correlation: {
      title: "Correlation Analysis",
      description: "Examines relationships between study habits and academic performance",
      interpretation: "Correlation coefficients reveal the strength and direction of relationships between variables like study hours and GWA.",
      tooltip: "Positive correlations indicate variables increase together; negative correlations indicate inverse relationships"
    }
  },

  // Recommendations
  recommendations: [
    {
      target: "Institution",
      recommendation: "Provide additional academic support services for Irregular students",
      rationale: "Performance gap indicates need for targeted interventions",
      priority: "high"
    },
    {
      target: "Students",
      recommendation: "Develop structured study schedules and time management practices",
      rationale: "Strong correlation between study habits and academic success",
      priority: "high"
    },
    {
      target: "Faculty",
      recommendation: "Consider flexible attendance policies while maintaining academic rigor",
      rationale: "Irregular students face unique scheduling challenges",
      priority: "medium"
    },
    {
      target: "Academic Advisors",
      recommendation: "Monitor at-risk students early and provide proactive guidance",
      rationale: "Early intervention can prevent academic difficulties",
      priority: "high"
    }
  ],

  // Contextual Help Topics
  helpTopics: {
    enrollmentStatus: {
      title: "Understanding Enrollment Status",
      content: "Regular students follow the standard curriculum sequence with full course loads each term. Irregular students take fewer courses per term, often due to work, financial constraints, or academic difficulties. This classification significantly impacts academic progression and performance.",
      icon: "info"
    },
    gwaScale: {
      title: "GWA Grading Scale",
      content: "The General Weighted Average (GWA) uses a 1.0-5.0 scale where lower numbers indicate better performance. 1.00-1.49 = Excellent, 1.50-1.99 = Very Good, 2.00-2.49 = Good, 2.50-2.99 = Satisfactory, 3.00+ = Passing. GWA is calculated by averaging all course grades weighted by credit units.",
      icon: "scale"
    },
    tTest: {
      title: "Independent T-Test",
      content: "A statistical test that compares the means of two independent groups to determine if they are significantly different. The test produces a t-statistic and p-value. A p-value less than 0.05 typically indicates a statistically significant difference.",
      icon: "chart"
    },
    cohensD: {
      title: "Cohen's d Effect Size",
      content: "Measures the standardized difference between two group means. Unlike p-values which indicate if a difference exists, Cohen's d shows how large that difference is. Values of 0.2, 0.5, and 0.8 represent small, medium, and large effects respectively.",
      icon: "ruler"
    },
    correlation: {
      title: "Correlation Coefficient",
      content: "Measures the strength and direction of a relationship between two variables, ranging from -1 to +1. Positive values indicate variables increase together, negative values indicate inverse relationships, and values near 0 indicate weak or no relationship.",
      icon: "link"
    }
  }
};

export type InsightCategory = 'overview' | 'methodology' | 'keyFindings' | 'statisticalInsights' | 'recommendations' | 'helpTopics';

export function getInsightByCategory(category: InsightCategory) {
  return pdfInsights[category];
}

export function getAllInsights() {
  return pdfInsights;
}
