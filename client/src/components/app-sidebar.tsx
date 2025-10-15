import { Link, useLocation } from "wouter";
import { 
  Cpu, 
  GitBranch, 
  Plus, 
  Minus,
  Binary,
  GitMerge,
  ListTree,
  Workflow,
  Calculator,
  Boxes
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const circuitModules = [
  {
    title: "Basic Logic Gates",
    url: "/",
    icon: GitBranch,
    description: "AND, OR, NAND, NOR, XOR, XNOR"
  },
  {
    title: "Half Adder",
    url: "/half-adder",
    icon: Plus,
    description: "XOR + AND combination"
  },
  {
    title: "Full Adder",
    url: "/full-adder",
    icon: Plus,
    description: "3-input adder with carry"
  },
  {
    title: "Half Subtractor",
    url: "/half-subtractor",
    icon: Minus,
    description: "Difference & borrow outputs"
  },
  {
    title: "Full Subtractor",
    url: "/full-subtractor",
    icon: Minus,
    description: "3-input subtractor"
  },
  {
    title: "3-to-8 Decoder",
    url: "/decoder",
    icon: Binary,
    description: "3 inputs, 8 outputs"
  },
  {
    title: "4:1 Multiplexer",
    url: "/multiplexer",
    icon: GitMerge,
    description: "Select 1 of 4 data inputs"
  },
  {
    title: "Priority Encoder",
    url: "/encoder",
    icon: ListTree,
    description: "8-to-3 priority encoding"
  },
  {
    title: "Comparator",
    url: "/comparator",
    icon: Workflow,
    description: "1-bit & 4-bit comparison"
  },
  {
    title: "Composite Unit",
    url: "/composite",
    icon: Boxes,
    description: "Arithmetic + Logic ops"
  },
  {
    title: "Carry Look-Ahead",
    url: "/cla",
    icon: Calculator,
    description: "Parallel carry adder"
  },
  {
    title: "ALU (4-bit)",
    url: "/alu",
    icon: Cpu,
    description: "Arithmetic Logic Unit"
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/20 border border-primary/30">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Logic Simulator</h2>
            <p className="text-xs text-muted-foreground">Digital Circuit Design</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Circuit Modules
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {circuitModules.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={isActive ? "bg-sidebar-accent" : ""}>
                      <Link href={item.url} data-testid={`link-${item.url.slice(1) || 'basic-gates'}`}>
                        <item.icon className="h-4 w-4" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-medium truncate">{item.title}</span>
                          <span className="text-xs text-muted-foreground truncate">{item.description}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
