# Digital Logic Design Simulator - Design Guidelines

## Design Approach: Educational System Interface

**Selected Approach:** Material Design System with Custom Educational Enhancements
- **Justification:** Information-dense educational application requiring clear visual hierarchy, interactive feedback, and technical precision
- **Reference Inspiration:** Drawing from educational platforms like Khan Academy (clarity) and CodePen (technical visualization)
- **Core Principle:** Futuristic educational aesthetic balancing technical accuracy with visual engagement

## Color Palette

### Primary Colors (Dark Mode - Default)
- **Background:** Deep dark blue-black (220 10% 12%) - creates futuristic tech environment
- **Surface:** Elevated panels (220 15% 18%) for circuit containers
- **Primary Accent:** Electric cyan (190 85% 55%) - for interactive elements and active states

### State Indicators (Critical)
- **Logic HIGH (1):** Bright green (142 76% 55%) - glowing LED effect
- **Logic LOW (0):** Deep red (0 72% 45%) - minimal glow
- **Neutral/Inactive:** Muted gray (220 10% 35%)
- **Valid Signal:** Amber (45 90% 60%)

### Neon Glow Effects
- Primary glow: Cyan with 8-12px blur for active circuits
- State glow: Green/red with 6-10px blur for LED indicators
- Subtle shadows: Multi-layer with color tints (0 0% 0% at 40% opacity + accent color at 15%)

## Typography

**Font Stack:** 
- Primary: 'Inter' or 'Roboto' from Google Fonts for UI text
- Technical: 'Roboto Mono' for Boolean equations, binary values, and labels

**Hierarchy:**
- Page Title: 2.5rem (40px), font-weight 700
- Circuit Name: 1.75rem (28px), font-weight 600  
- Section Headers: 1.25rem (20px), font-weight 600
- Body/Labels: 0.875rem (14px), font-weight 500
- Technical Text: 0.8125rem (13px), monospace
- Truth Tables: 0.75rem (12px), monospace, tabular-nums

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 primarily
- Component padding: p-6 to p-8
- Section spacing: my-12 to my-16
- Element gaps: gap-4 to gap-6
- Tight spacing: space-2 for related items

**Grid Structure:**
- Desktop: Three-column layout (Inputs | Circuit Visualization | Outputs)
- Tablet: Two-column or stacked based on complexity
- Mobile: Single column with landscape orientation prompt

**Circuit Canvas Layout:**
- Fixed or responsive container: max-w-7xl with mx-auto
- Inputs: Positioned left with consistent vertical spacing (space-y-4)
- Outputs: Positioned right, mirroring input alignment
- Circuit Center: Schematic visualization with connecting lines/paths
- Below Circuit: Truth table and Boolean equations in collapsible panels

## Component Library

### Navigation
- **Sidebar:** Fixed left navigation (w-64) with circuit module list
- **Module Cards:** Rounded cards (rounded-xl) with circuit icon, name, and brief description
- **Active State:** Left border accent (border-l-4) with cyan glow

### Interactive Elements

**Toggle Switches (Binary Inputs):**
- Width: 56px, Height: 28px, rounded-full
- OFF state: Gray background, knob left
- ON state: Cyan background with glow, knob right
- Smooth transition: 200ms ease

**LED Indicators (Outputs):**
- Size: 16-24px circular elements
- Glow effect: box-shadow with 3 layers (inner, mid, outer)
- Label positioned: Below or right of LED with thin connecting line

**Buttons/Controls:**
- Primary Action: Solid cyan with subtle glow on hover
- Secondary: Outline style with border-2
- Mode Toggles: Segmented control style with active segment highlighted

### Circuit Visualization Components

**Logic Gates:**
- SVG-based standard gate symbols
- Stroke width: 2-3px with rounded line caps
- Input/output pins: 6px circles
- Connection lines: Animated dashed lines (stroke-dasharray) showing signal flow

**Connection Lines:**
- Active signals: Cyan with glow animation
- Inactive: Muted gray, thin
- Pulse animation: For demonstrating signal propagation

**Truth Tables:**
- Bordered grid with alternating row backgrounds
- Header: Bold with background tint
- Monospace alignment for binary values
- Current state row: Highlighted with accent background

### Data Display

**Boolean Equations Panel:**
- Dark surface with subtle border
- Monospace font with syntax highlighting (variables in cyan, operators white)
- LaTeX-style formatting for complex expressions

**Status Indicators:**
- Carry/Zero/Overflow Flags: Pill-shaped badges
- Active: Colored background with white text
- Inactive: Outlined only

## Responsive Behavior

### Breakpoints
- Mobile: < 640px - Stack all elements, landscape prompt overlay
- Tablet: 640px - 1024px - Two-column when possible
- Desktop: > 1024px - Full three-column layout

### Mobile Landscape Prompt
- Full-screen overlay (z-50) on portrait detection
- Message: "Please rotate your device for the best experience"
- Auto-dismiss and adjust on landscape orientation
- Subtle dark backdrop with centered modal

### Adaptive Elements
- Navigation: Collapsible sidebar → bottom tab bar on mobile
- Circuit canvas: Scale down but maintain aspect ratio
- Truth tables: Horizontal scroll with sticky first column
- Input controls: Stack vertically with larger touch targets (min-h-12)

## Animations

**Use Sparingly - Educational Focus**

**Essential Animations Only:**
- Signal flow: Subtle pulse along connection lines (1-2s duration)
- LED state change: 150ms fade with glow intensification
- Toggle switches: 200ms slide transition
- Gate activation: Gentle scale (1.05) on signal processing

**No Animations:**
- Page transitions
- Decorative effects
- Excessive hover states

## Images

**No Hero Image Required** - This is a utility application, not marketing

**Functional Imagery:**
- Circuit diagram backgrounds: Subtle grid pattern (opacity 5%)
- Module icons: Simple line-art representations of each circuit type
- Tutorial sections: Optional annotated circuit screenshots for complex modules

## Accessibility & Dark Mode

- **Default Mode:** Dark theme (futuristic technical environment)
- **Light Mode:** Not required for this application - dark mode is part of the brand
- **Contrast:** Ensure all text meets WCAG AA standards against dark backgrounds
- **Focus States:** Visible cyan outline (ring-2 ring-cyan-400) for keyboard navigation
- **ARIA Labels:** All interactive circuit elements labeled for screen readers
- **Color Independence:** Supplement red/green states with text labels or icons

## Module-Specific Layouts

Each of the 10 circuit modules follows the consistent pattern:
1. **Header:** Circuit name + principle explanation (collapsible)
2. **Interactive Canvas:** Input controls | Circuit visualization | Output indicators
3. **Reference Panel:** Truth table + Boolean equations (tabbed or side-by-side)
4. **Footer:** Reset button + explanatory notes

**Consistency:** Same spacing, colors, and interaction patterns across all 10 modules for learner familiarity.