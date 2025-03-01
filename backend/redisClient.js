// backend/redisClient.js
const redis = require("redis");

// Lee tu URL de Upstash (o local) desde variables de entorno
// (Asegúrate de tener UPSTASH_REDIS_URL en tu .env, con la URL completa)
const redisClient = redis.createClient({
  url: process.env.UPSTASH_REDIS_URL,
});

// Manejo de eventos
redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// Conectar
redisClient.connect().catch((err) => {
  console.error("Error connecting Redis:", err);
});

module.exports = redisClient;
