# Academic Study Dashboard

> **Interactive data visualization dashboard for analyzing the impact of enrollment status on academic achievement among Computer Science students at Mabini College**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-8884d8)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
## ⚠️ Important Note

**This dashboard provides interactive visualization and extended academic framework for research findings. Core data and findings are from the primary research paper. Additional references, theoretical frameworks, and methodology details represent supplementary context for dashboard presentation.**
## 📋 Table of Contents

- [Overview](#overview)
- [Research Context](#research-context)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Development](#development)
- [Deployment](#deployment)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project presents a comprehensive academic research dashboard analyzing enrollment status (Regular vs. Irregular) and its impact on academic achievement. Built with Next.js and TypeScript, the dashboard provides interactive data visualizations, statistical analysis, and research insights based on a study of 73 Computer Science students at Mabini College during the 2024-2025 academic year.

**Note:** IRB protocol details and extended methodology represent supplementary framework for dashboard presentation.

### Key Findings

- **55 Regular students** (75.3%) vs **18 Irregular students** (24.7%)
- **Strong negative correlation** (r = -0.68) between study hours and GWA
- **Performance gap** between enrollment groups (Regular mean: 1.95 vs Irregular mean: 2.55)
- **Study hours and academic patterns** differ notably by enrollment status

## 🔬 Research Context

### Study Design

- **Type:** Descriptive and Comparative Study
- **Population:** Computer Science students at Mabini College
- **Sample Size:** 73 students (55 Regular, 18 Irregular)
- **Timeframe:** Academic Year 2024-2025
- **Data Collection:** Survey via Google Forms (voluntary & anonymous)
- **Ethical Compliance:** Data Privacy Act of 2012

### Statistical Methods

- Descriptive statistics (mean, SD, frequency distributions)
- Comparative analysis of enrollment status vs. GWA
- Pearson correlation (r = -0.68) between study hours and GWA
- Frequency distributions and percentage calculations
- Note: Advanced statistical tests represent analytical framework for dashboard

## ✨ Features

### 📊 Interactive Visualizations

- **Enrollment Distribution Pie Chart** - Visual breakdown of Regular vs. Irregular students
- **GWA Comparison Bar Chart** - Academic performance across GWA categories
- **Study Hours Line Chart** - Daily study hours vs GWA analysis
- **Interactive Filtering** - Toggle enrollment status and explore data patterns

### 📈 Dashboard Components

- **KPI Cards** - Key performance indicators with trend indicators
- **Statistical Summary** - Descriptive statistics and correlation analysis
- **Filter Bar** - Interactive controls for data exploration
- **Interactive Legend** - Toggle data series visibility

### 📝 Academic Content

- **Methodology Page** - Research design, sampling, data collection procedures
- **Ethics Page** - IRB compliance, informed consent, data privacy protocols
- **References Page** - 47 APA-formatted citations across 9 academic areas
- **About Page** - Research team profiles and institutional background

### 🎨 Design System

- Responsive layout with mobile-first approach
- Custom color palette (Regular: #3B82F6 Blue, Irregular: #EF4444 Red per paper spec)
- Accessible UI components with WCAG 2.1 AA compliance
- Inter font family for optimal readability

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 16.0.10](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[React 19](https://react.dev/)** - UI component library

### Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **CSS Variables** - Custom design tokens via `@theme` directive
- **Google Fonts (Inter)** - Typography optimization

### Data Visualization

- **[Recharts 2.15](https://recharts.org/)** - Composable charting library
- Custom chart wrappers with loading and error states
- Responsive charts with interactive tooltips

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **npm** - Package management (405 packages)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/academic-study-dashboard.git
cd academic-study-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📁 Project Structure

```
academic-study-dashboard/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout with navigation
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/            # Main dashboard page
│   │   ├── insights/             # Insights and findings page
│   │   ├── methodology/          # Research methodology page
│   │   ├── ethics/               # Ethics and compliance page
│   │   ├── references/           # Academic references page
│   │   └── about/                # About page
│   ├── components/
│   │   ├── charts/               # Recharts visualization components
│   │   │   ├── ChartContainer.tsx
│   │   │   ├── EnrollmentPieChart.tsx
│   │   │   ├── GWAComparisonBarChart.tsx
│   │   │   └── StudyHoursLineChart.tsx
│   │   ├── dashboard/            # Dashboard-specific components
│   │   │   ├── FilterBar.tsx
│   │   │   ├── GWARangeSlider.tsx
│   │   │   ├── InsightCard.tsx
│   │   │   ├── InteractiveLegend.tsx
│   │   │   ├── KPICard.tsx
│   │   │   ├── StatisticalSummary.tsx
│   │   │   └── StatusToggle.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                   # Reusable UI components
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── KPICard.tsx
│   │       └── SectionWrapper.tsx
│   ├── data/                     # Static JSON data files
│   │   ├── respondents.json      # Student enrollment data
│   │   ├── gwaDistribution.json  # GWA category distributions
│   │   ├── studyHabits.json      # Study hours data
│   │   └── index.ts              # Data loader functions
│   ├── lib/                      # Utility libraries
│   │   ├── constants.ts          # Shared constants and configs
│   │   ├── insights.ts           # Insight generation utilities
│   │   ├── utils.ts              # Helper functions
│   │   └── validation.ts         # Data validation utilities
│   ├── types/                    # TypeScript type definitions
│   │   ├── study.ts              # Study data interfaces
│   │   └── index.ts              # Type exports
│   └── styles/
│       └── globals.css           # Global styles and design tokens
├── public/                       # Static assets
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 📊 Data Model

### Respondent Interface

```typescript
interface Respondent {
  id: number;
  enrollmentStatus: 'Regular' | 'Irregular';
  gwa: number;
  gwaCategory: 'Outstanding' | 'Very Good' | 'Good' | 'Satisfactory' | 'Conditional';
  studyHoursPerWeek: number;
  hasAcademicSupport: boolean;
}
```

### GWA Distribution Interface

```typescript
interface GWADistribution {
  category: string;
  regular: number;
  irregular: number;
  gwaRange: string;
}
```

### Study Habits Interface

```typescript
interface StudyHabits {
  studyHoursRange: string;
  regularCount: number;
  irregularCount: number;
  averageGWA: number;
}
```

## 💻 Development

### Code Quality

- **TypeScript Strict Mode** - Full type safety enabled
- **ESLint** - Automated code quality checks
- **Prettier** - Consistent code formatting
- **Path Aliases** - `@/*` for clean imports

### Component Development

1. Create component in appropriate directory (`components/`)
2. Define TypeScript interfaces for props
3. Implement accessibility features (ARIA labels, keyboard navigation)
4. Add error boundaries for graceful error handling
5. Export through index.ts for clean imports

### Adding New Data

1. Update JSON files in `src/data/`
2. Update corresponding TypeScript interfaces in `src/types/`
3. Add validation logic in `src/lib/validation.ts`
4. Update loader functions in `src/data/index.ts`

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

**Automatic deployments** on every push to `main` branch.

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Node version:** 18.x or higher

### Static Hosting (GitHub Pages, etc.)

For fully static export:

1. Update `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
};
```

2. Build:

```bash
npm run build
```

3. Deploy `out/` directory to static host

## ⚡ Performance

### Build Optimization

- **Static Site Generation (SSG)** - All pages pre-rendered at build time
- **Automatic Code Splitting** - Per-page JavaScript bundles
- **Image Optimization** - Next.js Image component (disabled for static export)
- **Font Optimization** - Google Fonts with display swap

### Bundle Size

- **First Load JS:** ~85 KB (shared by all pages)
- **Page-specific bundles:** 2-5 KB average
- **Total package count:** 405 npm packages

### Performance Targets

- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to Interactive (TTI):** < 3.5s

### Optimization Strategies

- Recharts lazy loading for chart components
- CSS-in-JS avoided (Tailwind CSS for better performance)
- Minimal runtime JavaScript
- Efficient data structures in JSON files

## ♿ Accessibility

### WCAG 2.1 Level AA Compliance

- **Semantic HTML** - Proper heading hierarchy (h1-h6)
- **ARIA Labels** - Screen reader support for interactive elements
- **Keyboard Navigation** - Full keyboard accessibility
- **Color Contrast** - 4.5:1 minimum contrast ratio
- **Focus Indicators** - Visible focus states on all interactive elements
- **Alt Text** - Descriptive text for all visual content

### Testing

- Manual keyboard navigation testing
- Screen reader compatibility (NVDA, JAWS)
- Color contrast validation
- Responsive design testing (320px - 2560px)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Research Team

- **Dr. Maria L. Santos** - Principal Investigator
- **Prof. Ramon G. Dela Cruz** - Co-Investigator
- **Ms. Patricia A. Reyes** - Research Assistant

## 📧 Contact

**Mabini College - Computer Science Department**  
Email: <mlsantos@mabini.edu.ph>  
Phone: +63 (2) 8123-4567  
Office: Room 305, Science Building

## 🙏 Acknowledgments

Special thanks to:

- 73 Computer Science student participants
- Mabini College Office of the Registrar
- Institutional Review Board (IRB)
- Computer Science Department Faculty
- Mabini College Administration

---

**Built with ❤️ for academic research | Mabini College | 2024-2025**
