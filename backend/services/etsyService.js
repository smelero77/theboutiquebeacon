// backend/services/etsyService.js
// ----------------------------------------------------------------------
// Módulo que:
//  1) Usa un mockReceiptsData con 4 recibos completos.
//  2) Sincroniza pedidos con Supabase (en modo mock o API real).
//  3) Devuelve un objeto con { rawData, stats } para que tu etsyRoutes.js
//     siga usando transformToOldShape(...) y aggregateSalesByDay(...).
// ----------------------------------------------------------------------

import axios from "axios";
import dotenv from "dotenv";
import redisClient from "../redisClient.js";
import supabase from "../supabaseClient.js";

dotenv.config();

// Clave y TTL para la caché en Redis
const CACHE_KEY = "etsy_orders";
const CACHE_TTL = 1800; // 30 min

// ======================================================================
// 1. Mock completo (4 recibos) con todos los campos
// ======================================================================
const mockReceiptsData = {
  count: 4,
  results: [
    {
      receipt_id: 1001,
      receipt_type: 0,
      seller_user_id: 12345,
      seller_email: "myshop@example.com",
      buyer_user_id: 67890,
      buyer_email: "john.doe@example.com",
      name: "John Doe",
      first_line: "123 Main Street",
      second_line: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      status: "paid",
      formatted_address: "123 Main Street Apt 4B, New York, NY 10001",
      country_iso: "US",
      payment_method: "credit_card",
      payment_email: "john.doe@example.com",
      message_from_seller: "Thanks for your purchase!",
      message_from_buyer: "Please ship ASAP",
      message_from_payment: "Payment processed successfully",
      is_paid: true,
      is_shipped: true,
      create_timestamp: 1672502400,
      created_timestamp: 1672502400,
      update_timestamp: 1672588800,
      updated_timestamp: 1672588800,
      is_gift: false,
      gift_message: null,
      gift_sender: null,
      grandtotal: {
        amount: 3500,
        divisor: 100,
        currency_code: "USD",
      },
      subtotal: {
        amount: 3000,
        divisor: 100,
        currency_code: "USD",
      },
      total_price: {
        amount: 3000,
        divisor: 100,
        currency_code: "USD",
      },
      total_shipping_cost: {
        amount: 500,
        divisor: 100,
        currency_code: "USD",
      },
      total_tax_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "USD",
      },
      total_vat_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "USD",
      },
      discount_amt: {
        amount: 0,
        divisor: 100,
        currency_code: "USD",
      },
      gift_wrap_price: {
        amount: 0,
        divisor: 100,
        currency_code: "USD",
      },
      shipments: [
        {
          receipt_shipping_id: 2001,
          shipment_notification_timestamp: 1672588800,
          carrier_name: "USPS",
          tracking_code: "1Z999AA10123456784",
        },
      ],
      transactions: [
        {
          transaction_id: 3001,
          title: "Camiseta Star Wars",
          description: "Camiseta de Star Wars Talla M",
          seller_user_id: 12345,
          buyer_user_id: 67890,
          create_timestamp: 1672502400,
          created_timestamp: 1672502400,
          paid_timestamp: 1672502400,
          shipped_timestamp: 1672588800,
          quantity: 1,
          listing_image_id: 4001,
          receipt_id: 1001,
          is_digital: false,
          file_data: null,
          listing_id: 5001,
          transaction_type: "sale",
          product_id: 6001,
          sku: "SW-M-001",
          price: {
            amount: 3000,
            divisor: 100,
            currency_code: "USD",
          },
          shipping_cost: {
            amount: 500,
            divisor: 100,
            currency_code: "USD",
          },
          variations: [],
          product_data: [],
          shipping_profile_id: 7001,
          min_processing_days: 1,
          max_processing_days: 3,
          shipping_method: "Standard",
          shipping_upgrade: null,
          expected_ship_date: 1672588800,
          buyer_coupon: 0,
          shop_coupon: 0,
        },
      ],
      refunds: [],
    },
    {
      receipt_id: 1002,
      receipt_type: 0,
      seller_user_id: 12345,
      seller_email: "myshop@example.com",
      buyer_user_id: 11111,
      buyer_email: "anna.schmidt@example.com",
      name: "Anna Schmidt",
      first_line: "Hauptstr. 12",
      second_line: null,
      city: "Berlin",
      state: null,
      zip: "10115",
      status: "paid",
      formatted_address: "Hauptstr. 12, 10115 Berlin",
      country_iso: "DE",
      payment_method: "paypal",
      payment_email: "anna.schmidt@example.com",
      message_from_seller: "Danke für Ihren Einkauf!",
      message_from_buyer: "Bitte so schnell wie möglich versenden.",
      message_from_payment: "Payment received via PayPal",
      is_paid: true,
      is_shipped: true,
      create_timestamp: 1672513200,
      created_timestamp: 1672513200,
      update_timestamp: 1672599600,
      updated_timestamp: 1672599600,
      is_gift: false,
      gift_message: null,
      gift_sender: null,
      grandtotal: {
        amount: 4200,
        divisor: 100,
        currency_code: "EUR",
      },
      subtotal: {
        amount: 3500,
        divisor: 100,
        currency_code: "EUR",
      },
      total_price: {
        amount: 3500,
        divisor: 100,
        currency_code: "EUR",
      },
      total_shipping_cost: {
        amount: 700,
        divisor: 100,
        currency_code: "EUR",
      },
      total_tax_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      total_vat_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      discount_amt: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      gift_wrap_price: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      shipments: [
        {
          receipt_shipping_id: 2002,
          shipment_notification_timestamp: 1672599600,
          carrier_name: "DHL",
          tracking_code: "JD014600004DE",
        },
      ],
      transactions: [
        {
          transaction_id: 3002,
          title: "Camiseta Marvel",
          description: "Camiseta de Marvel Talla L",
          seller_user_id: 12345,
          buyer_user_id: 11111,
          create_timestamp: 1672513200,
          created_timestamp: 1672513200,
          paid_timestamp: 1672513200,
          shipped_timestamp: 1672599600,
          quantity: 1,
          listing_image_id: 4002,
          receipt_id: 1002,
          is_digital: false,
          file_data: null,
          listing_id: 5002,
          transaction_type: "sale",
          product_id: 6002,
          sku: "MARV-L-002",
          price: {
            amount: 3500,
            divisor: 100,
            currency_code: "EUR",
          },
          shipping_cost: {
            amount: 700,
            divisor: 100,
            currency_code: "EUR",
          },
          variations: [],
          product_data: [],
          shipping_profile_id: 7002,
          min_processing_days: 1,
          max_processing_days: 3,
          shipping_method: "Standard",
          shipping_upgrade: null,
          expected_ship_date: 1672599600,
          buyer_coupon: 0,
          shop_coupon: 0,
        },
      ],
      refunds: [],
    },
    {
      receipt_id: 1003,
      receipt_type: 0,
      seller_user_id: 12345,
      seller_email: "myshop@example.com",
      buyer_user_id: 22222,
      buyer_email: "marta.lopez@example.com",
      name: "Marta López",
      first_line: "Calle Mayor 45",
      second_line: "2ºB",
      city: "Madrid",
      state: "Madrid",
      zip: "28013",
      status: "paid",
      formatted_address: "Calle Mayor 45, 2ºB, 28013 Madrid",
      country_iso: "ES",
      payment_method: "credit_card",
      payment_email: "marta.lopez@example.com",
      message_from_seller: "¡Gracias por comprar con nosotros!",
      message_from_buyer: "Me encanta esta camiseta, gracias",
      message_from_payment: "Pago autorizado",
      is_paid: true,
      is_shipped: false,
      create_timestamp: 1672524000,
      created_timestamp: 1672524000,
      update_timestamp: 1672610400,
      updated_timestamp: 1672610400,
      is_gift: false,
      gift_message: null,
      gift_sender: null,
      grandtotal: {
        amount: 3200,
        divisor: 100,
        currency_code: "EUR",
      },
      subtotal: {
        amount: 2800,
        divisor: 100,
        currency_code: "EUR",
      },
      total_price: {
        amount: 2800,
        divisor: 100,
        currency_code: "EUR",
      },
      total_shipping_cost: {
        amount: 400,
        divisor: 100,
        currency_code: "EUR",
      },
      total_tax_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      total_vat_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      discount_amt: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      gift_wrap_price: {
        amount: 0,
        divisor: 100,
        currency_code: "EUR",
      },
      shipments: [],
      transactions: [
        {
          transaction_id: 3003,
          title: "Camiseta Harry Potter",
          description: "Camiseta de Harry Potter Talla S",
          seller_user_id: 12345,
          buyer_user_id: 22222,
          create_timestamp: 1672524000,
          created_timestamp: 1672524000,
          paid_timestamp: 1672524000,
          shipped_timestamp: null,
          quantity: 1,
          listing_image_id: 4003,
          receipt_id: 1003,
          is_digital: false,
          file_data: null,
          listing_id: 5003,
          transaction_type: "sale",
          product_id: 6003,
          sku: "HP-S-003",
          price: {
            amount: 2800,
            divisor: 100,
            currency_code: "EUR",
          },
          shipping_cost: {
            amount: 400,
            divisor: 100,
            currency_code: "EUR",
          },
          variations: [],
          product_data: [],
          shipping_profile_id: 7003,
          min_processing_days: 1,
          max_processing_days: 3,
          shipping_method: "Envío estándar",
          shipping_upgrade: null,
          expected_ship_date: null,
          buyer_coupon: 0,
          shop_coupon: 0,
        },
      ],
      refunds: [],
    },
    {
      receipt_id: 1004,
      receipt_type: 0,
      seller_user_id: 12345,
      seller_email: "myshop@example.com",
      buyer_user_id: 33333,
      buyer_email: "pedro.martinez@example.com",
      name: "Pedro Martínez",
      first_line: "Av. de la Reforma 210",
      second_line: null,
      city: "Ciudad de México",
      state: "CDMX",
      zip: "06000",
      status: "paid",
      formatted_address: "Av. de la Reforma 210, 06000 CDMX",
      country_iso: "MX",
      payment_method: "paypal",
      payment_email: "pedro.martinez@example.com",
      message_from_seller: "¡Gracias por tu compra!",
      message_from_buyer: "¿Podrían enviarla como regalo?",
      message_from_payment: "Pago completado vía PayPal",
      is_paid: true,
      is_shipped: false,
      create_timestamp: 1672534800,
      created_timestamp: 1672534800,
      update_timestamp: 1672621200,
      updated_timestamp: 1672621200,
      is_gift: false,
      gift_message: null,
      gift_sender: null,
      grandtotal: {
        amount: 4500,
        divisor: 100,
        currency_code: "MXN",
      },
      subtotal: {
        amount: 4000,
        divisor: 100,
        currency_code: "MXN",
      },
      total_price: {
        amount: 4000,
        divisor: 100,
        currency_code: "MXN",
      },
      total_shipping_cost: {
        amount: 500,
        divisor: 100,
        currency_code: "MXN",
      },
      total_tax_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "MXN",
      },
      total_vat_cost: {
        amount: 0,
        divisor: 100,
        currency_code: "MXN",
      },
      discount_amt: {
        amount: 0,
        divisor: 100,
        currency_code: "MXN",
      },
      gift_wrap_price: {
        amount: 0,
        divisor: 100,
        currency_code: "MXN",
      },
      shipments: [],
      transactions: [
        {
          transaction_id: 3004,
          title: "Camiseta El Señor de los Anillos",
          description: "Camiseta de El Señor de los Anillos Talla XL",
          seller_user_id: 12345,
          buyer_user_id: 33333,
          create_timestamp: 1672534800,
          created_timestamp: 1672534800,
          paid_timestamp: 1672534800,
          shipped_timestamp: null,
          quantity: 1,
          listing_image_id: 4004,
          receipt_id: 1004,
          is_digital: false,
          file_data: null,
          listing_id: 5004,
          transaction_type: "sale",
          product_id: 6004,
          sku: "LOTR-XL-004",
          price: {
            amount: 4000,
            divisor: 100,
            currency_code: "MXN",
          },
          shipping_cost: {
            amount: 500,
            divisor: 100,
            currency_code: "MXN",
          },
          variations: [],
          product_data: [],
          shipping_profile_id: 7004,
          min_processing_days: 1,
          max_processing_days: 3,
          shipping_method: "Envío estándar",
          shipping_upgrade: null,
          expected_ship_date: null,
          buyer_coupon: 0,
          shop_coupon: 0,
        },
      ],
      refunds: [],
    },
  ],
};

// ======================================================================
// 2. getLastSyncTime: Lee la última sincronización en Supabase
// ======================================================================
async function getLastSyncTime() {
  try {
    const { data, error } = await supabase
      .from("MarketplaceAccounts")
      .select("last_sync")
      .eq("marketplace", "Etsy")
      .single();

    if (error) {
      console.error("❌ Error obteniendo last_sync:", error);
      return null;
    }
    return data?.last_sync;
  } catch (err) {
    console.error("❌ Error general en getLastSyncTime:", err);
    return null;
  }
}

// ======================================================================
// 3. syncOrdersWithEtsy: Sincroniza pedidos (mock o API real) y guarda en Supabase
// ======================================================================
async function syncOrdersWithEtsy(useMock = false) {
  try {
    let newOrders = [];

    if (useMock) {
      console.log("⚠ Usando MOCK data (no se llama a la API real)");
      newOrders = mockReceiptsData.results;
    } else {
      const lastSyncTime = await getLastSyncTime();
      const etsyApiUrl = "https://api.etsy.com/v3/application/receipts";

      const params = lastSyncTime
        ? { min_created_timestamp: Math.floor(new Date(lastSyncTime).getTime() / 1000) }
        : {};

      const response = await axios.get(etsyApiUrl, {
        headers: { Authorization: `Bearer ${process.env.ETSY_API_KEY}` },
        params,
      });
      newOrders = response.data.results;
    }

    if (!Array.isArray(newOrders) || newOrders.length === 0) {
      console.log("✅ No hay pedidos nuevos.");
      return;
    }

    // Insertar pedidos en Supabase
    const { data, error } = await supabase.from("orders").insert(
      newOrders.map((order) => ({
        marketplace_order_id: order.receipt_id,
        store_id: "d3269a06-1bff-4b3c-8754-e5f803101757", // Ajusta con tu store_id real
        order_date: new Date(order.create_timestamp * 1000).toISOString(),
        status: order.status,
        total_amount: order.total_price?.amount / order.total_price?.divisor || 0,
        payment_method: order.payment_method,
        buyer_info: JSON.stringify({
          name: order.name,
          email: order.buyer_email,
          address: order.formatted_address,
        }),
        currency_code: order.total_price?.currency_code || "EUR",
        is_shipped: !!order.is_shipped,
        updated_at: new Date(order.update_timestamp * 1000).toISOString(),
      }))
    );

    if (error) {
      console.error("❌ Error insertando pedidos en Supabase:", error);
      console.error("🔍 Error Message:", error.message || "No message");
      console.error("📌 Error Details:", error.details || "No details");
      console.error("💡 Error Hint:", error.hint || "No hint");
    }

    console.log(`✅ Insertados ${newOrders.length} pedidos en Supabase`);

    // Cachear en Redis
    await redisClient.set(CACHE_KEY, JSON.stringify(newOrders), { EX: CACHE_TTL });
    console.log("✅ Pedidos cacheados en Redis");

    // Actualizar la última sincronización
    await supabase
      .from("MarketplaceAccounts")
      .update({ last_sync: new Date().toISOString() })
      .eq("marketplace", "Etsy");
  } catch (error) {
    console.error("❌ Error en syncOrdersWithEtsy:", error);
  }
}

// ======================================================================
// 4. getEtsyData: Obtiene pedidos desde Supabase (o Redis si está cacheado)
//    Devuelve { rawData, stats } para que tu etsyRoutes.js no cambie
// ======================================================================
async function getEtsyData(shopId, params, token, useMock = false) {
  try {
    // 1) Si useMock es true, devolvemos directamente el mock (con su count/results)
    if (useMock) {
      console.log("⚠ Devolviendo mockReceiptsData tal cual.");
      return {
        rawData: mockReceiptsData, // { count, results: [...] }
        stats: parseStatsFromReceipts(mockReceiptsData.results),
      };
    }

    // 2) Revisar caché en Redis
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log("✅ Datos obtenidos desde Redis");
      const ordersArr = JSON.parse(cachedData);
      return {
        rawData: convertOrdersToLegacy(ordersArr),
        stats: parseStatsFromReceipts(ordersArr),
      };
    }

    // 3) Si no hay caché => obtener desde Supabase
    const { data: orders, error } = await supabase
      .from("Orders")
      .select("*")
      .order("order_date", { ascending: false });

    if (error) {
      console.error("❌ Error obteniendo pedidos desde Supabase:", error);
      return {
        rawData: { count: 0, results: [] },
        stats: { totalSales: 0, totalOrders: 0, markers: [] },
      };
    }

    // 4) Guardar en Redis
    await redisClient.set(CACHE_KEY, JSON.stringify(orders), { EX: CACHE_TTL });

    // 5) Convertir a la forma "legacy" con count/results
    return {
      rawData: convertOrdersToLegacy(orders),
      stats: parseStatsFromReceipts(orders),
    };
  } catch (error) {
    console.error("❌ Error en getEtsyData:", error);
    return {
      rawData: { count: 0, results: [] },
      stats: { totalSales: 0, totalOrders: 0, markers: [] },
    };
  }
}

// ======================================================================
// 5. aggregateSalesByDay: Recibe un objeto con rawData { count, results }
//    en tu etsyRoutes.js, le pasas data.rawData
// ======================================================================
function aggregateSalesByDay(rawData) {
  const results = rawData?.results || [];
  const salesMap = new Map();

  results.forEach((receipt) => {
    // Convierto create_timestamp en YYYY-MM-DD
    const ts = receipt.create_timestamp || 0;
    const dateObj = new Date(ts * 1000);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // Calculo la venta total de este recibo
    const amount = receipt.total_price?.amount || 0;
    const divisor = receipt.total_price?.divisor || 100;
    const total = amount / divisor;

    const prev = salesMap.get(dateStr) || 0;
    salesMap.set(dateStr, prev + total);
  });

  return Array.from(salesMap.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
}

// ======================================================================
// 6. Funciones internas para "stats" y conversión a legacy
// ======================================================================

// parseStatsFromReceipts: calcula totalSales, totalOrders y markers vacíos
function parseStatsFromReceipts(receipts) {
  let totalSales = 0;
  let totalOrders = receipts.length;

  receipts.forEach((r) => {
    // sumo total_price
    const price = r.total_price?.amount || r.total_amount * 100; // fallback
    const div = r.total_price?.divisor || 100;
    totalSales += price / div;
  });

  // Podrías agregar country_iso => markers si quieres
  return {
    totalSales,
    totalOrders,
    markers: [],
  };
}

// convertOrdersToLegacy: produce { count, results: [...] } con el shape de un "receipt"
function convertOrdersToLegacy(ordersArr) {
  // Creamos un array "results" con shape similar a mock
  const results = ordersArr.map((o) => {
    const createTs = new Date(o.order_date).getTime() / 1000; // supabase => epoch
    const updateTs = new Date(o.updated_at).getTime() / 1000;

    return {
      receipt_id: o.marketplace_order_id,
      name: JSON.parse(o.buyer_info)?.name || "",
      buyer_email: JSON.parse(o.buyer_info)?.email || "",
      create_timestamp: createTs,
      update_timestamp: updateTs,
      total_price: {
        amount: Math.round(o.total_amount * 100),
        divisor: 100,
        currency_code: o.currency_code || "USD",
      },
      payment_method: o.payment_method || "credit_card",
      formatted_address: JSON.parse(o.buyer_info)?.address || "",
      status: o.status,
      is_shipped: o.is_shipped,
      // No tenemos transacciones en Supabase, lo dejamos vacío
      transactions: [],
    };
  });

  return {
    count: results.length,
    results,
  };
}

// ======================================================================
// 7. Exportar todo
// ======================================================================
export { mockReceiptsData, getLastSyncTime, syncOrdersWithEtsy, getEtsyData, aggregateSalesByDay };
