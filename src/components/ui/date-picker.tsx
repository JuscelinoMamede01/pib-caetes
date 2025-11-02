import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  disabled,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      onChange?.(formattedDate)
      setOpen(false)
    }
  }

  const selectedDate = value ? new Date(value) : undefined
  const displayText = selectedDate
    ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal border-2 border-slate-600 bg-slate-800 text-neutral-100 focus:border-slate-500 hover:bg-slate-700",
            !value && "text-neutral-100",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-neutral-100" />
          <span className="text-xs sm:text-sm text-neutral-100">{displayText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-3 bg-slate-800 border-2 border-slate-600 rounded-lg" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={disabled}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}
