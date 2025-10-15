import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { circuitStateSchema, userPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Save circuit state
  app.post("/api/circuit-states", async (req, res) => {
    try {
      const validatedData = circuitStateSchema.parse(req.body);
      const savedState = await storage.saveCircuitState(validatedData);
      res.json(savedState);
    } catch (error) {
      res.status(400).json({ error: "Invalid circuit state data" });
    }
  });

  // Get circuit state by ID
  app.get("/api/circuit-states/:id", async (req, res) => {
    try {
      const state = await storage.getCircuitState(req.params.id);
      if (!state) {
        res.status(404).json({ error: "Circuit state not found" });
        return;
      }
      res.json(state);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve circuit state" });
    }
  });

  // Get all circuit states
  app.get("/api/circuit-states", async (req, res) => {
    try {
      const states = await storage.getAllCircuitStates();
      res.json(states);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve circuit states" });
    }
  });

  // Save user preferences
  app.post("/api/preferences", async (req, res) => {
    try {
      const validatedData = userPreferencesSchema.parse(req.body);
      const savedPrefs = await storage.saveUserPreferences(validatedData);
      res.json(savedPrefs);
    } catch (error) {
      res.status(400).json({ error: "Invalid preferences data" });
    }
  });

  // Get user preferences
  app.get("/api/preferences", async (req, res) => {
    try {
      const prefs = await storage.getUserPreferences();
      res.json(prefs || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve preferences" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
