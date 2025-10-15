# Digital Logic Design Simulator

## Overview
An interactive educational web application for learning digital logic design through hands-on circuit simulation. Features 12 different circuit modules with real-time visualization, truth tables, and Boolean equations.

## Purpose
- Educational platform for students learning digital logic design
- Interactive circuit simulators with visual feedback
- Real-time state changes with LED indicators and toggle switches
- Comprehensive coverage of fundamental digital circuits

## Current State
- **Phase 1 Complete**: All 12 circuit simulator components built with futuristic dark theme UI
- **Phase 2 Pending**: Backend API implementation for state persistence
- **Phase 3 Pending**: Integration and testing

## Recent Changes (2025-10-15)
- Implemented complete frontend with sidebar navigation
- Created all 12 circuit simulator pages:
  1. Basic Logic Gates (AND, OR, NAND, NOR, XOR, XNOR)
  2. Half Adder
  3. Full Adder
  4. Half Subtractor
  5. Full Subtractor
  6. 3-to-8 Line Decoder
  7. 4:1 Multiplexer
  8. Priority Encoder (8-to-3)
  9. Comparator (1-bit & 4-bit)
  10. Composite Arithmetic-Logic Unit
  11. Carry Look-Ahead Adder (4-bit)
  12. ALU (4-bit Arithmetic Logic Unit)
- Added mobile landscape orientation prompt
- Implemented futuristic dark theme with neon glow effects
- Created reusable components: ToggleSwitch, LEDIndicator, TruthTable, CircuitLayout

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React with Vite
- **Routing**: Wouter for client-side navigation
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui component library
- **Key Features**:
  - Sidebar navigation for circuit selection
  - Interactive toggle switches for binary inputs
  - LED indicators with neon glow effects for outputs
  - Truth tables with current state highlighting
  - Boolean equation displays
  - Responsive design with mobile landscape prompt

### Backend (Express + TypeScript)
- **Storage**: In-memory storage for circuit configurations
- **API Routes**: REST endpoints for saving/loading states
- **Planned Features**:
  - Save circuit configurations
  - Load previous states
  - User preferences storage

### Design System
- **Theme**: Dark futuristic with electric cyan accents
- **Colors**:
  - Background: Deep dark blue-black (220 10% 12%)
  - Primary: Electric cyan (190 85% 55%)
  - LED Green: Bright green (142 76% 55%) for logic HIGH
  - LED Red: Deep red (0 72% 50%) for logic LOW
  - LED Amber: Amber (45 90% 60%) for status indicators
- **Typography**: 
  - Sans: Inter for UI text
  - Mono: Roboto Mono for technical values and equations
- **Effects**:
  - Neon glow shadows on active elements
  - Smooth transitions on state changes
  - LED indicators with multi-layer shadows

## User Preferences
- Default dark mode for futuristic educational aesthetic
- Sidebar navigation for easy module switching
- Mobile users prompted to use landscape orientation

## Circuit Modules

### 1. Basic Logic Gates
- 6 gate types: AND, OR, NAND, NOR, XOR, XNOR
- Tab-based selection
- 2 inputs, 1 output
- Full truth table for each gate

### 2-3. Adders (Half & Full)
- Half Adder: 2 inputs → Sum + Carry
- Full Adder: 3 inputs (A, B, Cin) → Sum + Carry out
- Visual gate composition display

### 4-5. Subtractors (Half & Full)
- Half Subtractor: 2 inputs → Difference + Borrow
- Full Subtractor: 3 inputs → Difference + Borrow out
- Borrow logic visualization

### 6. 3-to-8 Decoder
- 3 binary inputs
- 8 output LEDs (only one active at a time)
- Binary to decimal conversion display

### 7. 4:1 Multiplexer
- 4 data inputs (D0-D3)
- 2 selector inputs (S1, S0)
- Active data path highlighting

### 8. Priority Encoder
- 8 inputs (D7-D0) with priority
- 3-bit binary output (A2, A1, A0)
- Valid indicator
- Highest priority input encoded

### 9. Comparator
- 1-bit and 4-bit modes
- Three outputs: Equal, Greater, Lesser
- Decimal value display for 4-bit mode

### 10. Composite Unit
- Combined arithmetic and logic operations
- Mode selector: AND, OR, NOT, ADD, SUB
- Dynamic output based on operation type

### 11. Carry Look-Ahead Adder
- 4-bit parallel carry computation
- Propagate (P) and Generate (G) visualization
- Carry chain display
- Faster than ripple-carry adder

### 12. ALU (4-bit)
- 8 operations: ADD, SUB, INC, DEC, AND, OR, XOR, NOT
- Status flags: Carry, Zero, Overflow
- Arithmetic and logic mode indication
- Decimal result display

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/ui, Wouter
- **Backend**: Express.js, TypeScript
- **Storage**: In-memory (MemStorage)
- **Build**: Vite
- **Package Manager**: npm

## File Structure
```
client/
  src/
    components/
      app-sidebar.tsx          # Main navigation sidebar
      CircuitLayout.tsx        # Reusable layout wrapper
      ToggleSwitch.tsx         # Binary input toggle
      LEDIndicator.tsx         # Output LED display
      TruthTable.tsx           # Truth table component
      MobileLandscapePrompt.tsx # Mobile orientation alert
    pages/
      BasicGates.tsx
      HalfAdder.tsx
      FullAdder.tsx
      HalfSubtractor.tsx
      FullSubtractor.tsx
      Decoder.tsx
      Multiplexer.tsx
      PriorityEncoder.tsx
      Comparator.tsx
      CompositeUnit.tsx
      CarryLookahead.tsx
      ALU.tsx
    App.tsx                    # Main app with routing
    index.css                  # Global styles
shared/
  schema.ts                    # Type definitions
server/
  routes.ts                    # API routes (pending)
  storage.ts                   # Storage interface
```

## Development Guidelines
- Follow design_guidelines.md for all UI implementations
- Use existing Shadcn components
- Maintain consistent spacing and color schemes
- Test responsive behavior on all screen sizes
- Ensure accessibility with proper ARIA labels and keyboard navigation
