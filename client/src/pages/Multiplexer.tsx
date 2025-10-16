import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { PowerButton } from "@/components/PowerButton";

export default function Multiplexer() {
  const [dataInputs, setDataInputs] = useState({ D0: false, D1: false, D2: false, D3: false });
  const [selectors, setSelectors] = useState({ S1: false, S0: false });
  const [powered, setPowered] = useState(true);

  const selectedIndex = (selectors.S1 ? 2 : 0) + (selectors.S0 ? 1 : 0);
  const output = powered ? [dataInputs.D0, dataInputs.D1, dataInputs.D2, dataInputs.D3][selectedIndex] : false;

  const reset = () => {
    setDataInputs({ D0: false, D1: false, D2: false, D3: false });
    setSelectors({ S1: false, S0: false });
    setPowered(true);
  };

  const truthTableRows = [
    [false, false, 'D0', dataInputs.D0],
    [false, true, 'D1', dataInputs.D1],
    [true, false, 'D2', dataInputs.D2],
    [true, true, 'D3', dataInputs.D3],
  ];

  const activeWireColor = 'hsl(var(--led-cyan))';
  const inactiveWireColor = 'hsl(var(--muted-foreground))';

  return (
    <CircuitLayout
      title="4:1 Multiplexer (MUX)"
      principle="A 4:1 Multiplexer selects one of four data inputs (D0-D3) and routes it to a single output based on two selector inputs (S1, S0). The selector lines act as a binary address to choose which data input appears at the output. This is implemented using AND gates to enable the selected input and an OR gate to combine the results. MUX circuits are fundamental in data routing and selection applications."
      onReset={reset}
      booleanEquations={[
        "Y = S1'·S0'·D0 + S1'·S0·D1 + S1·S0'·D2 + S1·S0·D3"
      ]}
      truthTable={
        <TruthTable
          headers={['S1', 'S0', 'Selected', 'Y']}
          rows={truthTableRows}
          currentInputs={selectors}
        />
      }
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <PowerButton powered={powered} onToggle={() => setPowered(!powered)} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Inputs</h3>
            <ToggleSwitch
              label="D0"
              value={dataInputs.D0}
              onChange={(v) => setDataInputs({ ...dataInputs, D0: v })}
              testId="toggle-d0"
            />
            <ToggleSwitch
              label="D1"
              value={dataInputs.D1}
              onChange={(v) => setDataInputs({ ...dataInputs, D1: v })}
              testId="toggle-d1"
            />
            <ToggleSwitch
              label="D2"
              value={dataInputs.D2}
              onChange={(v) => setDataInputs({ ...dataInputs, D2: v })}
              testId="toggle-d2"
            />
            <ToggleSwitch
              label="D3"
              value={dataInputs.D3}
              onChange={(v) => setDataInputs({ ...dataInputs, D3: v })}
              testId="toggle-d3"
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
                <span className="text-xl font-bold text-primary">4:1 MUX</span>
              </div>
            </div>
            
            <svg viewBox="0 0 200 200" className="w-48">
              {[0, 1, 2, 3].map((i) => {
                const y = 40 + i * 35;
                const isSelected = i === selectedIndex;
                const dataValue = [dataInputs.D0, dataInputs.D1, dataInputs.D2, dataInputs.D3][i];
                const wireColor = powered && isSelected && dataValue ? activeWireColor : inactiveWireColor;
                
                return (
                  <g key={i}>
                    <line
                      x1="0"
                      y1={y}
                      x2="60"
                      y2={y}
                      stroke={wireColor}
                      strokeWidth="2"
                    >
                      {powered && isSelected && dataValue && (
                        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
                      )}
                    </line>
                    <text x="5" y={y - 5} fill="hsl(var(--foreground))" fontSize="10">D{i}</text>
                  </g>
                );
              })}
              
              <path
                d="M 60 20 L 140 60 L 140 140 L 60 180 Z"
                fill="hsl(var(--card))"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              
              <line
                x1="140"
                y1="100"
                x2="200"
                y2="100"
                stroke={powered && output ? activeWireColor : inactiveWireColor}
                strokeWidth="2"
              >
                {powered && output && (
                  <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1s" repeatCount="indefinite" />
                )}
              </line>
              <text x="170" y="95" fill="hsl(var(--foreground))" fontSize="10">Y</text>
            </svg>

            <div className="space-y-2 w-full max-w-xs">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">Selectors</h3>
              <ToggleSwitch
                label="S1"
                value={selectors.S1}
                onChange={(v) => setSelectors({ ...selectors, S1: v })}
                testId="toggle-s1"
              />
              <ToggleSwitch
                label="S0"
                value={selectors.S0}
                onChange={(v) => setSelectors({ ...selectors, S0: v })}
                testId="toggle-s0"
              />
              <div className="text-center text-xs text-muted-foreground mt-2">
                Selected: D{selectedIndex}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Output</h3>
            <LEDIndicator label="Y" value={output} testId="led-output" />
            <div className="mt-6 p-4 rounded-md border border-primary/20 bg-card/30">
              <p className="text-xs text-muted-foreground">
                Active Path: D{selectedIndex} → Y
              </p>
            </div>
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
