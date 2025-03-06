import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import pkg from "pg";
import fs from "fs";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Configurar OpenAI
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Leer el esquema de la base de datos
const dbSchema = JSON.parse(fs.readFileSync("./db_schema.json", "utf8"));

// Configurar conexión a Supabase (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20,
});

// Verificar la conexión al inicio
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Error al conectar con la base de datos:", err);
    return;
  }
  console.log("✅ Conexión exitosa con la base de datos");
  release();
});

// Middleware para validar consultas SQL
const validateSQL = (sql) => {
  const forbiddenKeywords = ["DROP", "DELETE", "TRUNCATE", "UPDATE", "INSERT"];
  const upperSQL = sql.toUpperCase();
  return !forbiddenKeywords.some((keyword) => upperSQL.includes(keyword));
};

// Endpoint para recibir consulta en lenguaje natural
app.post("/query", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Pregunta requerida" });

  let client;
  try {
    // 1. Obtener la consulta SQL de OpenAI
    const prompt = `
      Eres un asistente experto en SQL. La base de datos es PostgreSQL.
      Devuelve solo la consulta SQL sin explicaciones.
      Solo genera consultas SELECT, no permitas modificaciones en la base de datos.

      Esquema de la base de datos:
      ${JSON.stringify(dbSchema)}

      Pregunta del usuario: ${question}
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    let sqlQuery = response.data.choices[0].message.content.trim();
    sqlQuery = sqlQuery.replace(/^```sql|```$/g, "").trim();

    console.log("🔍 SQL generado:", sqlQuery);

    // 2. Validar la consulta SQL
    if (!validateSQL(sqlQuery)) {
      throw new Error("Consulta SQL no permitida");
    }

    // 3. Obtener una conexión del pool
    client = await pool.connect();
    console.log("✅ Conexión obtenida del pool");

    // 4. Ejecutar la consulta con un timeout
    const result = await Promise.race([
      client.query(sqlQuery),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout al ejecutar la consulta")), 30000)
      )
    ]);

    console.log("✅ Consulta ejecutada exitosamente");
    console.log("📊 Número de resultados:", result.rows.length);

    res.json({ 
      sql: sqlQuery, 
      data: result.rows,
      rowCount: result.rows.length
    });
  } catch (error) {
    console.error("❌ Error detallado:", error);
    
    // Determinar el tipo de error
    let errorType = "Error desconocido";
    if (error.message.includes("timeout")) {
      errorType = "Timeout";
    } else if (error.message.includes("connection")) {
      errorType = "Error de conexión";
    } else if (error.message.includes("syntax")) {
      errorType = "Error de sintaxis SQL";
    }

    res.status(500).json({ 
      error: "Error al procesar la consulta",
      errorType,
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  } finally {
    if (client) {
      client.release();
      console.log("✅ Conexión liberada");
    }
  }
});

// Endpoint de prueba
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
}); 