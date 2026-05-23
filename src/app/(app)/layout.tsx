import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/layout/navbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Navbar userEmail={user.email ?? ''} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        {children}
      </main>
    </div>
  )
}
