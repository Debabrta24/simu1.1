interface FullAdderDiagramProps {
  inputA: boolean;
  inputB: boolean;
  inputCin: boolean;
  sum: boolean;
  carry: boolean;
  powered?: boolean;
}

export function FullAdderDiagram({ inputA, inputB, inputCin, sum, carry, powered = true }: FullAdderDiagramProps) {
  const activeWireColor = 'hsl(var(--led-cyan))';
  const inactiveWireColor = 'hsl(var(--muted-foreground))';
  const strokeColor = powered ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))';
  const fillColor = powered ? 'hsl(var(--card))' : 'hsl(var(--muted))';

  const getWireColor = (active: boolean) => powered && active ? activeWireColor : inactiveWireColor;

  const halfAdder1Sum = inputA !== inputB;
  const halfAdder1Carry = inputA && inputB;
  const halfAdder2Carry = inputCin && halfAdder1Sum;

  return (
    <svg viewBox="0 0 400 250" className="w-full max-w-lg">
      <line x1="20" y1="40" x2="60" y2="40" stroke={getWireColor(inputA)} strokeWidth="3">
        {powered && inputA && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>
      
      <line x1="20" y1="70" x2="60" y2="70" stroke={getWireColor(inputB)} strokeWidth="3">
        {powered && inputB && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <rect x="60" y="30" width="80" height="50" fill={fillColor} stroke={strokeColor} strokeWidth="2" rx="4" />
      <text x="100" y="60" fill={strokeColor} fontSize="11" textAnchor="middle" fontWeight="bold">HA1</text>

      <line x1="140" y1="45" x2="190" y2="45" stroke={getWireColor(halfAdder1Sum)} strokeWidth="3">
        {powered && halfAdder1Sum && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <line x1="20" y1="120" x2="190" y2="120" stroke={getWireColor(inputCin)} strokeWidth="3">
        {powered && inputCin && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <rect x="190" y="30" width="80" height="100" fill={fillColor} stroke={strokeColor} strokeWidth="2" rx="4" />
      <text x="230" y="85" fill={strokeColor} fontSize="11" textAnchor="middle" fontWeight="bold">HA2</text>

      <line x1="270" y1="60" x2="320" y2="60" stroke={getWireColor(sum)} strokeWidth="3">
        {powered && sum && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <line x1="140" y1="65" x2="160" y2="180" stroke={getWireColor(halfAdder1Carry)} strokeWidth="3">
        {powered && halfAdder1Carry && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <line x1="270" y1="100" x2="290" y2="180" stroke={getWireColor(halfAdder2Carry)} strokeWidth="3">
        {powered && halfAdder2Carry && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <path
        d="M 150 170 Q 170 190 150 210 L 180 210 Q 210 210 210 190 Q 210 170 180 170 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
      <text x="195" y="193" fill="hsl(var(--muted-foreground))" fontSize="10">OR</text>

      <line x1="210" y1="190" x2="320" y2="190" stroke={getWireColor(carry)} strokeWidth="3">
        {powered && carry && <animate attributeName="stroke-dasharray" values="0,8;8,0" dur="0.8s" repeatCount="indefinite" />}
      </line>

      <text x="10" y="35" fill={strokeColor} fontSize="11" fontWeight="bold">A</text>
      <text x="10" y="65" fill={strokeColor} fontSize="11" fontWeight="bold">B</text>
      <text x="5" y="115" fill={strokeColor} fontSize="11" fontWeight="bold">Cin</text>
      <text x="325" y="65" fill={strokeColor} fontSize="11" fontWeight="bold">Sum</text>
      <text x="325" y="195" fill={strokeColor} fontSize="11" fontWeight="bold">Cout</text>
    </svg>
  );
}
