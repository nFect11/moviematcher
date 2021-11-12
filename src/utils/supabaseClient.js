import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhyyubgwvpmxcfotdkhe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDgyNzg2MywiZXhwIjoxOTUwNDAzODYzfQ.1_WSYnUGYhHPg-m-4_PbZikoLpXF_e4FKXr1_XQasl0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
