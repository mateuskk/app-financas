'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AuthDarkPanel } from '@/components/auth-dark-panel'
import { TrendingUp, Eye, EyeOff, Check } from 'lucide-react'
import { toast } from 'sonner'

type Status = 'idle' | 'loading' | 'success'

function validate(email: string, pwd: string) {
  const errors: { email?: string; pwd?: string } = {}
  if (!email) errors.email = 'Informe seu e-mail.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'E-mail inválido.'
  if (!pwd) errors.pwd = 'Informe sua senha.'
  else if (pwd.length < 6) errors.pwd = 'Mínimo de 6 caracteres.'
  return errors
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', height: 46, borderRadius: 10, border: '1px solid #e5e7eb',
  padding: '0 14px', fontSize: 15, fontFamily: 'inherit', color: '#0f172a',
  background: '#fff', outline: 'none', transition: 'border-color .15s, box-shadow .15s',
}

export default function LoginPage() {
  const router    = useRouter()
  const emailRef  = useRef<HTMLInputElement>(null)

  const [email,    setEmail]    = useState('')
  const [pwd,      setPwd]      = useState('')
  const [remember, setRemember] = useState(false)
  const [showPwd,  setShowPwd]  = useState(false)
  const [errors,   setErrors]   = useState<{ email?: string; pwd?: string }>({})
  const [status,   setStatus]   = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(email, pwd)
    setErrors(errs)
    if (errs.email) { emailRef.current?.focus(); return }
    if (errs.pwd)   return

    setStatus('loading')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd })
    if (error) {
      toast.error('E-mail ou senha inválidos.')
      setStatus('idle')
      return
    }
    setStatus('success')
    setTimeout(() => { router.push('/dashboard'); router.refresh() }, 1000)
  }

  if (status === 'success') {
    return (
      <div className="h-screen flex overflow-hidden">
        <AuthDarkPanel />
        <section className="flex-1 h-full flex flex-col items-center justify-center bg-white px-10">
          <div className="auth-pop flex flex-col items-center gap-4 text-center max-w-xs">
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
              <Check size={30} strokeWidth={3} />
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', color: '#0f172a' }}>Bem-vindo de volta!</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Estamos preparando seu painel financeiro…</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <AuthDarkPanel />

      <section className="flex-1 h-full flex flex-col items-center justify-center bg-white px-10 overflow-y-auto">
        <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 22 }}>

          <div style={{ alignSelf: 'center', width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(160deg, #3b82f6, #1d4ed8)', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 12px 24px -8px rgba(37,99,235,.55), inset 0 -2px 0 rgba(0,0,0,.08)' }}>
            <TrendingUp size={26} />
          </div>

          <h1 style={{ textAlign: 'center', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: '4px 0 8px', color: '#0f172a' }}>
            Meu Financeiro
          </h1>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="email" style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>E-mail</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Digite seu e-mail"
                value={email}
                aria-invalid={!!errors.email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })) }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,.12)' }}
                onBlur={(e)  => { e.target.style.borderColor = errors.email ? '#ef4444' : '#e5e7eb'; e.target.style.boxShadow = errors.email ? '0 0 0 4px rgba(239,68,68,.1)' : 'none' }}
                style={{ ...INPUT_STYLE, borderColor: errors.email ? '#ef4444' : '#e5e7eb', boxShadow: errors.email ? '0 0 0 4px rgba(239,68,68,.1)' : 'none' }}
              />
              {errors.email && <span style={{ fontSize: 12.5, color: '#ef4444' }}>{errors.email}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label htmlFor="pwd" style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>Senha</label>
                <Link href="#" style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>Esqueceu a senha?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="pwd"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={pwd}
                  aria-invalid={!!errors.pwd}
                  onChange={(e) => { setPwd(e.target.value); if (errors.pwd) setErrors((p) => ({ ...p, pwd: undefined })) }}
                  onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,.12)' }}
                  onBlur={(e)  => { e.target.style.borderColor = errors.pwd ? '#ef4444' : '#e5e7eb'; e.target.style.boxShadow = errors.pwd ? '0 0 0 4px rgba(239,68,68,.1)' : 'none' }}
                  style={{ ...INPUT_STYLE, paddingRight: 44, borderColor: errors.pwd ? '#ef4444' : '#e5e7eb', boxShadow: errors.pwd ? '0 0 0 4px rgba(239,68,68,.1)' : 'none' }}
                />
                <button
                  type="button"
                  aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPwd((s) => !s)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 30, height: 30, display: 'grid', placeItems: 'center', border: 0, background: 'transparent', color: '#64748b', cursor: 'pointer', borderRadius: 8 }}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.pwd && <span style={{ fontSize: 12.5, color: '#ef4444' }}>{errors.pwd}</span>}
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', fontSize: 14, color: '#334155' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />
                <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${remember ? '#2563eb' : '#cbd5e1'}`, display: 'grid', placeItems: 'center', background: remember ? '#2563eb' : '#fff', transition: 'all .12s' }}>
                  <Check size={11} color="white" strokeWidth={3.5} style={{ opacity: remember ? 1 : 0, transition: 'opacity .12s' }} />
                </div>
              </div>
              Lembrar de mim
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ height: 48, borderRadius: 10, border: 0, background: 'linear-gradient(180deg, #2f6ff5, #2256d6)', color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: status === 'loading' ? 'progress' : 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 20px -6px rgba(37,99,235,.55), inset 0 -2px 0 rgba(0,0,0,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {status === 'loading'
                ? <span className="auth-spin" style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.4)', borderTopColor: '#fff', display: 'inline-block' }} />
                : 'Entrar'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#475569', margin: 0 }}>
            Não tem conta?{' '}
            <Link href="/register" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Cadastre-se</Link>
          </p>
          <p style={{ textAlign: 'center', fontSize: 12.5, color: '#94a3b8', marginTop: 4 }}>
            Meu Financeiro © {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </div>
  )
}
