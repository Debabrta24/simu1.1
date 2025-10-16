// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  circuitStates;
  userPreferences;
  constructor() {
    this.circuitStates = /* @__PURE__ */ new Map();
    this.userPreferences = null;
  }
  async saveCircuitState(state) {
    this.circuitStates.set(state.id, state);
    return state;
  }
  async getCircuitState(id) {
    return this.circuitStates.get(id);
  }
  async getAllCircuitStates() {
    return Array.from(this.circuitStates.values());
  }
  async saveUserPreferences(prefs) {
    this.userPreferences = prefs;
    return prefs;
  }
  async getUserPreferences() {
    return this.userPreferences || void 0;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { z } from "zod";
var circuitStateSchema = z.object({
  id: z.string(),
  circuitType: z.string(),
  inputs: z.record(z.boolean()),
  timestamp: z.number()
});
var userPreferencesSchema = z.object({
  userId: z.string().optional(),
  lastVisitedCircuit: z.string().optional(),
  savedStates: z.array(circuitStateSchema).optional()
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/circuit-states", async (req, res) => {
    try {
      const validatedData = circuitStateSchema.parse(req.body);
      const savedState = await storage.saveCircuitState(validatedData);
      res.json(savedState);
    } catch (error) {
      res.status(400).json({ error: "Invalid circuit state data" });
    }
  });
  app2.get("/api/circuit-states/:id", async (req, res) => {
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
  app2.get("/api/circuit-states", async (req, res) => {
    try {
      const states = await storage.getAllCircuitStates();
      res.json(states);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve circuit states" });
    }
  });
  app2.post("/api/preferences", async (req, res) => {
    try {
      const validatedData = userPreferencesSchema.parse(req.body);
      const savedPrefs = await storage.saveUserPreferences(validatedData);
      res.json(savedPrefs);
    } catch (error) {
      res.status(400).json({ error: "Invalid preferences data" });
    }
  });
  app2.get("/api/preferences", async (req, res) => {
    try {
      const prefs = await storage.getUserPreferences();
      res.json(prefs || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve preferences" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  app.listen(5001, () => {
    console.log(`\u2705 Server running at http://localhost:${5001}`);
  });
})();
