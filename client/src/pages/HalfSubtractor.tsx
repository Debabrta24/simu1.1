import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";

export default function HalfSubtractor() {
  const [inputs, setInputs] = useState({ A: false, B: false });

  const difference = inputs.A !== inputs.B;
  const borrow = !inputs.A && inputs.B;

  const reset = () => setInputs({ A: false, B: false });

  const truthTableRows = [
    [false, false, false, false],
    [false, true, true, true],
    [true, false, true, false],
    [true, true, false, false],
  ];

  return (
    <CircuitLayout
      title="Half Subtractor"
      principle="A Half Subtractor performs binary subtraction of two single bits. It produces two outputs: Difference and Borrow. The Difference output uses an XOR gate (similar to addition), while the Borrow output is generated when the subtrahend (B) is greater than the minuend (A). This is implemented using an AND gate with the minuend inverted, resulting in a borrow of 1 when A=0 and B=1."
      onReset={reset}
      booleanEquations={[
        "Diff = A ⊕ B",
        "Borrow = A' · B"
      ]}
      truthTable={
        <TruthTable
          headers={['A', 'B', 'Diff', 'Borrow']}
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
              <span className="text-sm font-semibold text-primary">Diff</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-md border border-primary/30 bg-card/50">
              <span className="text-xs text-muted-foreground">A' AND B</span>
              <span className="text-sm font-semibold text-primary">Borrow</span>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
              <span className="text-lg font-bold text-primary">HALF SUB</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
          <LEDIndicator label="Diff" value={difference} testId="led-diff" />
          <LEDIndicator label="Borrow" value={borrow} testId="led-borrow" />
        </div>
      </div>
    </CircuitLayout>
  );
}
