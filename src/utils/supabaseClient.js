import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ktbollmonqftedheikbc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgyMjM3MiwiZXhwIjoxOTU5Mzk4MzcyfQ.s5QsTmnmOI_hCK-NYxLIXffLu2gnZ8-p98835xdkZVA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
