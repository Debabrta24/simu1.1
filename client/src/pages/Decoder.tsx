import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { PowerButton } from "@/components/PowerButton";
import { LogicGate } from "@/components/LogicGate";

export default function Decoder() {
  const [inputs, setInputs] = useState({ A2: false, A1: false, A0: false });
  const [powered, setPowered] = useState(true);

  const getOutputs = () => {
    if (!powered) return Array(8).fill(false);
    const value = (inputs.A2 ? 4 : 0) + (inputs.A1 ? 2 : 0) + (inputs.A0 ? 1 : 0);
    return Array.from({ length: 8 }, (_, i) => i === value);
  };

  const outputs = getOutputs();
  const reset = () => {
    setInputs({ A2: false, A1: false, A0: false });
    setPowered(true);
  };

  const truthTableRows = Array.from({ length: 8 }, (_, i) => {
    const a2 = !!(i & 4);
    const a1 = !!(i & 2);
    const a0 = !!(i & 1);
    return [a2, a1, a0, ...Array.from({ length: 8 }, (_, j) => j === i)];
  });

  return (
    <CircuitLayout
      title="3-to-8 Line Decoder"
      principle="A 3-to-8 decoder converts 3 binary input lines into 8 unique output lines. Only one output is active (high) at any time, corresponding to the binary value of the inputs. For example, if inputs are 101 (binary 5), then output Y5 is 1 while all others are 0. This circuit is implemented using NOT gates for input inversion and AND gates to detect each unique input combination."
      onReset={reset}
      booleanEquations={[
        "Y0 = A2' · A1' · A0'",
        "Y1 = A2' · A1' · A0",
        "Y2 = A2' · A1 · A0'",
        "Y3 = A2' · A1 · A0",
        "Y4 = A2 · A1' · A0'",
        "Y5 = A2 · A1' · A0",
        "Y6 = A2 · A1 · A0'",
        "Y7 = A2 · A1 · A0"
      ]}
      truthTable={
        <TruthTable
          headers={['A2', 'A1', 'A0', 'Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7']}
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
              label="A2"
              value={inputs.A2}
              onChange={(v) => setInputs({ ...inputs, A2: v })}
              testId="toggle-input-a2"
            />
            <ToggleSwitch
              label="A1"
              value={inputs.A1}
              onChange={(v) => setInputs({ ...inputs, A1: v })}
              testId="toggle-input-a1"
            />
            <ToggleSwitch
              label="A0"
              value={inputs.A0}
              onChange={(v) => setInputs({ ...inputs, A0: v })}
              testId="toggle-input-a0"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
                <span className="text-xl font-bold text-primary">3:8 DECODER</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Binary: {inputs.A2 ? '1' : '0'}{inputs.A1 ? '1' : '0'}{inputs.A0 ? '1' : '0'}
              </p>
              <div className="flex gap-2 justify-center">
                <LogicGate type="NOT" inputA={inputs.A2} output={!inputs.A2} powered={powered} className="w-16" />
                <LogicGate type="AND" inputA={!inputs.A2} inputB={!inputs.A1} output={!inputs.A2 && !inputs.A1} powered={powered} className="w-16" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
            <div className="grid grid-cols-2 gap-3">
              {outputs.map((output, i) => (
                <LEDIndicator 
                  key={i} 
                  label={`Y${i}`} 
                  value={output} 
                  variant="cyan"
                  testId={`led-y${i}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
