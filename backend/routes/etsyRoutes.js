// backend/routes/etsyRoutes.js

import { Router } from "express";
const router = Router();

import { getEtsyData, aggregateSalesByDay } from "../services/etsyService.js";
/**
 * Transforma { rawData, stats } en un objeto con:
 * {
 *   sales: number,
 *   orders: number,
 *   products: [{id, title, price}, ...]
 * }
 * que es lo que `EtsyDataOverview` espera.
 */
function transformToOldShape(rawData, stats) {
  const { totalSales, totalOrders } = stats;

  // Construir array "products" a partir de transactions
  const products = [];
  if (Array.isArray(rawData.results)) {
    rawData.results.forEach((receipt) => {
      if (Array.isArray(receipt.transactions)) {
        receipt.transactions.forEach((t) => {
          // Ejemplo: price = { amount, divisor, currency_code }
          const priceNum = (t.price?.amount ?? 0) / (t.price?.divisor ?? 1);

          products.push({
            id: t.transaction_id,
            title: t.title,
            price: priceNum,
          });
        });
      }
    });
  }

  return {
    sales: totalSales,
    orders: totalOrders,
    products,
  };
}

router.get("/etsy-data", async (req, res) => {
  try {
    // Este getEtsyData() retorna { rawData, stats }
    // donde rawData es el JSON completo (con count, results, etc.),
    // y stats contiene { totalSales, totalOrders, markers }.
    const data = await getEtsyData(null, null, null, true);

    // data.rawData  => JSON completo (todos los campos).
    // data.stats    => { totalSales, totalOrders, markers }

    // 1. Creamos la forma antigua para tu `EtsyDataOverview`
    const oldShape = transformToOldShape(data.rawData, data.stats);

    // Aquí calculas dailyData con la función del backend
    const dailyData = aggregateSalesByDay(data.rawData);

    // 2. Enviamos **todo** junto:
    // - la data completa (rawData, stats)
    // - la forma antigua (oldShape)
    res.json({
      rawData: data.rawData, // todos los receipts, etc.
      stats: data.stats, // totalSales, totalOrders, markers
      overview: oldShape, // { sales, orders, products }
      dailyData, // <--- lo devolvemos al frontend
    });
  } catch (error) {
    console.error("Error fetching Etsy data:", error);
    res.status(500).json({ error: "Error fetching Etsy data" });
  }
});

export default router;
