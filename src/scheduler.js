// src/scheduler.js
const cron = require("node-cron");
const { fetchEtsyDataFromAPI } = require("./services/etsyService");
const redisClient = require("./redisClient");

const CACHE_KEY = "etsy_data";
const CACHE_TTL = 1800; // 30 minutes

cron.schedule("*/30 * * * *", async () => {
  try {
    console.log("Running Etsy data sync...");
    const etsyData = await fetchEtsyDataFromAPI();
    await redisClient.set(CACHE_KEY, JSON.stringify(etsyData), { EX: CACHE_TTL });
    console.log("Etsy data cache updated successfully");
  } catch (error) {
    console.error("Error updating Etsy data cache:", error);
  }
});
