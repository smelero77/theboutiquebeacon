// Configuración del entorno
const config = {
  // URL base de la API
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "/api" // En producción usará el proxy configurado
      : "http://localhost:5000/api", // En desarrollo, URL directa
};

export default config;
