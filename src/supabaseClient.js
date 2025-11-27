import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para upload de imagens
export async function uploadImageToSupabase(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("pets")
    .upload(fileName, file);

  if (error) {
    console.error("Erro ao fazer upload:", error);
    return null;
  }

  // Pega a URL pública
  const { data: publicUrl } = supabase.storage
    .from("pets")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}
