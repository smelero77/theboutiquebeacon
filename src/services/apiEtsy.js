// src/services/apiEtsy.js
import axios from "axios";

/**
 * Llama al endpoint de tu servidor Node para obtener Etsy data.
 */
export async function fetchEtsyData() {
  // Ajusta la URL según tu puerto o dominio
  const response = await axios.get("http://localhost:5000/api/etsy-data");
  return response.data; // Devuelve el JSON recibido
}
