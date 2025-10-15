import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Comparator() {
  const [mode, setMode] = useState<'1-bit' | '4-bit'>('1-bit');
  const [inputs1Bit, setInputs1Bit] = useState({ A: false, B: false });
  const [inputs4Bit, setInputs4Bit] = useState({
    A3: false, A2: false, A1: false, A0: false,
    B3: false, B2: false, B1: false, B0: false
  });

  const get1BitOutputs = () => {
    const equal = inputs1Bit.A === inputs1Bit.B;
    const greater = inputs1Bit.A && !inputs1Bit.B;
    const lesser = !inputs1Bit.A && inputs1Bit.B;
    return { equal, greater, lesser };
  };

  const get4BitOutputs = () => {
    const a = (inputs4Bit.A3 ? 8 : 0) + (inputs4Bit.A2 ? 4 : 0) + (inputs4Bit.A1 ? 2 : 0) + (inputs4Bit.A0 ? 1 : 0);
    const b = (inputs4Bit.B3 ? 8 : 0) + (inputs4Bit.B2 ? 4 : 0) + (inputs4Bit.B1 ? 2 : 0) + (inputs4Bit.B0 ? 1 : 0);
    return { equal: a === b, greater: a > b, lesser: a < b };
  };

  const outputs = mode === '1-bit' ? get1BitOutputs() : get4BitOutputs();

  const reset = () => {
    setInputs1Bit({ A: false, B: false });
    setInputs4Bit({
      A3: false, A2: false, A1: false, A0: false,
      B3: false, B2: false, B1: false, B0: false
    });
  };

  const truthTableRows1Bit = [
    [false, false, true, false, false],
    [false, true, false, false, true],
    [true, false, false, true, false],
    [true, true, true, false, false],
  ];

  return (
    <CircuitLayout
      title="Comparator (1-bit & 4-bit)"
      principle="A Comparator determines the relationship between two binary numbers, producing three outputs: Equal, Greater, and Lesser. The 1-bit comparator uses XOR and AND gates to compare single bits. The 4-bit comparator extends this by comparing each bit position from MSB to LSB, using cascade logic where higher-order comparisons take precedence. The Equal output uses XNOR gates, while Greater and Lesser use combinational logic with AND, OR, and NOT gates."
      onReset={reset}
      booleanEquations={
        mode === '1-bit'
          ? [
              "Equal = (A ⊕ B)'",
              "Greater = A · B'",
              "Lesser = A' · B"
            ]
          : [
              "Equal = (A3 ⊕ B3)' · (A2 ⊕ B2)' · (A1 ⊕ B1)' · (A0 ⊕ B0)'",
              "Greater = A3·B3' + (A3 ⊕ B3)'·A2·B2' + ...",
              "Lesser = A3'·B3 + (A3 ⊕ B3)'·A2'·B2 + ..."
            ]
      }
      truthTable={
        mode === '1-bit' ? (
          <TruthTable
            headers={['A', 'B', 'A=B', 'A>B', 'A<B']}
            rows={truthTableRows1Bit}
            currentInputs={inputs1Bit}
          />
        ) : undefined
      }
    >
      <div className="space-y-6">
        <Tabs value={mode} onValueChange={(v) => setMode(v as '1-bit' | '4-bit')}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="1-bit" data-testid="tab-1bit">1-bit Comparator</TabsTrigger>
            <TabsTrigger value="4-bit" data-testid="tab-4bit">4-bit Comparator</TabsTrigger>
          </TabsList>
        </Tabs>

        {mode === '1-bit' ? (
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Input A</h3>
              <ToggleSwitch
                label="A"
                value={inputs1Bit.A}
                onChange={(v) => setInputs1Bit({ ...inputs1Bit, A: v })}
                testId="toggle-a"
              />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">Input B</h3>
              <ToggleSwitch
                label="B"
                value={inputs1Bit.B}
                onChange={(v) => setInputs1Bit({ ...inputs1Bit, B: v })}
                testId="toggle-b"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
                  <span className="text-xl font-bold text-primary">1-BIT CMP</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
              <LEDIndicator label="A=B" value={outputs.equal} variant="cyan" testId="led-equal" />
              <LEDIndicator label="A>B" value={outputs.greater} variant="green-red" testId="led-greater" />
              <LEDIndicator label="A<B" value={outputs.lesser} variant="green-red" testId="led-lesser" />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Input A (4-bit)</h3>
              <div className="space-y-2">
                {['A3', 'A2', 'A1', 'A0'].map((label) => (
                  <ToggleSwitch
                    key={label}
                    label={label}
                    value={inputs4Bit[label as keyof typeof inputs4Bit]}
                    onChange={(v) => setInputs4Bit({ ...inputs4Bit, [label]: v })}
                    testId={`toggle-${label.toLowerCase()}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Value: {(inputs4Bit.A3?8:0)+(inputs4Bit.A2?4:0)+(inputs4Bit.A1?2:0)+(inputs4Bit.A0?1:0)}
              </p>

              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">Input B (4-bit)</h3>
              <div className="space-y-2">
                {['B3', 'B2', 'B1', 'B0'].map((label) => (
                  <ToggleSwitch
                    key={label}
                    label={label}
                    value={inputs4Bit[label as keyof typeof inputs4Bit]}
                    onChange={(v) => setInputs4Bit({ ...inputs4Bit, [label]: v })}
                    testId={`toggle-${label.toLowerCase()}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Value: {(inputs4Bit.B3?8:0)+(inputs4Bit.B2?4:0)+(inputs4Bit.B1?2:0)+(inputs4Bit.B0?1:0)}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary/40 bg-card/50 shadow-neon-cyan">
                  <span className="text-xl font-bold text-primary">4-BIT CMP</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outputs</h3>
              <LEDIndicator label="A=B" value={outputs.equal} variant="cyan" testId="led-equal" />
              <LEDIndicator label="A>B" value={outputs.greater} variant="green-red" testId="led-greater" />
              <LEDIndicator label="A<B" value={outputs.lesser} variant="green-red" testId="led-lesser" />
            </div>
          </div>
        )}
      </div>
    </CircuitLayout>
  );
}
