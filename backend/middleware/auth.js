import supabase from "../supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

export const requireAuth = async (req, res, next) => {
  try {
    // Obtener el token del header de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No se proporcionó token de autenticación" });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verificar el token con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    // Añadir el usuario a la request para uso posterior
    req.user = user;
    next();
  } catch (error) {
    console.error("Error en autenticación:", error);
    res.status(500).json({ error: "Error en la autenticación" });
  }
}; 