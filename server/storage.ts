import { type CircuitState, type UserPreferences } from "@shared/schema";

export interface IStorage {
  saveCircuitState(state: CircuitState): Promise<CircuitState>;
  getCircuitState(id: string): Promise<CircuitState | undefined>;
  getAllCircuitStates(): Promise<CircuitState[]>;
  saveUserPreferences(prefs: UserPreferences): Promise<UserPreferences>;
  getUserPreferences(userId?: string): Promise<UserPreferences | undefined>;
}

export class MemStorage implements IStorage {
  private circuitStates: Map<string, CircuitState>;
  private userPreferences: UserPreferences | null;

  constructor() {
    this.circuitStates = new Map();
    this.userPreferences = null;
  }

  async saveCircuitState(state: CircuitState): Promise<CircuitState> {
    this.circuitStates.set(state.id, state);
    return state;
  }

  async getCircuitState(id: string): Promise<CircuitState | undefined> {
    return this.circuitStates.get(id);
  }

  async getAllCircuitStates(): Promise<CircuitState[]> {
    return Array.from(this.circuitStates.values());
  }

  async saveUserPreferences(prefs: UserPreferences): Promise<UserPreferences> {
    this.userPreferences = prefs;
    return prefs;
  }

  async getUserPreferences(): Promise<UserPreferences | undefined> {
    return this.userPreferences || undefined;
  }
}

export const storage = new MemStorage();
