interface LEDIndicatorProps {
  label: string;
  value: boolean;
  variant?: 'green-red' | 'cyan' | 'amber';
  testId?: string;
}

export function LEDIndicator({ label, value, variant = 'green-red', testId }: LEDIndicatorProps) {
  const getColor = () => {
    if (variant === 'cyan') return value ? 'led-cyan' : 'led-gray';
    if (variant === 'amber') return value ? 'led-amber' : 'led-gray';
    return value ? 'led-green' : 'led-red';
  };

  const getShadow = () => {
    if (variant === 'cyan') return value ? 'shadow-led-cyan' : '';
    if (variant === 'amber') return value ? 'shadow-led-amber' : '';
    return value ? 'shadow-led-green' : 'shadow-led-red';
  };

  const color = getColor();
  const shadow = getShadow();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground min-w-[2rem]">{label}</span>
      <div 
        className={`h-5 w-5 rounded-full bg-${color} ${shadow} transition-all duration-150`}
        data-testid={testId || `led-${label.toLowerCase()}`}
      />
      <span className={`text-sm font-mono font-semibold w-6 ${value ? 'text-led-green' : 'text-led-red'}`}>
        {value ? '1' : '0'}
      </span>
    </div>
  );
}
