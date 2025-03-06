import { Router } from "express";
import redisClient from "../redisClient.js";
import supabase from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Clave y TTL para la caché en Redis
const CACHE_KEY_PREFIX = "orders_";
const CACHE_TTL = 1800; // 30 minutos

router.post("/orders", requireAuth, async (req, res, next) => {
  try {
    console.log("👤 Usuario autenticado:", req.user);
    const { startDate, endDate, previousStartDate, previousEndDate } = req.body;
    console.log("📅 Fechas recibidas:", { startDate, endDate, previousStartDate, previousEndDate });
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "Las fechas de inicio y fin son requeridas",
        details: { startDate, endDate },
      });
    }

    // Obtener las tiendas del usuario a través de la relación users -> marketplaceaccounts -> stores
    console.log("🔍 Buscando tiendas para el usuario:", req.user.id);
    const { data: userStores, error: storesError } = await supabase
      .from("marketplaceaccounts")
      .select(`
        stores (
          id
        )
      `)
      .eq("user_id", req.user.id);

    console.log("📦 Datos de marketplaceaccounts:", userStores);

    if (storesError) {
      console.error("❌ Error al obtener las tiendas del usuario:", storesError);
      throw storesError;
    }

    // Extraer los IDs de las tiendas
    const storeIds = userStores
      ?.flatMap((account) => {
        console.log("🏪 Cuenta marketplace:", account);
        return account.stores || [];
      })
      ?.map((store) => {
        console.log("🏬 Tienda:", store);
        return store.id;
      }) || [];

    console.log("🏪 IDs de tiendas encontrados:", storeIds);

    if (storeIds.length === 0) {
      console.log("⚠️ No se encontraron tiendas para el usuario");
      return res.json({
        orders: [],
        statistics: {
          netSales: { value: 0, percentage: 0 },
          dailyAverage: { value: 0, percentage: 0 },
          orders: { value: 0, percentage: 0 },
        },
      });
    }

    // Crear una clave única para Redis basada en las tiendas y el rango de fechas
    const cacheKey = `${CACHE_KEY_PREFIX}${storeIds.join("_")}_${startDate}_${endDate}`;

    try {
      // Intentar obtener datos de Redis
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("✅ Datos obtenidos desde Redis");
        return res.json(JSON.parse(cachedData));
      }
    } catch (redisError) {
      console.warn("⚠️ Error al intentar usar Redis:", redisError.message);
    }

    console.log("🔄 Obteniendo datos desde Supabase...");
    console.log("📊 Consulta para órdenes actuales:", {
      store_ids: storeIds,
      start_date: startDate,
      end_date: endDate
    });

    // Obtener órdenes del período actual
    const { data: currentOrders, error: currentError } = await supabase
      .from("orders")
      .select(`
        id,
        store_id,
        marketplace_order_id,
        order_date,
        status,
        total_amount,
        payment_method,
        buyer_info,
        currency_code,
        created_at,
        updated_at
      `)
      .in("store_id", storeIds)
      .gte("order_date", startDate)
      .lte("order_date", endDate);

    console.log("📦 Órdenes actuales encontradas:", currentOrders?.length || 0);
    if (currentOrders?.length > 0) {
      console.log("📊 Ejemplo de orden:", {
        id: currentOrders[0].id,
        total_amount: currentOrders[0].total_amount,
        order_date: currentOrders[0].order_date
      });
    }

    if (currentError) {
      console.error("❌ Error al obtener órdenes actuales:", currentError);
      throw currentError;
    }

    console.log("📊 Consulta para órdenes anteriores:", {
      store_ids: storeIds,
      start_date: previousStartDate,
      end_date: previousEndDate
    });

    // Obtener órdenes del período anterior
    const { data: previousOrders, error: previousError } = await supabase
      .from("orders")
      .select(`
        id,
        store_id,
        marketplace_order_id,
        order_date,
        status,
        total_amount,
        payment_method,
        buyer_info,
        currency_code,
        created_at,
        updated_at
      `)
      .in("store_id", storeIds)
      .gte("order_date", previousStartDate)
      .lte("order_date", previousEndDate);

    console.log("📦 Órdenes anteriores encontradas:", previousOrders?.length || 0);

    if (previousError) {
      console.error("❌ Error al obtener órdenes anteriores:", previousError);
      throw previousError;
    }

    // Calcular estadísticas
    const statistics = calculateStatistics(currentOrders || [], previousOrders || []);
    console.log("📊 Estadísticas calculadas:", statistics);

    const responseData = {
      orders: currentOrders,
      statistics,
    };

    // Intentar guardar en Redis
    try {
      await redisClient.set(cacheKey, JSON.stringify(responseData), {
        EX: CACHE_TTL,
      });
      console.log("✅ Datos guardados en Redis");
    } catch (redisError) {
      console.warn("⚠️ Error al guardar en Redis:", redisError.message);
    }

    console.log("✅ Enviando respuesta al cliente:", {
      total_orders: currentOrders?.length || 0,
      has_statistics: !!statistics
    });
    res.json(responseData);
  } catch (error) {
    console.error("❌ Error procesando órdenes:", error);
    next(error);
  }
});

// Función auxiliar para calcular estadísticas
function calculateStatistics(currentOrders, previousOrders) {
  // Calcular totales actuales
  const totalSales = currentOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrders = currentOrders.length;
  const uniqueDays = new Set(
    currentOrders.map((order) => 
      new Date(order.order_date || order.created_at).toISOString().split("T")[0]
    )
  ).size;
  const dailyAverage = totalSales / (uniqueDays || 1);

  // Calcular totales anteriores
  const prevTotalSales = previousOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const prevTotalOrders = previousOrders.length;
  const prevUniqueDays = new Set(
    previousOrders.map((order) => 
      new Date(order.order_date || order.created_at).toISOString().split("T")[0]
    )
  ).size;
  const prevDailyAverage = prevTotalSales / (prevUniqueDays || 1);

  // Calcular porcentajes de cambio
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  return {
    netSales: {
      value: totalSales,
      percentage: calculatePercentageChange(totalSales, prevTotalSales),
    },
    dailyAverage: {
      value: dailyAverage,
      percentage: calculatePercentageChange(dailyAverage, prevDailyAverage),
    },
    orders: {
      value: totalOrders,
      percentage: calculatePercentageChange(totalOrders, prevTotalOrders),
    },
  };
}

export default router; 