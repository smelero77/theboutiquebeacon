// backend/redisClient.js
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de .env

const { REDIS_URL } = process.env;

let redisClient = null;

// Función de inicialización
async function initRedis() {
  try {
    if (!REDIS_URL) {
      console.warn("⚠️ REDIS_URL no está configurado. Redis no estará disponible.");
    } else {
      redisClient = createClient({
        url: REDIS_URL,
        socket: {
          tls: true,
          rejectUnauthorized: false,
        },
      });

      redisClient.on("error", (err) => {
        console.error("❌ Error de Redis:", err);
      });

      redisClient.on("connect", () => {
        console.log("✅ Conectado a Redis en Upstash");
      });

      await redisClient.connect();
    }
  } catch (error) {
    console.error("❌ Error al conectar con Redis:", error);
    redisClient = null;
  }
}

// Iniciar la conexión
initRedis().catch(console.error);

// Wrapper para manejar casos donde Redis no está disponible
const redisWrapper = {
  get: async (key) => {
    if (!redisClient) return null;
    try {
      return await redisClient.get(key);
    } catch (error) {
      console.error("❌ Error al obtener de Redis:", error);
      return null;
    }
  },
  
  set: async (key, value, options) => {
    if (!redisClient) return false;
    try {
      await redisClient.set(key, value, options);
      return true;
    } catch (error) {
      console.error("❌ Error al guardar en Redis:", error);
      return false;
    }
  }
};

export default redisWrapper;
