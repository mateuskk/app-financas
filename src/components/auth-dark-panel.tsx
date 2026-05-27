import Image from 'next/image'
import { TrendingUp, BarChart3, LayoutList } from 'lucide-react'

const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`

const WAVE_BACK  = 'M 0 70 C 200 30, 400 110, 600 70 C 800 30, 1000 110, 1200 70 L 1200 140 L 0 140 Z'
const WAVE_FRONT = 'M 0 80 C 150 40, 350 120, 600 80 C 850 40, 1050 120, 1200 80 L 1200 140 L 0 140 Z'

function FeaturePanel() {
  const features = [
    { Icon: TrendingUp, bg: 'rgba(74,222,128,.15)',  color: '#4ade80', title: 'Receitas & Despesas',    desc: 'Monitore entradas e saídas com categorias automáticas e saldo atualizado em tempo real.' },
    { Icon: BarChart3,  bg: 'rgba(147,197,253,.15)', color: '#93c5fd', title: 'Gráficos por Categoria', desc: 'Relatórios visuais interativos que mostram exatamente para onde vai o seu dinheiro.' },
    { Icon: LayoutList, bg: 'rgba(196,181,253,.18)', color: '#c4b5fd', title: 'Histórico Completo',     desc: 'Todas as transações filtradas, ordenadas e acessíveis a qualquer momento.' },
  ]

  return (
    <div style={{
      position: 'absolute',
      right: -18,
      bottom: -18,
      width: '58%',
      borderRadius: 14,
      padding: '14px 16px',
      background: 'linear-gradient(160deg, rgba(20,83,121,.92) 0%, rgba(10,38,68,.95) 100%)',
      boxShadow: '0 24px 50px -18px rgba(0,18,40,.65), 0 8px 20px -8px rgba(0,18,40,.4), inset 0 0 0 1px rgba(255,255,255,.08)',
      color: '#e6f1f9',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 12,
      zIndex: 2,
    }}>
      {features.map(({ Icon, bg, color, title, desc }) => (
        <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: bg, color, flexShrink: 0 }}>
            <Icon size={14} />
          </div>
          <div>
            <div style={{ margin: '0 0 2px', fontSize: 11.5, color: '#fff', fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
            <div style={{ margin: 0, fontSize: 10, lineHeight: 1.4, color: 'rgba(230,241,249,.78)' }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DashboardPreview() {
  return (
    <div
      className="hero-dash-wrap"
      style={{ position: 'relative', width: '100%', maxWidth: 520, aspectRatio: '1291 / 887', willChange: 'transform' }}
    >
      {/* concentric arcs */}
      <svg
        style={{ position: 'absolute', top: -34, right: -18, width: 110, height: 110, opacity: 0.9, zIndex: 3, pointerEvents: 'none' }}
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" strokeDasharray="2 4" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.2" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.2" strokeDasharray="2 4" />
      </svg>

      {/* sparkle */}
      <svg
        style={{ position: 'absolute', bottom: -14, left: -22, width: 70, height: 70, opacity: 0.85, zIndex: 3, pointerEvents: 'none' }}
        viewBox="0 0 80 80"
        aria-hidden="true"
      >
        <g stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <line x1="40" y1="12" x2="40" y2="22" />
          <line x1="40" y1="58" x2="40" y2="68" />
          <line x1="12" y1="40" x2="22" y2="40" />
          <line x1="58" y1="40" x2="68" y2="40" />
          <line x1="22" y1="22" x2="28" y2="28" />
          <line x1="52" y1="52" x2="58" y2="58" />
        </g>
      </svg>

      {/* dashboard screenshot */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: 14, overflow: 'hidden', background: '#fff',
        boxShadow: '0 30px 60px -20px rgba(2,6,23,.45), 0 12px 30px -12px rgba(2,6,23,.35)',
        zIndex: 1,
      }}>
        <Image
          src="/dashboard-preview.png"
          alt="Painel do Meu Financeiro"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top left' }}
          priority
        />
      </div>

      <FeaturePanel />
    </div>
  )
}

export function AuthDarkPanel() {
  return (
    <aside
      className="hidden lg:flex lg:w-[51%] h-screen flex-col relative overflow-hidden"
      style={{
        padding: '36px 40px',
        background: 'linear-gradient(155deg, #1d4ed8 0%, #1e88e5 30%, #1e3a8a 70%, #0b1226 100%)',
        isolation: 'isolate',
      }}
    >
      {/* noise */}
      <div
        style={{ position: 'absolute', inset: 0, backgroundImage: NOISE_URL, mixBlendMode: 'overlay', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }}
        aria-hidden="true"
      />

      {/* breathing vignette */}
      <div
        className="hero-breathe"
        style={{
          position: 'absolute', inset: '-6%',
          background: `
            radial-gradient(55% 50% at 100% 100%, rgba(2,10,28,.55), transparent 70%),
            radial-gradient(50% 45% at 0% 50%, rgba(186,230,253,.18), transparent 70%)
          `,
          pointerEvents: 'none', zIndex: 0, willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* back wave */}
      <div className="hero-waves-back" aria-hidden="true">
        <svg viewBox="0 0 1200 140" preserveAspectRatio="none"><path d={WAVE_BACK} fill="rgba(255,255,255,0.05)" /></svg>
        <svg viewBox="0 0 1200 140" preserveAspectRatio="none"><path d={WAVE_BACK} fill="rgba(255,255,255,0.05)" /></svg>
      </div>

      {/* front wave */}
      <div className="hero-waves-front" aria-hidden="true">
        <svg viewBox="0 0 1200 140" preserveAspectRatio="none"><path d={WAVE_FRONT} fill="rgba(255,255,255,0.08)" /></svg>
        <svg viewBox="0 0 1200 140" preserveAspectRatio="none"><path d={WAVE_FRONT} fill="rgba(255,255,255,0.08)" /></svg>
      </div>

      {/* blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
        <div className="hero-blob-1" style={{ position: 'absolute', width: '55%', aspectRatio: '1', top: '-10%', left: '-10%',  borderRadius: '50%', background: 'radial-gradient(circle, #7dd3fc, transparent 65%)', filter: 'blur(50px)', mixBlendMode: 'screen', opacity: 0.55 }} />
        <div className="hero-blob-2" style={{ position: 'absolute', width: '50%', aspectRatio: '1', top: '30%',  right: '-15%', borderRadius: '50%', background: 'radial-gradient(circle, #38bdf8, transparent 65%)', filter: 'blur(50px)', mixBlendMode: 'screen', opacity: 0.55 }} />
        <div className="hero-blob-3" style={{ position: 'absolute', width: '45%', aspectRatio: '1', top: '15%',  left: '35%',   borderRadius: '50%', background: 'radial-gradient(circle, #bae6fd, transparent 65%)', filter: 'blur(50px)', mixBlendMode: 'screen', opacity: 0.55 }} />
      </div>

      {/* inner */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#fff' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(160deg, #fff 0%, #dbeafe 100%)', color: '#2563eb', display: 'grid', placeItems: 'center', boxShadow: '0 8px 24px rgba(2,6,23,.18), inset 0 -2px 0 rgba(37,99,235,.1)', flexShrink: 0 }}>
            <TrendingUp size={20} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>Meu Financeiro</span>
        </div>

        {/* stack */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 56, padding: '24px 0' }}>
          <DashboardPreview />

          {/* tagline */}
          <div style={{ width: '100%', maxWidth: 520, textAlign: 'center', color: '#fff' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Sua vida financeira, com clareza.
            </h2>
            <p style={{ margin: '0 auto', maxWidth: 420, fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,.72)' }}>
              Receitas, despesas e investimentos em um só painel — para você decidir com confiança.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
