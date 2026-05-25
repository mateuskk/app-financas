const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(
      `Variável de ambiente obrigatória ausente: ${key}\n` +
        "Configure as variáveis no painel da Vercel (Project > Settings > Environment Variables)."
    );
  }
}

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};
