'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')} />
    )
  }

  const isDark = resolvedTheme === 'dark'

  function handleToggle() {
    const next = isDark ? 'light' : 'dark'
    if (!document.startViewTransition) {
      setTheme(next)
      return
    }
    document.startViewTransition(() => setTheme(next))
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
