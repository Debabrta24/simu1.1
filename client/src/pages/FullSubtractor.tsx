import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";

export default function FullSubtractor() {
  const [inputs, setInputs] = useState({ A: false, B: false, Bin: false });

  const difference = (inputs.A !== inputs.B) !== inputs.Bin;
  const borrow = (!inputs.A && inputs.B) || (inputs.Bin && !(inputs.A !== inputs.B));

  const reset = () => setInputs({ A: false, B: false, Bin: false });

  const truthTableRows = [
    [false, false, false, false, false],
    [false, false, true, true, true],
    [false, true, false, true, true],
    [false, true, true, false, true],
    [true, false, false, true, false],
    [true, false, true, false, false],
    [true, true, false, false, false],
    [true, true, true, true, true],
  ];

  return (
    <CircuitLayout
      title="Full Subtractor"
      principle="A Full Subtractor extends the Half Subtractor to handle three inputs: minuend (A), subtrahend (B), and borrow-in (Bin). It outputs Difference and Borrow-out. The circuit is built using two Half Subtractors and an OR gate. The first Half Subtractor computes A-B, then the second subtracts Bin from that result. The final borrow is produced by ORing the borrow outputs from both stages."
      onReset={reset}
      booleanEquations={[
        "Diff = A ⊕ B ⊕ Bin",
        "Bout = (A' · B) + (Bin · (A ⊕ B)')"
      ]}
      truthTable={
        <TruthTable
          headers={['A', 'B', 'Bin', 'Diff', 'Bout']}
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
          <ToggleSwitch
            label="Bin"
            value={inputs.Bin}
            onChange={(v) => setInputs({ ...inputs, Bin: v })}
            testId="toggle-input-bin"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="space-y-2 w-full max-w-xs text-xs text-center text-muted-foreground">
            <div className="px-3 py-2 rounded-md border border-primary/20 bg-card/30">
              Half Sub 1: A - B
            </div>
            <div className="px-3 py-2 rounded-md border border-primary/20 bg-card/30">
              Half Sub 2: Result - Bin
            </div>
            <div className="px-3 py-2 rounded-md border border-primary/20 bg-card/30">
              OR Gate: Combines borrows
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
              <span className="text-xl font-bold text-primary">FULL SUB</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
          <LEDIndicator label="Diff" value={difference} testId="led-diff" />
          <LEDIndicator label="Bout" value={borrow} testId="led-borrow" />
        </div>
      </div>
    </CircuitLayout>
  );
}
