import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { HalfSubtractorDiagram } from "@/components/HalfSubtractorDiagram";
import { PowerButton } from "@/components/PowerButton";

export default function HalfSubtractor() {
  const [inputs, setInputs] = useState({ A: false, B: false });
  const [powered, setPowered] = useState(true);

  const difference = powered ? (inputs.A !== inputs.B) : false;
  const borrow = powered ? (!inputs.A && inputs.B) : false;

  const reset = () => {
    setInputs({ A: false, B: false });
    setPowered(true);
  };

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
          </div>

          <div className="flex items-center justify-center">
            <HalfSubtractorDiagram
              inputA={inputs.A}
              inputB={inputs.B}
              difference={difference}
              borrow={borrow}
              powered={powered}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
            <LEDIndicator label="Diff" value={difference} testId="led-diff" />
            <LEDIndicator label="Borrow" value={borrow} testId="led-borrow" />
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
