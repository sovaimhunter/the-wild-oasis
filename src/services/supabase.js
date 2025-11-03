import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dmfrkmtudnaftelkkyfj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtZnJrbXR1ZG5hZnRlbGtreWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzQxNzUsImV4cCI6MjA3NzMxMDE3NX0.syExx_8Bvqzk0L1T7hbuljG6Xcwy1K0sh1j8D6TIzMQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
