// src/services/auth.js
import axios from "axios";

// Ajusta la URL base a la de tu API de autenticación.
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Función loginUser: envía email y password a la API y retorna la respuesta.
export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response;
};
