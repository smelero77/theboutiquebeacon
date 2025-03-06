import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import pkg from "pg";
const { Pool } = pkg;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Importamos Redis y EtsyService
import redisClient from "./redisClient.js";
import { syncOrdersWithEtsy } from "./services/etsyService.js";

// Importamos las rutas
import etsyRoutes from "./routes/etsyRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Configuración de CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://tu-dominio-produccion.com' 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Configuración de la app Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Configuración de OpenAI
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Configuración de Supabase (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
});

pool.on("error", (err) => {
  console.error("❌ Error en la conexión a PostgreSQL:", err.message);
});

// Middleware para logging de requests
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Registramos las rutas
app.use("/api", etsyRoutes);
app.use("/api", orderRoutes);

// ✅ PRUEBA de conexión a PostgreSQL
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa a PostgreSQL:", result.rows);
    res.json({ status: "ok", time: result.rows[0] });
  } catch (error) {
    console.error("❌ Error en la conexión a la base de datos:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Leer el esquema de la base de datos
const dbSchema = JSON.parse(fs.readFileSync(path.join(__dirname, "db_schema.json"), "utf8"));

// ✅ **Nuevo endpoint para consultas SQL en lenguaje natural**
app.post("/query", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "La pregunta es requerida." });

  let client;
  try {
    const prompt = `
      Eres un experto en SQL (PostgreSQL). Devuelve solo la consulta SQL sin explicaciones.
      Esquema: ${JSON.stringify(dbSchema)}
      Pregunta: ${question}
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    let sqlQuery = response.data.choices[0].message.content.trim();

    // 🔥 Verifica si hay comillas raras
    console.log("🔍 SQL antes de ejecutar:", JSON.stringify(sqlQuery));

    // ✅ Eliminar formato incorrecto
    sqlQuery = sqlQuery.replace(/^```sql|```$/g, "").trim();

    console.log("✅ SQL limpio:", sqlQuery);

    client = await pool.connect();
    const result = await client.query(sqlQuery);
    res.json({ sql: sqlQuery, data: result.rows });
  } catch (error) {
    console.error("❌ Error detallado:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
});

// Iniciamos la sincronización automática con Etsy
async function startSync() {
  console.log("🔄 Iniciando sincronización con Etsy...");
  try {
    await syncOrdersWithEtsy(true);
    console.log("✅ Sincronización inicial completada.");
  } catch (error) {
    console.error("❌ Error en la sincronización inicial:", error);
  }
}

// Llamamos a la sincronización al iniciar el servidor
startSync();

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error("❌ Error no manejado:", err);
  console.error("Stack:", err.stack);
  
  // Si el error viene de Supabase
  if (err.message?.includes("supabase")) {
    return res.status(500).json({
      error: "Error de base de datos",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
  
  // Si el error viene de Redis
  if (err.message?.includes("redis")) {
    return res.status(500).json({
      error: "Error de caché",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
  
  // Error genérico
  res.status(500).json({
    error: "Error interno del servidor",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Iniciar servidor
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
