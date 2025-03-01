// backend/services/etsyService.js (CommonJS)

// Requiere redisClient si vas a usar Redis
const redisClient = require("../redisClient.js");

const cachedData = await redisClient.get("algun_key"); // Debería funcionar


// TTL para la caché
const CACHE_KEY = "etsy_data";
const CACHE_TTL = 1800;

// Tu mock
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

/**
 * fetchEtsyReceiptsFromAPI
 * (Comentado o desactivado si aún no tienes acceso real)
 */
// const axios = require("axios");
// async function fetchEtsyReceiptsFromAPI(shopId, params, token) {
//   try {
//     const response = await axios.get(
//       `https://openapi.etsy.com/v3/application/shops/${shopId}/receipts`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // OAuth2
//           // "x-api-key": "TU_API_KEY", // si usas api_key
//         },
//         params,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching receipts from Etsy:", error);
//     throw error;
//   }
// }

/**
 * fetchEtsyReceipts
 * - Usa Redis
 * - Retorna el mock si useMock = true
 * - (Descomentarlo en el futuro para llamar a fetchEtsyReceiptsFromAPI)
 */
async function fetchEtsyReceipts(shopId, params, token, useMock = false) {
  try {
    // 1) Revisar caché
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log("🔹 Retornando datos de Redis Cache");
      return JSON.parse(cachedData);
    }

    // 2) No hay caché => mock o API real
    let data;
    if (useMock) {
      console.log("⚠ Usando MOCK data");
      data = mockReceiptsData;
    } else {
      // data = await fetchEtsyReceiptsFromAPI(shopId, params, token);
      // Por ahora, devuelves mock si no tienes acceso
      data = mockReceiptsData;
    }

    // 3) Guardar en Redis
    await redisClient.set(CACHE_KEY, JSON.stringify(data), { EX: CACHE_TTL });

    return data;
  } catch (error) {
    console.error("Error in fetchEtsyReceipts:", error);
    throw error;
  }
}

/**
 * getEtsyData
 * Función de alto nivel que llama a fetchEtsyReceipts con o sin mock
 */
async function getEtsyData(shopId, params, token, useMock = false) {
  return await fetchEtsyReceipts(shopId, params, token, useMock);
}

/**
 * parseReceiptsData
 * (Opcional) Calcula totalSales, totalOrders, markers...
 */
function parseReceiptsData(receiptsData) {
  const { count = 0, results = [] } = receiptsData;
  let totalSales = 0;
  let totalOrders = count;
  const countryMap = new Map();

  const countryCoords = {
    US: [37.09, -95.71],
    DE: [51.16, 10.45],
    ES: [40.42, -3.7],
    MX: [23.63, -102.55],
  };

  results.forEach((receipt) => {
    let sumReceipt = 0;
    if (Array.isArray(receipt.transactions)) {
      receipt.transactions.forEach((trans) => {
        const { amount = 0, divisor = 1 } = trans.price || {};
        sumReceipt += amount / divisor;
      });
    }
    totalSales += sumReceipt;

    const iso = receipt.country_iso || "XX";
    const prev = countryMap.get(iso) || { totalAmount: 0, ordersCount: 0 };
    countryMap.set(iso, {
      totalAmount: prev.totalAmount + sumReceipt,
      ordersCount: prev.ordersCount + 1,
    });
  });

  // markers
  const markers = [];
  countryMap.forEach((val, iso) => {
    const coords = countryCoords[iso] || [0, 0];
    markers.push({
      latLng: coords,
      name: `${iso} - Orders: ${val.ordersCount}, Sales: ${val.totalAmount}`,
    });
  });

  return { totalSales, totalOrders, markers };
}

// Exporta todo lo que uses en la ruta
module.exports = {
  getEtsyData,
  parseReceiptsData,
  // fetchEtsyReceiptsFromAPI, // si quieres
  // fetchEtsyReceipts,        // si quieres
};
