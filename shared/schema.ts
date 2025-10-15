import { z } from "zod";

// Circuit configuration schemas
export const circuitStateSchema = z.object({
  id: z.string(),
  circuitType: z.string(),
  inputs: z.record(z.boolean()),
  timestamp: z.number(),
});

export const userPreferencesSchema = z.object({
  userId: z.string().optional(),
  lastVisitedCircuit: z.string().optional(),
  savedStates: z.array(circuitStateSchema).optional(),
});

export type CircuitState = z.infer<typeof circuitStateSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;

// Logic gate types
export type LogicGateType = 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

// Circuit modules
export type CircuitModule = 
  | 'basic-gates'
  | 'half-adder'
  | 'full-adder'
  | 'half-subtractor'
  | 'full-subtractor'
  | 'decoder-3to8'
  | 'mux-4to1'
  | 'priority-encoder'
  | 'comparator'
  | 'composite-unit'
  | 'carry-lookahead'
  | 'alu';
