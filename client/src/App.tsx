import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileLandscapePrompt } from "@/components/MobileLandscapePrompt";
import { Button } from "@/components/ui/button";
import { SiInstagram } from "react-icons/si";
import BasicGates from "@/pages/BasicGates";
import HalfAdder from "@/pages/HalfAdder";
import FullAdder from "@/pages/FullAdder";
import HalfSubtractor from "@/pages/HalfSubtractor";
import FullSubtractor from "@/pages/FullSubtractor";
import Decoder from "@/pages/Decoder";
import Multiplexer from "@/pages/Multiplexer";
import PriorityEncoder from "@/pages/PriorityEncoder";
import Comparator from "@/pages/Comparator";
import CompositeUnit from "@/pages/CompositeUnit";
import CarryLookahead from "@/pages/CarryLookahead";
import ALU from "@/pages/ALU";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={BasicGates} />
      <Route path="/half-adder" component={HalfAdder} />
      <Route path="/full-adder" component={FullAdder} />
      <Route path="/half-subtractor" component={HalfSubtractor} />
      <Route path="/full-subtractor" component={FullSubtractor} />
      <Route path="/decoder" component={Decoder} />
      <Route path="/multiplexer" component={Multiplexer} />
      <Route path="/encoder" component={PriorityEncoder} />
      <Route path="/comparator" component={Comparator} />
      <Route path="/composite" component={CompositeUnit} />
      <Route path="/cla" component={CarryLookahead} />
      <Route path="/alu" component={ALU} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between gap-4 p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="text-xs text-muted-foreground font-mono">
                  Educational Circuit Simulator
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  data-testid="button-developer-link"
                >
                  
                  <a
                    href="https://wa.me/919093013606?text=Hello%20Debabrata%2C%20I%20want%20to%20connect%20with%20you"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SiInstagram className="h-4 w-4" />
                    <span className="hidden sm:inline">Say Thanks</span>
                  </a>
                </Button>
              </header>
              <main className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                  <Router />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <MobileLandscapePrompt />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
