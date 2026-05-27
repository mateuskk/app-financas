'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MailCheck } from 'lucide-react'
import { AppLogo } from '@/components/logo'
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
  const [loading, setLoading] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string
    const confirm = form.get('confirm') as string

    if (password !== confirm) {
      toast.error('As senhas não coincidem.')
      setLoading(false)
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    })

    if (error) {
      toast.error(translateError(error.message))
      setLoading(false)
      return
    }

    setSentTo(email)
  }

  if (sentTo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
        <div className="flex items-center gap-2.5 mb-8">
          <AppLogo />
        </div>

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-8 border border-slate-200 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 rounded-full p-4">
              <MailCheck className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Verifique seu e-mail</h1>
          <p className="text-sm text-slate-500 mb-1">
            Enviamos um link de confirmação para:
          </p>
          <p className="font-semibold text-slate-800 mb-6 break-all">{sentTo}</p>
          <p className="text-xs text-slate-400 mb-6">
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
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <div className="flex items-center gap-2.5 mb-8">
        <AppLogo />
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-8 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Criar conta</h1>
        <p className="text-sm text-slate-500 mb-6">
          Preencha os dados abaixo para começar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-700 font-semibold">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-slate-700 font-semibold">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              autoComplete="new-password"
              minLength={6}
              className="text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm" className="text-slate-700 font-semibold">Confirmar senha</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              minLength={6}
              className="text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <Button type="submit" className="w-full font-semibold" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-4">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
