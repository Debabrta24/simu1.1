import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PowerButton } from "@/components/PowerButton";
import { LogicGate } from "@/components/LogicGate";

type Operation = 'AND' | 'OR' | 'NOT' | 'ADD' | 'SUB';

export default function CompositeUnit() {
  const [inputs, setInputs] = useState({ A: false, B: false });
  const [operation, setOperation] = useState<Operation>('AND');
  const [powered, setPowered] = useState(true);

  const getOutput = () => {
    if (!powered) return false;
    switch (operation) {
      case 'AND': return inputs.A && inputs.B;
      case 'OR': return inputs.A || inputs.B;
      case 'NOT': return !inputs.A;
      case 'ADD': return inputs.A !== inputs.B;
      case 'SUB': return inputs.A !== inputs.B;
      default: return false;
    }
  };

  const getCarry = () => {
    if (!powered) return false;
    if (operation === 'ADD') return inputs.A && inputs.B;
    if (operation === 'SUB') return !inputs.A && inputs.B;
    return false;
  };

  const output = getOutput();
  const carry = getCarry();
  const isArithmetic = operation === 'ADD' || operation === 'SUB';
  const isLogic = operation === 'AND' || operation === 'OR' || operation === 'NOT';

  const reset = () => {
    setInputs({ A: false, B: false });
    setPowered(true);
  };

  const getEquation = () => {
    switch (operation) {
      case 'AND': return "Y = A · B";
      case 'OR': return "Y = A + B";
      case 'NOT': return "Y = A'";
      case 'ADD': return "Sum = A ⊕ B, Carry = A · B";
      case 'SUB': return "Diff = A ⊕ B, Borrow = A' · B";
      default: return "";
    }
  };

  return (
    <CircuitLayout
      title="Composite Arithmetic-Logic Unit"
      principle="The Composite Unit integrates both arithmetic and logic operations in a single circuit. Using control lines (operation selector), it can perform logic operations (AND, OR, NOT) or arithmetic operations (ADD, SUB). The circuit uses multiplexers to route inputs through the appropriate gate network based on the selected operation. This demonstrates how mode selection enables a compact design that combines multiple functional blocks."
      onReset={reset}
      booleanEquations={[getEquation()]}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-full max-w-sm">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Operation Mode
            </label>
            <Select value={operation} onValueChange={(v) => setOperation(v as Operation)}>
              <SelectTrigger data-testid="select-operation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">Logic: AND</SelectItem>
                <SelectItem value="OR">Logic: OR</SelectItem>
                <SelectItem value="NOT">Logic: NOT</SelectItem>
                <SelectItem value="ADD">Arithmetic: ADD</SelectItem>
                <SelectItem value="SUB">Arithmetic: SUB</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PowerButton powered={powered} onToggle={() => setPowered(!powered)} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Inputs</h3>
            <ToggleSwitch
              label="A"
              value={inputs.A}
              onChange={(v) => setInputs({ ...inputs, A: v })}
              testId="toggle-a"
            />
            {operation !== 'NOT' && (
              <ToggleSwitch
                label="B"
                value={inputs.B}
                onChange={(v) => setInputs({ ...inputs, B: v })}
                testId="toggle-b"
              />
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className={`px-6 py-3 rounded-lg border-2 ${
              isArithmetic ? 'border-amber-500/40 shadow-led-amber' : 'border-primary/40 shadow-neon-cyan'
            } bg-card/50`}>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  {isArithmetic ? 'ARITHMETIC' : 'LOGIC'}
                </p>
                <p className="text-xl font-bold text-primary">{operation}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {isLogic && "Gate-based operation"}
              {isArithmetic && "Combinational arithmetic"}
            </div>
            {operation === 'AND' && (
              <LogicGate type="AND" inputA={inputs.A} inputB={inputs.B} output={output} powered={powered} className="w-24" />
            )}
            {operation === 'OR' && (
              <LogicGate type="OR" inputA={inputs.A} inputB={inputs.B} output={output} powered={powered} className="w-24" />
            )}
            {operation === 'NOT' && (
              <LogicGate type="NOT" inputA={inputs.A} output={output} powered={powered} className="w-24" />
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
            {isLogic && (
              <LEDIndicator label="Y" value={output} testId="led-output" />
            )}
            {isArithmetic && (
              <>
                <LEDIndicator 
                  label={operation === 'ADD' ? 'Sum' : 'Diff'} 
                  value={output} 
                  testId="led-result" 
                />
                <LEDIndicator 
                  label={operation === 'ADD' ? 'Carry' : 'Borrow'} 
                  value={carry} 
                  testId="led-carry" 
                />
              </>
            )}
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
