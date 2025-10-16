import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PowerButton } from "@/components/PowerButton";

type ALUOperation = 'ADD' | 'SUB' | 'INC' | 'DEC' | 'AND' | 'OR' | 'XOR' | 'NOT';

export default function ALU() {
  const [inputs, setInputs] = useState({
    A3: false, A2: false, A1: false, A0: false,
    B3: false, B2: false, B1: false, B0: false
  });
  const [operation, setOperation] = useState<ALUOperation>('ADD');
  const [powered, setPowered] = useState(true);

  const getAValue = () => (inputs.A3 ? 8 : 0) + (inputs.A2 ? 4 : 0) + (inputs.A1 ? 2 : 0) + (inputs.A0 ? 1 : 0);
  const getBValue = () => (inputs.B3 ? 8 : 0) + (inputs.B2 ? 4 : 0) + (inputs.B1 ? 2 : 0) + (inputs.B0 ? 1 : 0);

  const computeALU = () => {
    if (!powered) {
      return {
        result: 0,
        resultBits: [false, false, false, false],
        carry: false,
        zero: false,
        overflow: false
      };
    }

    const a = getAValue();
    const b = getBValue();
    let result = 0;
    let carry = false;
    let overflow = false;

    switch (operation) {
      case 'ADD':
        result = (a + b) & 0xF;
        carry = (a + b) > 15;
        overflow = ((a & 8) === (b & 8)) && ((result & 8) !== (a & 8));
        break;
      case 'SUB':
        result = (a - b + 16) & 0xF;
        carry = a < b;
        overflow = ((a & 8) !== (b & 8)) && ((result & 8) !== (a & 8));
        break;
      case 'INC':
        result = (a + 1) & 0xF;
        carry = a === 15;
        break;
      case 'DEC':
        result = (a - 1 + 16) & 0xF;
        carry = a === 0;
        break;
      case 'AND':
        result = a & b;
        break;
      case 'OR':
        result = a | b;
        break;
      case 'XOR':
        result = a ^ b;
        break;
      case 'NOT':
        result = (~a) & 0xF;
        break;
    }

    const zero = result === 0;
    const resultBits = [
      !!(result & 1),
      !!(result & 2),
      !!(result & 4),
      !!(result & 8)
    ];

    return { result, resultBits, carry, zero, overflow };
  };

  const aluResult = computeALU();
  const reset = () => {
    setInputs({
      A3: false, A2: false, A1: false, A0: false,
      B3: false, B2: false, B1: false, B0: false
    });
    setPowered(true);
  };

  const isArithmetic = ['ADD', 'SUB', 'INC', 'DEC'].includes(operation);
  const needsBInput = !['INC', 'DEC', 'NOT'].includes(operation);

  return (
    <CircuitLayout
      title="4-bit Arithmetic Logic Unit (ALU)"
      principle="An ALU is the computational core of a processor, performing both arithmetic (ADD, SUB, INC, DEC) and logic (AND, OR, XOR, NOT) operations. Control lines select the operation. The circuit uses a combination of full adders for arithmetic and logic gates for bitwise operations, with multiplexers routing the appropriate result to the output. Flag outputs (Carry, Zero, Overflow) provide status information crucial for conditional branching and error detection in processors."
      onReset={reset}
      booleanEquations={[
        "Result = f(A, B, Operation)",
        "Carry = Cout (arithmetic ops)",
        "Zero = (R3' · R2' · R1' · R0')",
        "Overflow = Sign bit mismatch"
      ]}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-full max-w-sm">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              ALU Operation
            </label>
            <Select value={operation} onValueChange={(v) => setOperation(v as ALUOperation)}>
              <SelectTrigger data-testid="select-operation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADD">Arithmetic: ADD</SelectItem>
                <SelectItem value="SUB">Arithmetic: SUB</SelectItem>
                <SelectItem value="INC">Arithmetic: INC (A+1)</SelectItem>
                <SelectItem value="DEC">Arithmetic: DEC (A-1)</SelectItem>
                <SelectItem value="AND">Logic: AND</SelectItem>
                <SelectItem value="OR">Logic: OR</SelectItem>
                <SelectItem value="XOR">Logic: XOR</SelectItem>
                <SelectItem value="NOT">Logic: NOT A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PowerButton powered={powered} onToggle={() => setPowered(!powered)} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Input A (4-bit)</h3>
            <div className="space-y-2">
              {['A3', 'A2', 'A1', 'A0'].map((label) => (
                <ToggleSwitch
                  key={label}
                  label={label}
                  value={inputs[label as keyof typeof inputs]}
                  onChange={(v) => setInputs({ ...inputs, [label]: v })}
                  testId={`toggle-${label.toLowerCase()}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-mono">Value: {getAValue()}</p>

            {needsBInput && (
              <>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">Input B (4-bit)</h3>
                <div className="space-y-2">
                  {['B3', 'B2', 'B1', 'B0'].map((label) => (
                    <ToggleSwitch
                      key={label}
                      label={label}
                      value={inputs[label as keyof typeof inputs]}
                      onChange={(v) => setInputs({ ...inputs, [label]: v })}
                      testId={`toggle-${label.toLowerCase()}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-mono">Value: {getBValue()}</p>
              </>
            )}
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className={`px-8 py-4 rounded-lg border-2 ${
              isArithmetic ? 'border-amber-500/40 shadow-led-amber' : 'border-primary/40 shadow-neon-cyan'
            } bg-card/50`}>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  {isArithmetic ? 'ARITHMETIC' : 'LOGIC'}
                </p>
                <p className="text-2xl font-bold text-primary mb-2">ALU</p>
                <p className="text-sm text-primary/80">{operation}</p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              <Badge variant={aluResult.carry ? "default" : "outline"} className="font-mono">
                C: {aluResult.carry ? '1' : '0'}
              </Badge>
              <Badge variant={aluResult.zero ? "default" : "outline"} className="font-mono">
                Z: {aluResult.zero ? '1' : '0'}
              </Badge>
              {isArithmetic && (
                <Badge variant={aluResult.overflow ? "destructive" : "outline"} className="font-mono">
                  V: {aluResult.overflow ? '1' : '0'}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Result (4-bit)</h3>
            <div className="space-y-2">
              {[3, 2, 1, 0].map((i) => (
                <LEDIndicator
                  key={i}
                  label={`R${i}`}
                  value={aluResult.resultBits[i]}
                  testId={`led-r${i}`}
                />
              ))}
            </div>
            <p className="text-sm font-mono font-semibold text-primary">
              Decimal: {aluResult.result}
            </p>

            <div className="mt-6 p-4 rounded-md border border-primary/20 bg-card/30">
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">Status Flags</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carry:</span>
                  <span className={aluResult.carry ? 'text-led-green font-semibold' : 'text-led-red'}>
                    {aluResult.carry ? 'SET' : 'CLEAR'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zero:</span>
                  <span className={aluResult.zero ? 'text-led-green font-semibold' : 'text-led-red'}>
                    {aluResult.zero ? 'SET' : 'CLEAR'}
                  </span>
                </div>
                {isArithmetic && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overflow:</span>
                    <span className={aluResult.overflow ? 'text-destructive font-semibold' : 'text-led-red'}>
                      {aluResult.overflow ? 'SET' : 'CLEAR'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
