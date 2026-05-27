'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowLeftRight,
  LayoutDashboard,
  LogOut,
  User,
} from 'lucide-react'
import { AppLogo } from '@/components/logo'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transações', icon: ArrowLeftRight },
]

interface NavbarProps {
  userEmail: string
}

export function Navbar({ userEmail }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Saiu com sucesso.')
    router.push('/login')
    router.refresh()
  }

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex items-center h-14 px-4 md:px-6 gap-4">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <AppLogo size="sm" textClassName="font-bold hidden sm:block" />
        </Link>

        {/* Nav links — desktop: centro | mobile: centro também */}
        <nav className="flex items-center gap-1 mx-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Direita */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Usuário — desktop: nome + email | mobile: só ícone */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex items-center gap-2 rounded-full px-2 md:px-3'
              )}
            >
              <User className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline text-sm max-w-[180px] truncate">{userEmail}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <LogOut className="h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
