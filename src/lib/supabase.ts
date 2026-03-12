import { createClient } from "@supabase/supabase-js";

// Server-side client with service role for admin operations
export function createServiceClient() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
}
