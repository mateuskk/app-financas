import { TrendingUp } from 'lucide-react'

interface AppLogoProps {
  size?: 'sm' | 'md'
  textClassName?: string
}

export function AppLogo({
  size = 'md',
  textClassName = 'text-xl font-bold text-slate-800 tracking-tight',
}: AppLogoProps) {
  return (
    <>
      <div className={size === 'sm' ? 'bg-primary rounded-lg p-1.5' : 'bg-primary rounded-xl p-2'}>
        <TrendingUp
          className={size === 'sm' ? 'h-4 w-4 text-primary-foreground' : 'h-5 w-5 text-primary-foreground'}
        />
      </div>
      <span className={textClassName}>Meu Financeiro</span>
    </>
  )
}
