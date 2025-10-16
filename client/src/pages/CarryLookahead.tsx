import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { PowerButton } from "@/components/PowerButton";

export default function CarryLookahead() {
  const [inputs, setInputs] = useState({
    A3: false, A2: false, A1: false, A0: false,
    B3: false, B2: false, B1: false, B0: false,
    C0: false
  });
  const [powered, setPowered] = useState(true);

  const computeCLA = () => {
    if (!powered) {
      return {
        P: [false, false, false, false],
        G: [false, false, false, false],
        carries: [false, false, false, false, false],
        sum: [false, false, false, false]
      };
    }
    const P = [
      inputs.A0 !== inputs.B0,
      inputs.A1 !== inputs.B1,
      inputs.A2 !== inputs.B2,
      inputs.A3 !== inputs.B3
    ];
    const G = [
      inputs.A0 && inputs.B0,
      inputs.A1 && inputs.B1,
      inputs.A2 && inputs.B2,
      inputs.A3 && inputs.B3
    ];

    const C1 = G[0] || (P[0] && inputs.C0);
    const C2 = G[1] || (P[1] && G[0]) || (P[1] && P[0] && inputs.C0);
    const C3 = G[2] || (P[2] && G[1]) || (P[2] && P[1] && G[0]) || (P[2] && P[1] && P[0] && inputs.C0);
    const C4 = G[3] || (P[3] && G[2]) || (P[3] && P[2] && G[1]) || (P[3] && P[2] && P[1] && G[0]) || (P[3] && P[2] && P[1] && P[0] && inputs.C0);

    const S0 = P[0] !== inputs.C0;
    const S1 = P[1] !== C1;
    const S2 = P[2] !== C2;
    const S3 = P[3] !== C3;

    return { P, G, carries: [inputs.C0, C1, C2, C3, C4], sum: [S0, S1, S2, S3] };
  };

  const result = computeCLA();
  const reset = () => {
    setInputs({
      A3: false, A2: false, A1: false, A0: false,
      B3: false, B2: false, B1: false, B0: false,
      C0: false
    });
    setPowered(true);
  };

  return (
    <CircuitLayout
      title="Carry Look-Ahead Adder (4-bit)"
      principle="A Carry Look-Ahead Adder (CLA) improves addition speed by computing all carry bits in parallel rather than sequentially. It uses Generate (G) and Propagate (P) signals for each bit position. Generate (Gi = Ai · Bi) indicates when a carry is generated at position i. Propagate (Pi = Ai ⊕ Bi) indicates when a carry from the previous stage is passed through. Using Boolean logic, all carry bits C1-C4 are computed simultaneously from G, P, and C0, eliminating the ripple delay of conventional adders."
      onReset={reset}
      booleanEquations={[
        "Pi = Ai ⊕ Bi",
        "Gi = Ai · Bi",
        "C1 = G0 + (P0 · C0)",
        "C2 = G1 + (P1 · G0) + (P1 · P0 · C0)",
        "C3 = G2 + (P2 · G1) + (P2 · P1 · G0) + (P2 · P1 · P0 · C0)",
        "Si = Pi ⊕ Ci"
      ]}
    >
      <div className="space-y-8">
        <div className="flex justify-end">
          <PowerButton powered={powered} onToggle={() => setPowered(!powered)} />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Input A</h3>
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

            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">Input B</h3>
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

            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">Carry In</h3>
            <ToggleSwitch
              label="C0"
              value={inputs.C0}
              onChange={(v) => setInputs({ ...inputs, C0: v })}
              testId="toggle-c0"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
                <span className="text-xl font-bold text-primary">CLA</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Parallel Carry</p>
            </div>

            <div className="w-full max-w-xs space-y-3">
              <div className="p-3 rounded-md border border-primary/20 bg-card/30">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Propagate (P)</p>
                <div className="flex gap-2 justify-center font-mono text-sm">
                  {result.P.map((p, i) => (
                    <span key={i} className={p ? 'text-led-green' : 'text-led-red'}>
                      {p ? '1' : '0'}
                    </span>
                  )).reverse()}
                </div>
              </div>

              <div className="p-3 rounded-md border border-primary/20 bg-card/30">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Generate (G)</p>
                <div className="flex gap-2 justify-center font-mono text-sm">
                  {result.G.map((g, i) => (
                    <span key={i} className={g ? 'text-led-green' : 'text-led-red'}>
                      {g ? '1' : '0'}
                    </span>
                  )).reverse()}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sum Output</h3>
            <div className="space-y-2">
              {[3, 2, 1, 0].map((i) => (
                <LEDIndicator
                  key={i}
                  label={`S${i}`}
                  value={result.sum[i]}
                  testId={`led-s${i}`}
                />
              ))}
            </div>

            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">Carry Output</h3>
            <LEDIndicator
              label="C4"
              value={result.carries[4]}
              variant="amber"
              testId="led-c4"
            />
          </div>
        </div>

        <div className="p-4 rounded-md border border-primary/20 bg-card/30">
          <p className="text-xs text-muted-foreground mb-2">Carry Chain (Parallel Computation):</p>
          <div className="flex gap-2 justify-center font-mono text-sm">
            {result.carries.map((c, i) => (
              <span key={i} className={`${c ? 'text-led-green' : 'text-led-red'} font-semibold`}>
                C{i}:{c ? '1' : '0'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
