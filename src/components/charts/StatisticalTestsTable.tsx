/**
 * Statistical Tests Table
 *
 * Displays statistical significance tests including t-tests,
 * p-values, effect sizes, and confidence intervals with visual indicators.
 */

'use client';

import { Card } from '@/components/ui';
import type { StatisticalTestsData } from '@/types';

interface StatisticalTestsTableProps {
  data: StatisticalTestsData;
}

export function StatisticalTestsTable({ data }: StatisticalTestsTableProps) {
  const { gwaComparison, correlations } = data;

  const getSignificanceLabel = (pValue: number) => {
    if (pValue < 0.001) return '***';
    if (pValue < 0.01) return '**';
    if (pValue < 0.05) return '*';
    return 'ns';
  };

  const getSignificanceColor = (significant: boolean) => {
    return significant ? 'text-green-600 font-semibold' : 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* GWA Comparison Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Independent Samples t-Test: GWA Comparison
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {gwaComparison.description}
        </p>

        {/* Group Statistics */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mean
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SD
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Regular
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.regularGroup.n}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.regularGroup.mean.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.regularGroup.sd.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  Irregular
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.irregularGroup.n}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.irregularGroup.mean.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.irregularGroup.sd.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Test Results */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  t-Statistic
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  df
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  p-Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Significance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cohen&apos;s d
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  95% CI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {gwaComparison.tStatistic.toFixed(3)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.df}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {gwaComparison.pValue < 0.001 ? '<0.001' : gwaComparison.pValue.toFixed(3)}
                </td>
                <td className={`px-4 py-3 text-sm ${getSignificanceColor(gwaComparison.significant)}`}>
                  {getSignificanceLabel(gwaComparison.pValue)}
                  {gwaComparison.significant && ' (p < 0.05)'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {gwaComparison.cohensD.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  [{gwaComparison.confidenceInterval95.lower.toFixed(2)}, {gwaComparison.confidenceInterval95.upper.toFixed(2)}]
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Interpretation:</strong> {gwaComparison.interpretation}
            {gwaComparison.significant && (
              <span className="ml-2">
                The difference between groups is statistically significant.
              </span>
            )}
          </p>
        </div>
      </Card>

      {/* Correlation Analysis Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Pearson Correlation: Study Hours vs GWA
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {correlations.studyHoursVsGWA.description}
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correlation (r)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  p-Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Significance
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {correlations.studyHoursVsGWA.r.toFixed(3)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {correlations.studyHoursVsGWA.pValue < 0.001 
                    ? '<0.001' 
                    : correlations.studyHoursVsGWA.pValue.toFixed(3)}
                </td>
                <td className={`px-4 py-3 text-sm ${getSignificanceColor(correlations.studyHoursVsGWA.significant)}`}>
                  {getSignificanceLabel(correlations.studyHoursVsGWA.pValue)}
                  {correlations.studyHoursVsGWA.significant && ' (p < 0.05)'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {correlations.studyHoursVsGWA.n}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Interpretation:</strong> {correlations.studyHoursVsGWA.interpretation}
          </p>
        </div>
      </Card>

      {/* Significance Legend */}
      <div className="text-xs text-gray-600 space-y-1">
        <p><strong>Significance levels:</strong></p>
        <p>*** p &lt; 0.001 (highly significant)</p>
        <p>** p &lt; 0.01 (very significant)</p>
        <p>* p &lt; 0.05 (significant)</p>
        <p>ns = not significant</p>
      </div>

      {data.note && (
        <div className="text-sm text-gray-600 italic p-4 bg-gray-50 rounded-lg">
          <strong>Note:</strong> {data.note}
        </div>
      )}
    </div>
  );
}
