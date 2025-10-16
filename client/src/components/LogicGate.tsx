type GateType = 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'XNOR' | 'NOT';

interface LogicGateProps {
  type: GateType;
  inputA?: boolean;
  inputB?: boolean;
  output: boolean;
  powered?: boolean;
  className?: string;
}

export function LogicGate({ type, inputA, inputB, output, powered = true, className = '' }: LogicGateProps) {
  const strokeColor = powered ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))';
  const fillColor = powered ? 'hsl(var(--card))' : 'hsl(var(--muted))';
  const activeWireColor = 'hsl(var(--led-cyan))';
  const inactiveWireColor = 'hsl(var(--muted-foreground))';

  const getInputAColor = () => {
    if (!powered) return inactiveWireColor;
    return inputA ? activeWireColor : inactiveWireColor;
  };

  const getInputBColor = () => {
    if (!powered) return inactiveWireColor;
    return inputB ? activeWireColor : inactiveWireColor;
  };

  const getOutputColor = () => {
    if (!powered) return inactiveWireColor;
    return output ? activeWireColor : inactiveWireColor;
  };

  const renderGate = () => {
    switch (type) {
      case 'AND':
        return (
          <g>
            <path
              d="M 30 20 L 30 80 L 60 80 Q 90 80 90 50 Q 90 20 60 20 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
          </g>
        );

      case 'OR':
        return (
          <g>
            <path
              d="M 30 20 Q 50 50 30 80 L 60 80 Q 90 80 90 50 Q 90 20 60 20 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
          </g>
        );

      case 'NAND':
        return (
          <g>
            <path
              d="M 30 20 L 30 80 L 60 80 Q 85 80 85 50 Q 85 20 60 20 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="95" cy="50" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );

      case 'NOR':
        return (
          <g>
            <path
              d="M 30 20 Q 50 50 30 80 L 60 80 Q 85 80 85 50 Q 85 20 60 20 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="95" cy="50" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );

      case 'XOR':
        return (
          <g>
            <path
              d="M 20 20 Q 40 50 20 80"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <path
              d="M 30 20 Q 50 50 30 80 L 60 80 Q 90 80 90 50 Q 90 20 60 20 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
          </g>
        );

      case 'XNOR':
        return (
          <g>
            <path
              d="M 20 20 Q 40 50 20 80"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <path
              d="M 30 20 Q 50 50 30 80 L 60 80 Q 85 80 85 50 Q 85 20 60 20 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="95" cy="50" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );

      case 'NOT':
        return (
          <g>
            <path
              d="M 30 20 L 80 50 L 30 80 Z"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="90" cy="50" r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          </g>
        );

      default:
        return null;
    }
  };

  const isInverting = type === 'NAND' || type === 'NOR' || type === 'XNOR' || type === 'NOT';
  const outputLineStart = isInverting ? 100 : 90;

  return (
    <svg
      viewBox="0 0 180 100"
      className={`${className}`}
      style={{ maxWidth: '200px', width: '100%' }}
    >
      {type !== 'NOT' && (
        <>
          <line
            x1="0"
            y1="35"
            x2="30"
            y2="35"
            stroke={getInputAColor()}
            strokeWidth="2"
            className="transition-colors duration-300"
          >
            {powered && inputA && (
              <animate
                attributeName="stroke-dasharray"
                values="0,100;100,0"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>

          <line
            x1="0"
            y1="65"
            x2="30"
            y2="65"
            stroke={getInputBColor()}
            strokeWidth="2"
            className="transition-colors duration-300"
          >
            {powered && inputB && (
              <animate
                attributeName="stroke-dasharray"
                values="0,100;100,0"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>
        </>
      )}

      {type === 'NOT' && (
        <line
          x1="0"
          y1="50"
          x2="30"
          y2="50"
          stroke={getInputAColor()}
          strokeWidth="2"
          className="transition-colors duration-300"
        >
          {powered && inputA && (
            <animate
              attributeName="stroke-dasharray"
              values="0,100;100,0"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </line>
      )}

      {renderGate()}

      <line
        x1={outputLineStart}
        y1="50"
        x2="180"
        y2="50"
        stroke={getOutputColor()}
        strokeWidth="2"
        className="transition-colors duration-300"
      >
        {powered && output && (
          <animate
            attributeName="stroke-dasharray"
            values="0,100;100,0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </line>
    </svg>
  );
}
