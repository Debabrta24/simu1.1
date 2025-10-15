interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  testId?: string;
}

export function ToggleSwitch({ label, value, onChange, testId }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground min-w-[2rem]">{label}</span>
      <button
        onClick={() => onChange(!value)}
        data-testid={testId || `toggle-${label.toLowerCase()}`}
        className={`
          relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-200
          ${value ? 'bg-primary shadow-led-cyan' : 'bg-muted'}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-background transition-transform duration-200 shadow-md
            ${value ? 'translate-x-8' : 'translate-x-1'}
          `}
        />
      </button>
      <span className={`text-sm font-mono font-semibold w-6 ${value ? 'text-led-green' : 'text-led-red'}`}>
        {value ? '1' : '0'}
      </span>
    </div>
  );
}
