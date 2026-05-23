'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, ArrowRight, BarChart3, ShieldCheck, Wallet } from 'lucide-react'
import { toast } from 'sonner'

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
    <div className="min-h-screen flex">
      {/* Painel esquerdo — branding (apenas desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-16 w-[32rem] h-[32rem] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Meu Financeiro</span>
        </div>

        {/* Conteúdo central */}
        <div className="relative space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Controle suas finanças com clareza
            </h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              Registre receitas e despesas, visualize seu saldo e tome decisões financeiras mais inteligentes.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: BarChart3, text: 'Dashboard com resumo mensal' },
              { icon: Wallet, text: 'Controle de receitas e despesas' },
              { icon: ShieldCheck, text: 'Seus dados protegidos com RLS' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="bg-white/15 rounded-lg p-1.5 shrink-0">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/85 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé */}
        <p className="relative text-white/40 text-xs">© 2025 Meu Financeiro</p>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 lg:p-12">
        {/* Logo mobile */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div className="bg-primary rounded-xl p-2">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-primary text-xl font-bold tracking-tight">Meu Financeiro</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Entre com sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                minLength={6}
                className="h-10"
              />
            </div>

            <Button type="submit" className="w-full h-10 font-semibold" disabled={loading}>
              {loading ? 'Entrando...' : (
                <span className="flex items-center gap-2">
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline underline-offset-4">
              Criar conta grátis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
