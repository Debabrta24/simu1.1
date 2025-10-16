import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { PowerButton } from "@/components/PowerButton";

export default function PriorityEncoder() {
  const [inputs, setInputs] = useState({
    D7: false, D6: false, D5: false, D4: false,
    D3: false, D2: false, D1: false, D0: false
  });
  const [powered, setPowered] = useState(true);

  const getOutputs = () => {
    if (!powered) return { A2: false, A1: false, A0: false, valid: false };
    if (inputs.D7) return { A2: true, A1: true, A0: true, valid: true };
    if (inputs.D6) return { A2: true, A1: true, A0: false, valid: true };
    if (inputs.D5) return { A2: true, A1: false, A0: true, valid: true };
    if (inputs.D4) return { A2: true, A1: false, A0: false, valid: true };
    if (inputs.D3) return { A2: false, A1: true, A0: true, valid: true };
    if (inputs.D2) return { A2: false, A1: true, A0: false, valid: true };
    if (inputs.D1) return { A2: false, A1: false, A0: true, valid: true };
    if (inputs.D0) return { A2: false, A1: false, A0: false, valid: true };
    return { A2: false, A1: false, A0: false, valid: false };
  };

  const outputs = getOutputs();
  const reset = () => {
    setInputs({
      D7: false, D6: false, D5: false, D4: false,
      D3: false, D2: false, D1: false, D0: false
    });
    setPowered(true);
  };

  const truthTableRows = [
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', true, true, true, true, true],
    ['X', 'X', 'X', 'X', 'X', 'X', true, false, true, true, false, true],
    ['X', 'X', 'X', 'X', 'X', true, false, false, true, false, true, true],
    ['X', 'X', 'X', 'X', true, false, false, false, true, false, false, true],
    ['X', 'X', 'X', true, false, false, false, false, true, false, false, true],
    ['X', 'X', true, false, false, false, false, false, true, false, true, true],
    ['X', true, false, false, false, false, false, false, true, true, false, true],
    [true, false, false, false, false, false, false, false, true, true, true, true],
    [false, false, false, false, false, false, false, false, false, false, false, false],
  ];

  return (
    <CircuitLayout
      title="Priority Encoder (8-to-3)"
      principle="A Priority Encoder converts multiple input lines into a binary code representing the highest-priority active input. When multiple inputs are high, the encoder outputs the binary code of the highest-numbered input. D7 has the highest priority, followed by D6, D5, and so on. The Valid output indicates whether any input is active. This circuit uses OR gates to detect any high input and AND gates with inversion to implement the priority logic."
      onReset={reset}
      booleanEquations={[
        "A2 = D7 + D6 + D5 + D4",
        "A1 = D7 + D6 + D3 + D2",
        "A0 = D7 + D5 + D3 + D1",
        "Valid = D7 + D6 + D5 + D4 + D3 + D2 + D1 + D0"
      ]}
      truthTable={
        <TruthTable
          headers={['D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1', 'D0', 'A2', 'A1', 'A0', 'V']}
          rows={truthTableRows}
        />
      }
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <PowerButton powered={powered} onToggle={() => setPowered(!powered)} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Inputs (Priority: High→Low)</h3>
            {[7, 6, 5, 4, 3, 2, 1, 0].map((i) => (
              <ToggleSwitch
                key={i}
                label={`D${i}`}
                value={inputs[`D${i}` as keyof typeof inputs]}
                onChange={(v) => setInputs({ ...inputs, [`D${i}`]: v })}
                testId={`toggle-d${i}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
                <span className="text-xl font-bold text-primary">PRIORITY ENC</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">8-to-3 Line</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
            <LEDIndicator label="A2" value={outputs.A2} testId="led-a2" />
            <LEDIndicator label="A1" value={outputs.A1} testId="led-a1" />
            <LEDIndicator label="A0" value={outputs.A0} testId="led-a0" />
            <LEDIndicator label="Valid" value={outputs.valid} variant="amber" testId="led-valid" />
            <div className="mt-4 p-4 rounded-md border border-primary/20 bg-card/30">
              <p className="text-xs text-muted-foreground">
                Binary Output: {outputs.A2 ? '1' : '0'}{outputs.A1 ? '1' : '0'}{outputs.A0 ? '1' : '0'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
