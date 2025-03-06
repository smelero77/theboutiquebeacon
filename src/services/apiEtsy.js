// src/services/apiEtsy.js
import axios from "axios";

/**
 * Llama al endpoint de tu servidor Node para obtener Etsy data.
 */
export async function fetchEtsyData() {
  const res = await fetch("http://localhost:5000/api/etsy-data");
  if (!res.ok) {
    throw new Error("Error fetching Etsy data");
  }
  return res.json();
}
