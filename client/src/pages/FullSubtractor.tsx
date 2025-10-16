import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { FullSubtractorDiagram } from "@/components/FullSubtractorDiagram";
import { PowerButton } from "@/components/PowerButton";

export default function FullSubtractor() {
  const [inputs, setInputs] = useState({ A: false, B: false, Bin: false });
  const [powered, setPowered] = useState(true);

  const difference = powered ? ((inputs.A !== inputs.B) !== inputs.Bin) : false;
  const borrow = powered ? ((!inputs.A && inputs.B) || (inputs.Bin && !(inputs.A !== inputs.B))) : false;

  const reset = () => {
    setInputs({ A: false, B: false, Bin: false });
    setPowered(true);
  };

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
      <div className="space-y-6">
        <div className="flex justify-end">
          <PowerButton powered={powered} onToggle={() => setPowered(!powered)} />
        </div>

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

          <div className="flex items-center justify-center">
            <FullSubtractorDiagram
              inputA={inputs.A}
              inputB={inputs.B}
              inputBin={inputs.Bin}
              difference={difference}
              borrow={borrow}
              powered={powered}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
            <LEDIndicator label="Diff" value={difference} testId="led-diff" />
            <LEDIndicator label="Bout" value={borrow} testId="led-borrow" />
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
