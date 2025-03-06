// backend/redisClient.js
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de .env

console.log(">> [redisClient.js] Leyendo REDIS_URL =", process.env.REDIS_URL);


const { REDIS_URL } = process.env;

const redisClient = createClient({
  url: REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Top-level await en ESM
await redisClient.connect();
console.log("Conectado a Redis en Upstash");

export default redisClient;
