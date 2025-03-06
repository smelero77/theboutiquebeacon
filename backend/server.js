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

// Configuración de la app Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
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

// Importamos las rutas Etsy
import etsyRoutes from "./routes/etsyRoutes.js";
app.use("/api", etsyRoutes);

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
      model: "gpt-4o",
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

// Iniciar servidor
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
