import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CircuitLayoutProps {
  title: string;
  principle: string;
  children: ReactNode;
  truthTable?: ReactNode;
  booleanEquations?: string[];
  onReset?: () => void;
}

export function CircuitLayout({
  title,
  principle,
  children,
  truthTable,
  booleanEquations,
  onReset,
}: CircuitLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 text-muted-foreground hover-elevate rounded-md px-2 py-1 -ml-2">
            <ChevronDown className="h-4 w-4" />
            <span className="text-sm font-medium">Working Principle</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <p className="text-sm text-muted-foreground leading-relaxed">{principle}</p>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <Card className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Interactive Simulator</h2>
          {onReset && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReset}
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
        {children}
      </Card>

      {(truthTable || booleanEquations) && (
        <div className="grid md:grid-cols-2 gap-6">
          {truthTable && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Truth Table</h3>
              {truthTable}
            </Card>
          )}
          {booleanEquations && booleanEquations.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Boolean Equations</h3>
              <div className="space-y-2 font-mono text-sm">
                {booleanEquations.map((eq, i) => (
                  <div key={i} className="text-primary">{eq}</div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
