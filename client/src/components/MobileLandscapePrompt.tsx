import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";
import { RotateCw } from "lucide-react";

export function MobileLandscapePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowPrompt(isMobile && isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <AlertDialog open={showPrompt}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/20 p-4">
              <RotateCw className="h-8 w-8 text-primary" />
            </div>
          </div>
          <AlertDialogTitle className="text-center">Rotate Your Device</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Please rotate your device to landscape mode for the best viewing experience of the circuit simulators.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={() => setShowPrompt(false)} data-testid="button-ok">
          OK
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
