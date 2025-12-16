# Quick Start Guide

## Running the Interactive Dashboard

### Prerequisites
- Node.js (v20 or higher)
- npm, yarn, or pnpm package manager

### Installation & Running

1. **Install dependencies** (if not already done):
```powershell
npm install
```

2. **Run the development server**:
```powershell
npm run dev
```

3. **Open the dashboard**:
Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser

## Exploring Interactive Features

### 1. Using Filters

#### Enrollment Status Filter
- Located at the top of the dashboard
- Click **"All Students"**, **"Regular"**, or **"Irregular"** to filter data
- Charts and statistics update instantly

#### GWA Performance Filter
- Located in the Filter Bar section
- Check/uncheck performance levels:
  - ✅ Excellent (1.00-1.50)
  - ✅ Very Good (1.51-2.00)
  - ✅ Good (2.01-2.50)
  - ✅ Fair (2.51-3.00)
- Use **"Select All"** or **"Clear"** for quick actions

#### Reset Filters
- Click the **"Reset"** button in the Filter Bar when filters are active
- Returns all filters to default state

### 2. Interactive Tooltips

#### Hover Actions
- **Pie Chart**: Hover over segments to see detailed breakdown
- **Bar Chart**: Hover over bars to see comparative statistics
- **Line Chart**: Hover over data points to see GWA values and gaps

#### Tooltip Content
- Student counts with formatted numbers
- Percentage distributions
- Performance gaps and comparisons
- Helpful hints about drill-down capabilities

### 3. Drill-Down Exploration

#### Opening Drill-Down Modals
**Enrollment Pie Chart**:
- Click on any pie segment
- OR click on the summary cards below the chart

**GWA Comparison Bar Chart**:
- Click on any bar (regular or irregular)
- OR click on the category summary boxes below the chart

#### Modal Navigation
- **Scroll** to view all sections
- **Click outside** the modal to close
- **Click the Close button** (top-right X or bottom button)
- **Press ESC key** to close (if keyboard accessible)

#### Modal Content Sections
1. **Overview**: Key metrics and totals
2. **Breakdown**: Detailed statistics by group
3. **Distribution Analysis**: Visual progress bars
4. **Key Insights**: Intelligent analysis and interpretation

### 4. Smooth Animations

#### What to Notice
- **Page Load**: Elements fade in and slide up
- **Filter Changes**: Charts transition smoothly (500ms)
- **Hover Effects**: Cards lift, buttons glow
- **Modal Opening**: Backdrop fades in, modal slides up
- **Data Updates**: Numbers count up, bars animate

#### Animation Types
- **Fade-in**: Content appearing
- **Slide-up**: Sections entering from below
- **Scale**: Charts and modals zooming in
- **Pulse**: Active filter badge
- **Hover-lift**: Interactive cards elevating

## Testing Scenarios

### Scenario 1: Compare Regular vs Irregular Performance
1. Start with "All Students" selected
2. Note the performance distribution
3. Click **"Regular"** filter
4. Observe the GWA distribution shift
5. Click **"Irregular"** filter
6. Compare the differences

### Scenario 2: Focus on High Performers
1. Click **"Clear"** in the GWA Range Slider
2. Check only **"Excellent"**
3. Observe which enrollment status dominates
4. Click a bar in the GWA chart for detailed analysis

### Scenario 3: Explore Enrollment Distribution
1. Click on the **"Regular"** segment of the pie chart
2. Read the enrollment characteristics
3. Close modal
4. Click on the **"Irregular"** segment
5. Compare the profiles

### Scenario 4: Analyze Study Habits Impact
1. Hover over different points on the Study Hours line chart
2. Note the correlation between hours and GWA
3. Change enrollment status filter to see how it affects the trend
4. Observe the performance gaps at different study hour ranges

## Performance Notes

- All filters update data instantly (< 100ms)
- Animations are GPU-accelerated for smoothness
- Charts re-render efficiently using React optimization
- No external API calls (all data is local)

## Keyboard Shortcuts

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and filters
- **Escape**: Close open modals
- **Arrow Keys**: Navigate within filter groups

## Browser Compatibility

Tested and optimized for:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Charts not updating after filter change?
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Restart development server

### Modal not closing?
- Click the X button in top-right corner
- Click outside the modal area
- Press the Close button at the bottom

### Animations stuttering?
- Check if hardware acceleration is enabled in browser
- Close other tabs to free up resources
- Reduce browser zoom level

## Tips for Best Experience

1. **Use a modern browser** for best performance
2. **Full screen mode** for comprehensive view
3. **Try different filter combinations** to discover insights
4. **Explore tooltips first** before opening drill-downs
5. **Reset filters** periodically to see the complete picture

## Next Steps

After exploring the interactive features:
1. Check [INTERACTIVE_FEATURES.md](./INTERACTIVE_FEATURES.md) for technical details
2. Review the main [README.md](../README.md) for project overview
3. Explore the source code to understand implementation
4. Consider customizing visualizations for your needs

---

**Need Help?** Check the project documentation or examine the source code for implementation details.
