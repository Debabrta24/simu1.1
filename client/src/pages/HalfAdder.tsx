import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";

export default function HalfAdder() {
  const [inputs, setInputs] = useState({ A: false, B: false });

  const sum = inputs.A !== inputs.B;
  const carry = inputs.A && inputs.B;

  const reset = () => setInputs({ A: false, B: false });

  const truthTableRows = [
    [false, false, false, false],
    [false, true, true, false],
    [true, false, true, false],
    [true, true, false, true],
  ];

  return (
    <CircuitLayout
      title="Half Adder"
      principle="A Half Adder is a combinational circuit that adds two single binary digits and produces two outputs: Sum and Carry. It uses an XOR gate to generate the Sum output (which is 1 when inputs differ) and an AND gate to generate the Carry output (which is 1 only when both inputs are 1). This circuit forms the foundation for more complex arithmetic operations."
      onReset={reset}
      booleanEquations={[
        "Sum = A ⊕ B",
        "Carry = A · B"
      ]}
      truthTable={
        <TruthTable
          headers={['A', 'B', 'Sum', 'Carry']}
          rows={truthTableRows}
          currentInputs={inputs}
        />
      }
    >
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Inputs</h3>
          <ToggleSwitch
            label="A"
            value={inputs.A}
            onChange={(v) => setInputs({ ...inputs, A: v })}
            testId="toggle-input-a"
          />
          <ToggleSwitch
            label="B"
            value={inputs.B}
            onChange={(v) => setInputs({ ...inputs, B: v })}
            testId="toggle-input-b"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="space-y-3 w-full max-w-xs">
            <div className="flex items-center justify-between px-4 py-2 rounded-md border border-primary/30 bg-card/50">
              <span className="text-xs text-muted-foreground">XOR Gate</span>
              <span className="text-sm font-semibold text-primary">Sum</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-md border border-primary/30 bg-card/50">
              <span className="text-xs text-muted-foreground">AND Gate</span>
              <span className="text-sm font-semibold text-primary">Carry</span>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
              <span className="text-lg font-bold text-primary">HALF ADDER</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
          <LEDIndicator label="Sum" value={sum} testId="led-sum" />
          <LEDIndicator label="Carry" value={carry} testId="led-carry" />
        </div>
      </div>
    </CircuitLayout>
  );
}
