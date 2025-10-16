import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PowerButtonProps {
  powered: boolean;
  onToggle: () => void;
  testId?: string;
}

export function PowerButton({ powered, onToggle, testId }: PowerButtonProps) {
  return (
    <Button
      variant={powered ? "default" : "outline"}
      size="sm"
      onClick={onToggle}
      data-testid={testId || "button-power"}
      className={powered ? "bg-led-green hover:bg-led-green/90" : ""}
    >
      <Power className={`h-4 w-4 mr-2 ${powered ? "text-white" : ""}`} />
      {powered ? "Power ON" : "Power OFF"}
    </Button>
  );
}
