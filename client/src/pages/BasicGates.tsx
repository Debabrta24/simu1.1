import { useState } from "react";
import { CircuitLayout } from "@/components/CircuitLayout";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { LEDIndicator } from "@/components/LEDIndicator";
import { TruthTable } from "@/components/TruthTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogicGate } from "@/components/LogicGate";
import { PowerButton } from "@/components/PowerButton";

type GateType = 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'XNOR' | 'NOT';

const gateLogic = {
  AND: (a: boolean, b: boolean) => a && b,
  OR: (a: boolean, b: boolean) => a || b,
  NAND: (a: boolean, b: boolean) => !(a && b),
  NOR: (a: boolean, b: boolean) => !(a || b),
  XOR: (a: boolean, b: boolean) => a !== b,
  XNOR: (a: boolean, b: boolean) => a === b,
  NOT: (a: boolean, b: boolean) => !a,
};

const gateEquations: Record<GateType, string> = {
  AND: "Y = A · B",
  OR: "Y = A + B",
  NAND: "Y = (A · B)'",
  NOR: "Y = (A + B)'",
  XOR: "Y = A ⊕ B",
  XNOR: "Y = (A ⊕ B)'",
  NOT: "Y = A'",
};

const truthTableData = [
  [false, false],
  [false, true],
  [true, false],
  [true, true],
];

export default function BasicGates() {
  const [inputs, setInputs] = useState({ A: false, B: false });
  const [activeGate, setActiveGate] = useState<GateType>('AND');
  const [powered, setPowered] = useState(true);

  const output = powered ? gateLogic[activeGate](inputs.A, inputs.B) : false;

  const reset = () => {
    setInputs({ A: false, B: false });
    setPowered(true);
  };

  const getTruthTableRows = () => {
    if (activeGate === 'NOT') {
      return [
        [false, !false],
        [true, !true],
      ];
    }
    return truthTableData.map(([a, b]) => [
      a, b, gateLogic[activeGate](a, b)
    ]);
  };

  const isSingleInput = activeGate === 'NOT';

  return (
    <CircuitLayout
      title="Basic Logic Gates"
      principle="Logic gates are the fundamental building blocks of digital circuits. Each gate performs a specific Boolean operation on one or more binary inputs to produce a single binary output. AND outputs 1 only when all inputs are 1. OR outputs 1 when at least one input is 1. NAND and NOR are inverted versions of AND and OR. XOR outputs 1 when inputs differ, while XNOR outputs 1 when inputs match. NOT inverts a single input."
      onReset={reset}
      booleanEquations={[gateEquations[activeGate]]}
      truthTable={
        <TruthTable
          headers={isSingleInput ? ['A', 'Y'] : ['A', 'B', 'Y']}
          rows={getTruthTableRows()}
          currentInputs={inputs}
        />
      }
    >
      <div className="space-y-8">
        <Tabs value={activeGate} onValueChange={(v) => setActiveGate(v as GateType)}>
          <TabsList className="grid w-full grid-cols-7 gap-2">
            <TabsTrigger value="AND" data-testid="tab-and">AND</TabsTrigger>
            <TabsTrigger value="OR" data-testid="tab-or">OR</TabsTrigger>
            <TabsTrigger value="NOT" data-testid="tab-not">NOT</TabsTrigger>
            <TabsTrigger value="NAND" data-testid="tab-nand">NAND</TabsTrigger>
            <TabsTrigger value="NOR" data-testid="tab-nor">NOR</TabsTrigger>
            <TabsTrigger value="XOR" data-testid="tab-xor">XOR</TabsTrigger>
            <TabsTrigger value="XNOR" data-testid="tab-xnor">XNOR</TabsTrigger>
          </TabsList>
        </Tabs>

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
            {!isSingleInput && (
              <ToggleSwitch
                label="B"
                value={inputs.B}
                onChange={(v) => setInputs({ ...inputs, B: v })}
                testId="toggle-input-b"
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            <LogicGate
              type={activeGate}
              inputA={inputs.A}
              inputB={inputs.B}
              output={output}
              powered={powered}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Output</h3>
            <LEDIndicator label="Y" value={output} testId="led-output" />
          </div>
        </div>
      </div>
    </CircuitLayout>
  );
}
