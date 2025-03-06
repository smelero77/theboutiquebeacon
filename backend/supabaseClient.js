import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Las variables de entorno SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son requeridas");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: "public"
  },
  auth: {
    persistSession: false
  },
  // Habilitar logs
  debug: {
    logLevel: "debug",
    // Mostrar consultas SQL
    sqlDebug: true
  }
});

export default supabase;
