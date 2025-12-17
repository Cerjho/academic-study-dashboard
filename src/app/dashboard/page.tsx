import { Metadata } from 'next';
import { DashboardContent } from './DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard - Academic Study',
  description:
    'Interactive dashboard analyzing enrollment status impact on academic achievement',
};

/**
 * Dashboard Page - Dynamic Data Visualization
 *
 * Main analysis page with real-time data processing and interactive filters.
 * All data is calculated on-demand from realRespondents.json.
 */

export default function DashboardPage() {
  return <DashboardContent />;
}
