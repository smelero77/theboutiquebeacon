// backend/routes/etsyRoutes.js
const express = require("express");
const router = express.Router();
const { getEtsyData, parseReceiptsData } = require("../services/etsyService");

router.get("/etsy-data", async (req, res) => {
  try {
    // Llamamos a la función principal
    const data = await getEtsyData(); // Esto devuelve tu mock y lo guarda en Redis
    // data es el JSON completo (count, results, etc.)

    // Opcional: Si quieres parsear para calcular totalSales, etc.:
    // const stats = parseReceiptsData(data);

    // Retornamos al frontend
    res.json(data);
  } catch (error) {
    console.error("Error fetching Etsy data:", error);
    res.status(500).json({ error: "Error fetching Etsy data" });
  }
});

module.exports = router;
