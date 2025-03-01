const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS (ajusta la configuración según tus necesidades)
app.use(cors());

// Monta las rutas de Etsy
const etsyRoutes = require("./routes/etsyRoutes");
app.use("/api", etsyRoutes);

// Inicia el servidor
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});