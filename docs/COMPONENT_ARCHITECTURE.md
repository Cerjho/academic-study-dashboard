# Component Hierarchy & Architecture

## Overview

This document outlines the component structure and relationships in the interactive dashboard.

## Component Tree

```
app/
└── dashboard/
    └── page.tsx (Server Component)
        └── DashboardContent.tsx (Client Component) ⭐
            ├── Header Section
            │   ├── Title
            │   ├── Institution Info
            │   └── Badge Components
            │
            ├── FilterBar ⭐
            │   ├── StatusToggle ⭐
            │   └── GWARangeSlider ⭐
            │
            ├── KPI Cards Section
            │   ├── KPICard (Total Respondents)
            │   ├── KPICard (Regular Students)
            │   ├── KPICard (Irregular Students)
            │   └── KPICard (Study Correlation)
            │
            ├── Enrollment Distribution Section
            │   └── ChartContainer
            │       └── EnrollmentPieChart ⭐
            │           ├── Recharts PieChart
            │           ├── Custom Tooltips
            │           └── DrillDownModal ⭐
            │
            ├── GWA Comparison Section
            │   ├── Stats Cards (Regular/Irregular)
            │   └── ChartContainer
            │       └── GWAComparisonBarChart ⭐
            │           ├── Recharts BarChart
            │           ├── Custom Tooltips
            │           └── DrillDownModal ⭐
            │
            ├── Study Habits Section
            │   └── ChartContainer
            │       └── StudyHoursLineChart ⭐
            │           ├── Recharts LineChart
            │           └── Custom Tooltips
            │
            ├── Key Findings Section
            │   └── InsightCard (x3)
            │
            ├── Implications Section
            │   └── InsightCard (x2)
            │
            └── Recommendations Section
                └── InsightCard (x4)
```

⭐ = Interactive Component with State

## Component Categories

### 1. Server Components (Data Loading)

**File**: `src/app/dashboard/page.tsx`

**Responsibilities**:

- Fetch data from JSON files
- Server-side rendering
- Pass data to client component

**Data Sources**:

- `getRespondentData()` → Enrollment distribution
- `getGWADistribution()` → Academic performance data
- `getStudyHabitsData()` → Study habits correlation

### 2. Client Components (Interactive)

**Main Client Component**: `src/app/dashboard/DashboardContent.tsx`

**State Management**:

```typescript
const [statusFilter, setStatusFilter] = useState<StatusOption>('all');
const [gwaRanges, setGwaRanges] = useState<GWARange[]>([...]);
```

**Computed Data** (useMemo):

- Filtered categories based on GWA ranges
- Adjusted counts based on status filter
- Regular/Irregular totals

### 3. Filter Components

#### FilterBar

**File**: `src/components/dashboard/FilterBar.tsx`

- Container for filter controls
- Reset functionality
- Consistent styling

#### StatusToggle

**File**: `src/components/dashboard/StatusToggle.tsx`

- Three-option toggle (All/Regular/Irregular)
- Color-coded buttons
- State management with onChange callback

#### GWARangeSlider

**File**: `src/components/dashboard/GWARangeSlider.tsx`

- Multi-select checkboxes
- "Select All" / "Clear" actions
- Performance level options

### 4. Chart Components

#### EnrollmentPieChart

**File**: `src/components/charts/EnrollmentPieChart.tsx`

**Features**:

- Interactive pie segments (hover + click)
- Active segment highlighting
- Custom tooltips
- Drill-down modal integration

**State**:

```typescript
const [activeIndex, setActiveIndex] = useState<number | undefined>();
const [selectedSegment, setSelectedSegment] = useState<EnrollmentData | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

#### GWAComparisonBarChart

**File**: `src/components/charts/GWAComparisonBarChart.tsx`

**Features**:

- Grouped bar chart (Regular vs Irregular)
- Click-to-drill-down bars
- Enhanced tooltips with ratio calculations
- Interactive category boxes

**State**:

```typescript
const [selectedCategory, setSelectedCategory] = useState<GWACategoryData | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

#### StudyHoursLineChart

**File**: `src/components/charts/StudyHoursLineChart.tsx`

**Features**:

- Dual-line comparison
- Status filter integration
- Reference lines for performance benchmarks
- Correlation coefficient display

**Props**:

- `statusFilter`: Controls which lines to show
- `data`: Study hours data points
- `correlationCoefficient`: Statistical measure

### 5. Modal Components

#### DrillDownModal

**File**: `src/components/ui/DrillDownModal.tsx`

**Features**:

- Backdrop with click-to-close
- Sticky header and footer
- Scrollable content area
- Smooth animations (fade-in, slide-up)

**Props**:

```typescript
interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
```

#### DrillDownSection

**File**: Same as DrillDownModal

**Purpose**: Organize modal content into logical sections

#### DrillDownStat

**File**: Same as DrillDownModal

**Purpose**: Display individual statistics with labels and color coding

### 6. UI Components

#### Card

**File**: `src/components/ui/Card.tsx`

- Base card container
- Hover effects
- Consistent padding and styling

#### Badge

**File**: `src/components/ui/Badge.tsx`

- Status indicators
- Color variants (regular/irregular/default)
- Compact size

#### Button

**File**: `src/components/ui/Button.tsx`

- Primary actions
- Variants (outline, solid)
- Size options

#### SectionWrapper

**File**: `src/components/ui/SectionWrapper.tsx`

- Consistent section styling
- Title and description
- Optional ID for linking

### 7. Dashboard Components

#### KPICard

**File**: `src/components/dashboard/KPICard.tsx`

- Key metric display
- Color-coded variants
- Subtitle support

#### InsightCard

**File**: `src/components/dashboard/InsightCard.tsx`

- Finding/Implication/Recommendation display
- Priority indicators
- Icon support

#### InsightPanel

**File**: Same as InsightCard

- Grid container for insight cards
- Responsive layout

## Data Flow Patterns

### Pattern 1: Filter-Driven Updates

```
User clicks filter
    ↓
State updates (setStatusFilter/setGwaRanges)
    ↓
useMemo recomputes filtered data
    ↓
Charts receive new data via props
    ↓
Charts re-render with transitions
```

### Pattern 2: Drill-Down Interaction

```
User clicks chart element
    ↓
onClick handler fires
    ↓
setSelectedData + setIsModalOpen(true)
    ↓
Modal renders with data
    ↓
User interacts with modal
    ↓
User closes modal (setIsModalOpen(false))
```

### Pattern 3: Tooltip Display

```
User hovers over chart element
    ↓
Recharts triggers Tooltip component
    ↓
CustomTooltip receives payload data
    ↓
Formats and displays information
    ↓
User moves away, tooltip fades out
```

## State Management Strategy

### Local State

- **Filter states**: Managed in DashboardContent
- **Modal states**: Managed in individual chart components
- **Active hover states**: Managed in chart components

### Derived State

- **Filtered data**: Computed via useMemo in DashboardContent
- **Statistics**: Calculated from filtered data
- **Percentages**: Computed on-demand in components

### Prop Drilling

- Minimal prop drilling (max 2 levels)
- Data passed from server → client → charts
- Callbacks passed for filter changes

## Performance Optimizations

### 1. Memoization

```typescript
const filteredData = useMemo(() => {
  // Expensive filtering logic
}, [gwaData, respondentData, statusFilter, gwaRanges]);
```

### 2. Conditional Rendering

```typescript
{showRegular && <Line dataKey="regularGWA" ... />}
{showIrregular && <Line dataKey="irregularGWA" ... />}
```

### 3. Lazy Modal Rendering

```typescript
{isModalOpen && <DrillDownModal ... />}
```

### 4. CSS Animations

- GPU-accelerated transforms
- No JavaScript-based animations
- Smooth 60fps transitions

## Styling Architecture

### Tailwind CSS Classes

- Utility-first approach
- Responsive modifiers (sm:, md:, lg:)
- Custom color palette (regular, irregular)

### Custom CSS

- Animation keyframes in globals.css
- Reusable animation classes
- Hover effect utilities

### CSS Variables

- Theme colors
- Spacing scale
- Transition timings

## Type Safety

### TypeScript Interfaces

```typescript
// Data types
interface RespondentData { ... }
interface GWADistribution { ... }
interface StudyHabitsData { ... }

// Component props
interface DashboardContentProps { ... }
interface DrillDownModalProps { ... }

// Filter types
type StatusOption = 'all' | 'regular' | 'irregular';
type GWARange = 'excellent' | 'veryGood' | 'good' | 'fair';
```

## Testing Considerations

### Unit Testing

- Filter logic (pure functions)
- Data calculations (useMemo)
- Percentage computations

### Component Testing

- Filter interactions
- Modal open/close
- Tooltip rendering

### Integration Testing

- Complete filter flow
- Data updates across charts
- Drill-down navigation

## Future Architecture Improvements

### Potential Enhancements

1. **Context API**: Share filter state globally
2. **Custom Hooks**: Extract filter logic to `useFilters()`
3. **Virtual Scrolling**: For large datasets
4. **Code Splitting**: Lazy load chart components
5. **State Management Library**: Consider Zustand/Jotai for complex state

### Scalability

- Component library could be extracted
- Chart components reusable across projects
- Filter system adaptable to other datasets

---

This architecture provides a solid foundation for an interactive, performant, and maintainable dashboard application.
