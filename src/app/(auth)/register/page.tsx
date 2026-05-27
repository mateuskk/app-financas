'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthDarkPanel } from '@/components/auth-dark-panel'
import { TrendingUp, Eye, EyeOff, MailCheck } from 'lucide-react'
import { toast } from 'sonner'

function translateError(message: string): string {
  if (message.toLowerCase().includes('rate limit')) {
    return 'Muitas tentativas de cadastro. Aguarde alguns minutos e tente novamente.'
  }
  if (message.toLowerCase().includes('already registered')) {
    return 'Este e-mail já está cadastrado. Tente fazer login.'
  }
  return 'Ocorreu um erro ao criar sua conta. Tente novamente.'
}

export default function RegisterPage() {
  const [loading, setLoading]         = useState(false)
  const [sentTo, setSentTo]           = useState<string | null>(null)
  const [showPassword, setShowPassword]       = useState(false)
  const [showConfirm, setShowConfirm]         = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form     = new FormData(e.currentTarget)
    const email    = form.get('email')    as string
    const password = form.get('password') as string
    const confirm  = form.get('confirm')  as string

    if (password !== confirm) {
      toast.error('As senhas não coincidem.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm` },
    })

    if (error) {
      toast.error(translateError(error.message))
      setLoading(false)
      return
    }

    setSentTo(email)
  }

  /* ── Tela de confirmação de e-mail ─────────────────────── */
  if (sentTo) {
    return (
      <div className="h-screen flex overflow-hidden">
        <AuthDarkPanel />
        <div className="flex-1 h-full flex flex-col justify-center items-center px-8 md:px-14 py-12 bg-white overflow-y-auto">
          <div className="w-full max-w-sm text-center">
            <div className="flex justify-center mb-5">
              <div className="bg-emerald-100 rounded-full p-5">
                <MailCheck className="h-9 w-9 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Verifique seu e-mail</h1>
            <p className="text-sm text-slate-500 mb-1">
              Enviamos um link de confirmação para:
            </p>
            <p className="font-semibold text-slate-800 mb-5 break-all">{sentTo}</p>
            <p className="text-xs text-slate-400 mb-7">
              Clique no link do e-mail para ativar sua conta. Verifique também a pasta de spam.
            </p>
            <Link
              href="/login"
              className="text-sm text-primary font-semibold hover:underline underline-offset-4"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Formulário de cadastro ─────────────────────────────── */
  return (
    <div className="min-h-screen flex">
      <AuthDarkPanel />

      {/* Right — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-14 py-12 bg-white">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="bg-primary rounded-2xl p-3.5 shadow-lg shadow-primary/30">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">Meu Financeiro</span>
          </div>

          <h1 className="text-xl font-bold text-slate-800 mb-0.5 text-center">Crie sua conta</h1>
          <p className="text-sm text-slate-400 mb-6 text-center">
            Comece a controlar suas finanças hoje
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* E-mail */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-600 text-sm font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                required
                autoComplete="email"
                className="h-10"
              />
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-slate-600 text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-slate-600 text-sm font-medium">
                Confirmar senha
              </Label>
              <div className="relative">
                <Input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full font-semibold h-10"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Entrar
            </Link>
          </p>

          <p className="mt-10 text-center text-xs text-slate-300">
            Meu Financeiro © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
