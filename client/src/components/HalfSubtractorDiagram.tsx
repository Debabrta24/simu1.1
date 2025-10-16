interface HalfSubtractorDiagramProps {
  inputA: boolean;
  inputB: boolean;
  difference: boolean;
  borrow: boolean;
  powered?: boolean;
}

export function HalfSubtractorDiagram({ inputA, inputB, difference, borrow, powered = true }: HalfSubtractorDiagramProps) {
  const activeWireColor = 'hsl(var(--led-cyan))';
  const inactiveWireColor = 'hsl(var(--muted-foreground))';
  const strokeColor = powered ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))';
  const fillColor = powered ? 'hsl(var(--card))' : 'hsl(var(--muted))';

  const getWireColor = (active: boolean) => powered && active ? activeWireColor : inactiveWireColor;

  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-md">
      <line x1="20" y1="60" x2="80" y2="60" stroke={getWireColor(inputA)} strokeWidth="2">
        {powered && inputA && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>
      <circle cx="80" cy="60" r="3" fill={getWireColor(inputA)} />
      <line x1="80" y1="60" x2="100" y2="50" stroke={getWireColor(inputA)} strokeWidth="2">
        {powered && inputA && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>
      <line x1="80" y1="60" x2="90" y2="120" stroke={getWireColor(inputA)} strokeWidth="2">
        {powered && inputA && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>

      <line x1="20" y1="140" x2="80" y2="140" stroke={getWireColor(inputB)} strokeWidth="2">
        {powered && inputB && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>
      <circle cx="80" cy="140" r="3" fill={getWireColor(inputB)} />
      <line x1="80" y1="140" x2="100" y2="70" stroke={getWireColor(inputB)} strokeWidth="2">
        {powered && inputB && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>
      <line x1="80" y1="140" x2="100" y2="140" stroke={getWireColor(inputB)} strokeWidth="2">
        {powered && inputB && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>

      <g>
        <path
          d="M 90 30 Q 110 60 90 90"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
        />
        <path
          d="M 100 30 Q 120 60 100 90 L 130 90 Q 160 90 160 60 Q 160 30 130 30 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
        />
      </g>

      <circle cx="95" cy="120" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />

      <g>
        <path
          d="M 100 110 L 100 150 L 130 150 Q 160 150 160 130 Q 160 110 130 110 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
        />
      </g>

      <line x1="160" y1="60" x2="220" y2="60" stroke={getWireColor(difference)} strokeWidth="2">
        {powered && difference && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>

      <line x1="160" y1="130" x2="220" y2="130" stroke={getWireColor(borrow)} strokeWidth="2">
        {powered && borrow && (
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
        )}
      </line>

      <text x="15" y="55" fill={strokeColor} fontSize="12" fontWeight="bold">A</text>
      <text x="15" y="135" fill={strokeColor} fontSize="12" fontWeight="bold">B</text>
      <text x="225" y="65" fill={strokeColor} fontSize="12" fontWeight="bold">Diff</text>
      <text x="225" y="135" fill={strokeColor} fontSize="12" fontWeight="bold">Borrow</text>

      <text x="145" y="50" fill="hsl(var(--muted-foreground))" fontSize="10">XOR</text>
      <text x="142" y="125" fill="hsl(var(--muted-foreground))" fontSize="10">AND</text>
      <text x="87" y="115" fill="hsl(var(--muted-foreground))" fontSize="9">NOT</text>
    </svg>
  );
}
