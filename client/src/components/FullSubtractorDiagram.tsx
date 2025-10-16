interface FullSubtractorDiagramProps {
  inputA: boolean;
  inputB: boolean;
  inputBin: boolean;
  difference: boolean;
  borrow: boolean;
  powered?: boolean;
}

export function FullSubtractorDiagram({ inputA, inputB, inputBin, difference, borrow, powered = true }: FullSubtractorDiagramProps) {
  const activeWireColor = 'hsl(var(--led-cyan))';
  const inactiveWireColor = 'hsl(var(--muted-foreground))';
  const strokeColor = powered ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))';
  const fillColor = powered ? 'hsl(var(--card))' : 'hsl(var(--muted))';

  const getWireColor = (active: boolean) => powered && active ? activeWireColor : inactiveWireColor;

  const halfSub1Diff = inputA !== inputB;
  const halfSub1Borrow = !inputA && inputB;
  const halfSub2Borrow = inputBin && !halfSub1Diff;

  return (
    <svg viewBox="0 0 400 250" className="w-full max-w-lg">
      <line x1="20" y1="40" x2="60" y2="40" stroke={getWireColor(inputA)} strokeWidth="3">
        {powered && inputA && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>
      
      <line x1="20" y1="70" x2="60" y2="70" stroke={getWireColor(inputB)} strokeWidth="3">
        {powered && inputB && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <rect x="60" y="30" width="80" height="50" fill={fillColor} stroke={strokeColor} strokeWidth="2" rx="4" />
      <text x="100" y="60" fill={strokeColor} fontSize="11" textAnchor="middle" fontWeight="bold">HS1</text>

      <line x1="140" y1="45" x2="190" y2="45" stroke={getWireColor(halfSub1Diff)} strokeWidth="3">
        {powered && halfSub1Diff && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <line x1="20" y1="120" x2="190" y2="120" stroke={getWireColor(inputBin)} strokeWidth="3">
        {powered && inputBin && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <rect x="190" y="30" width="80" height="100" fill={fillColor} stroke={strokeColor} strokeWidth="2" rx="4" />
      <text x="230" y="85" fill={strokeColor} fontSize="11" textAnchor="middle" fontWeight="bold">HS2</text>

      <line x1="270" y1="60" x2="320" y2="60" stroke={getWireColor(difference)} strokeWidth="3">
        {powered && difference && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <line x1="140" y1="65" x2="160" y2="180" stroke={getWireColor(halfSub1Borrow)} strokeWidth="3">
        {powered && halfSub1Borrow && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <line x1="270" y1="100" x2="290" y2="180" stroke={getWireColor(halfSub2Borrow)} strokeWidth="3">
        {powered && halfSub2Borrow && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <path
        d="M 150 170 Q 170 190 150 210 L 180 210 Q 210 210 210 190 Q 210 170 180 170 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
      <text x="195" y="193" fill="hsl(var(--muted-foreground))" fontSize="10">OR</text>

      <line x1="210" y1="190" x2="320" y2="190" stroke={getWireColor(borrow)} strokeWidth="3">
        {powered && borrow && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <text x="10" y="35" fill={strokeColor} fontSize="11" fontWeight="bold">A</text>
      <text x="10" y="65" fill={strokeColor} fontSize="11" fontWeight="bold">B</text>
      <text x="5" y="115" fill={strokeColor} fontSize="11" fontWeight="bold">Bin</text>
      <text x="325" y="65" fill={strokeColor} fontSize="11" fontWeight="bold">Diff</text>
      <text x="325" y="195" fill={strokeColor} fontSize="11" fontWeight="bold">Bout</text>
    </svg>
  );
}
