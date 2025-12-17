/**
 * Significance Marker Component
 * 
 * Displays statistical significance indicators (asterisks)
 * for p-values in charts and visualizations.
 */

'use client';

interface SignificanceMarkerProps {
  pValue: number;
  showLabel?: boolean;
  position?: 'top' | 'bottom' | 'inline';
  className?: string;
}

export function SignificanceMarker({ 
  pValue, 
  showLabel = true,
  position = 'top',
  className = ''
}: SignificanceMarkerProps) {
  const getMarker = (p: number): string => {
    if (p < 0.001) return '***';
    if (p < 0.01) return '**';
    if (p < 0.05) return '*';
    return 'ns';
  };

  const getColor = (p: number): string => {
    if (p < 0.05) return 'text-green-600';
    return 'text-gray-400';
  };

  const marker = getMarker(pValue);
  const isSignificant = pValue < 0.05;

  const positionClasses = {
    top: 'absolute -top-6 left-1/2 transform -translate-x-1/2',
    bottom: 'absolute -bottom-6 left-1/2 transform -translate-x-1/2',
    inline: 'inline-block ml-1'
  };

  return (
    <span 
      className={`${positionClasses[position]} ${getColor(pValue)} font-bold text-xs ${className}`}
      title={isSignificant 
        ? `Statistically significant (p ${pValue < 0.001 ? '< 0.001' : `= ${pValue.toFixed(3)}`})`
        : `Not significant (p = ${pValue.toFixed(3)})`
      }
    >
      {marker}
      {showLabel && isSignificant && position === 'inline' && (
        <span className="text-[10px] ml-0.5">
          (p {pValue < 0.001 ? '< 0.001' : `= ${pValue.toFixed(3)}`})
        </span>
      )}
    </span>
  );
}

/**
 * Significance Legend Component
 * 
 * Displays the legend explaining significance markers
 */
export function SignificanceLegend({ className = '' }: { className?: string }) {
  return (
    <div className={`text-xs text-gray-600 space-y-1 ${className}`}>
      <p className="font-semibold">Significance levels:</p>
      <div className="space-y-0.5 ml-2">
        <p className="text-green-600">*** p &lt; 0.001 (highly significant)</p>
        <p className="text-green-600">** p &lt; 0.01 (very significant)</p>
        <p className="text-green-600">* p &lt; 0.05 (significant)</p>
        <p className="text-gray-400">ns = not significant</p>
      </div>
    </div>
  );
}
