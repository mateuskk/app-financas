'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, BarChart3, Shield, FileSpreadsheet, Wallet, PieChart } from 'lucide-react'
import { AppLogo } from '@/components/logo'
import { toast } from 'sonner'

const features = [
  { icon: BarChart3, text: 'Dashboard com gráficos por categoria' },
  { icon: Wallet, text: 'Controle completo de receitas e despesas' },
  { icon: FileSpreadsheet, text: 'Exportação para Excel com formatação' },
  { icon: Shield, text: 'Dados privados e protegidos por RLS' },
]

// Onda vertical em 3 camadas, mesma dinâmica da referência horizontal (mas girada 90°).
// Cada camada é um path sinusoidal com diferente amplitude de x.
// Camada 1 (frente / branco): x oscila entre 8 e 90
// Camada 2 (meio / azul médio): x oscila entre 30 e 90
// Camada 3 (fundo / azul escuro): x oscila entre 52 e 90
// Desenhadas em ordem 3→2→1 (fundo primeiro, frente por cima)
const WAVE_1 = `
  M90,0
  C8,0 8,56 49,56
  C90,56 90,112 49,112
  C8,112 8,168 49,168
  C90,168 90,224 49,224
  C8,224 8,280 49,280
  C90,280 90,336 49,336
  C8,336 8,392 49,392
  C90,392 90,448 49,448
  C8,448 8,504 49,504
  C90,504 90,560 90,560
  L0,560 L0,0 Z
`
const WAVE_2 = `
  M90,0
  C30,0 30,56 60,56
  C90,56 90,112 60,112
  C30,112 30,168 60,168
  C90,168 90,224 60,224
  C30,224 30,280 60,280
  C90,280 90,336 60,336
  C30,336 30,392 60,392
  C90,392 90,448 60,448
  C30,448 30,504 60,504
  C90,504 90,560 90,560
  L0,560 L0,0 Z
`
const WAVE_3 = `
  M90,0
  C52,0 52,56 71,56
  C90,56 90,112 71,112
  C52,112 52,168 71,168
  C90,168 90,224 71,224
  C52,224 52,280 71,280
  C90,280 90,336 71,336
  C52,336 52,392 71,392
  C90,392 90,448 71,448
  C52,448 52,504 71,504
  C90,504 90,560 90,560
  L0,560 L0,0 Z
`

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: form.get('email') as string,
      password: form.get('password') as string,
    })
    if (error) {
      toast.error('Email ou senha inválidos.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, oklch(0.40 0.21 255), oklch(0.22 0.14 265))' }}
    >

      {/* ── Decorações de fundo da página ────────────────────────── */}
      <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.52 0.22 248 / 0.28)' }} />
      <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.44 0.20 268 / 0.35)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.36 0.18 258 / 0.18)' }} />

      <TrendingUp className="absolute top-[8%] left-[7%] w-36 h-36 text-white pointer-events-none"
        style={{ opacity: 0.08, transform: 'rotate(-18deg)' }} />
      <PieChart className="absolute top-[12%] right-[9%] w-28 h-28 text-white pointer-events-none"
        style={{ opacity: 0.08, transform: 'rotate(22deg)' }} />
      <BarChart3 className="absolute bottom-[10%] left-[10%] w-24 h-24 text-white pointer-events-none"
        style={{ opacity: 0.08, transform: 'rotate(8deg)' }} />
      <Wallet className="absolute bottom-[8%] right-[12%] w-20 h-20 text-white pointer-events-none"
        style={{ opacity: 0.08, transform: 'rotate(-12deg)' }} />
      <div className="absolute top-[18%] right-[22%] w-52 h-52 rounded-full border-2 pointer-events-none"
        style={{ borderColor: 'oklch(1 0 0 / 0.07)' }} />
      <div className="absolute bottom-[22%] left-[18%] w-36 h-36 rounded-full border-2 pointer-events-none"
        style={{ borderColor: 'oklch(1 0 0 / 0.07)' }} />

      {/* ── Moldura com borda gradiente (efeito de profundidade 3D) ── */}
      <div
        className="relative z-10 w-full max-w-4xl rounded-3xl p-[1.5px]"
        style={{
          background: 'linear-gradient(145deg, oklch(1 0 0 / 0.30), oklch(1 0 0 / 0.04) 50%, oklch(0 0 0 / 0.10))',
          boxShadow: [
            '0 2px 6px oklch(0.12 0.18 265 / 0.15)',
            '0 10px 28px oklch(0.12 0.18 265 / 0.28)',
            '0 30px 70px oklch(0.12 0.18 265 / 0.45)',
            '0 60px 120px oklch(0.12 0.18 265 / 0.40)',
          ].join(', '),
        }}
      >

        {/* ── Card ────────────────────────────────────────────────── */}
        <div
          className="relative bg-white rounded-3xl overflow-hidden flex"
          style={{ minHeight: '560px' }}
        >
          {/* Vinheta superior interna (profundidade nas bordas) */}
          <div className="absolute inset-x-0 top-0 h-10 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, oklch(0 0 0 / 0.06), transparent)' }} />
          {/* Vinheta inferior interna */}
          <div className="absolute inset-x-0 bottom-0 h-10 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, oklch(0 0 0 / 0.05), transparent)' }} />

          {/* ── Painel esquerdo — branco ────────────────────── */}
          <div className="w-[42%] flex-col justify-between p-10 hidden lg:flex relative z-10">
            <div className="flex items-center gap-2.5">
              <AppLogo textClassName="text-lg font-bold text-slate-800 tracking-tight" />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-[2rem] font-bold text-slate-800 leading-snug">
                  Bem-vindo<br />de volta!
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">
                  Acesse sua conta para acompanhar suas finanças em tempo real.
                </p>
              </div>
              <div className="space-y-3">
                {features.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="shrink-0 bg-primary/10 rounded-lg p-1.5">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-slate-600 text-xs">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-400">© 2026 Meu Financeiro</p>
          </div>

          {/* ── Painel direito — gradiente índigo ────────────── */}
          <div
            className="flex-1 relative flex items-center"
            style={{
              background: 'linear-gradient(145deg, oklch(0.48 0.22 262), oklch(0.30 0.18 265))',
              paddingLeft: '100px',
              paddingRight: '40px',
            }}
          >
            {/* 3 ondas em camadas — fundo primeiro, frente por cima */}
            <svg
              className="absolute left-0 top-0 h-full hidden lg:block pointer-events-none"
              style={{ width: '90px' }}
              viewBox="0 0 90 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Camada 3 — fundo escuro (sombra) */}
              <path d={WAVE_3} fill="oklch(0.34 0.20 263)" />
              {/* Camada 2 — meio (azul médio / ciano) */}
              <path d={WAVE_2} fill="oklch(0.52 0.18 250)" />
              {/* Camada 1 — frente (branco, define a borda real) */}
              <path d={WAVE_1} fill="white" />
            </svg>

            {/* Blobs internos */}
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'oklch(0.60 0.20 240 / 0.28)' }} />
            <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'oklch(0.30 0.16 275 / 0.40)' }} />

            {/* Ícones decorativos do painel */}
            <TrendingUp className="absolute top-6 right-6 h-24 w-24 text-white pointer-events-none"
              style={{ opacity: 0.06 }} />
            <BarChart3 className="absolute bottom-8 right-4 h-16 w-16 text-white pointer-events-none"
              style={{ opacity: 0.06 }} />

            {/* ── Formulário ─────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-xs py-10">

              {/* Mobile: logo */}
              <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
                <div className="rounded-xl p-2" style={{ background: 'oklch(1 0 0 / 0.18)' }}>
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Meu Financeiro</span>
              </div>

              <div className="mb-7">
                <h2 className="text-2xl font-bold text-white tracking-tight">Entrar</h2>
                <p className="text-sm mt-1.5" style={{ color: 'oklch(1 0 0 / 0.60)' }}>
                  Acesse sua conta para gerenciar suas finanças
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium"
                    style={{ color: 'oklch(1 0 0 / 0.75)' }}>
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    autoComplete="email"
                    style={{
                      background: 'oklch(1 0 0 / 0.10)',
                      borderColor: 'oklch(1 0 0 / 0.22)',
                      color: 'white',
                    }}
                    className="placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium"
                    style={{ color: 'oklch(1 0 0 / 0.75)' }}>
                    Senha
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    minLength={6}
                    style={{
                      background: 'oklch(1 0 0 / 0.10)',
                      borderColor: 'oklch(1 0 0 / 0.22)',
                      color: 'white',
                    }}
                    className="placeholder:text-white/35"
                  />
                </div>

                <div className="pt-1">
                  <Button
                    type="submit"
                    className="w-full font-semibold"
                    style={{ background: 'white', color: 'oklch(0.46 0.22 262)' }}
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </div>
              </form>

              <p className="mt-5 text-center text-sm" style={{ color: 'oklch(1 0 0 / 0.55)' }}>
                Não tem conta?{' '}
                <Link href="/register"
                  className="text-white font-semibold hover:underline underline-offset-4">
                  Criar conta grátis
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
