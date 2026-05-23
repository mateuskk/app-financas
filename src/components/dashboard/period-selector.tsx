'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getMonthName } from '@/lib/format'

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 3 }, (_, i) => currentYear - i)

export function PeriodSelector({
  month,
  year,
}: {
  month: string
  year: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function update(key: string, value: string | null) {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={month} onValueChange={(v) => update('month', v)}>
        <SelectTrigger className="w-36 bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => {
            const m = String(i + 1).padStart(2, '0')
            return (
              <SelectItem key={m} value={m}>
                {getMonthName(i + 1)}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      <Select value={year} onValueChange={(v) => update('year', v)}>
        <SelectTrigger className="w-24 bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
