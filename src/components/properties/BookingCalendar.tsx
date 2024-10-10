"use client"
interface Props {}
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

export function BookingCalendar({}: Props) {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={new Date()}
      selected={range}
      onSelect={setRange}
      className="rounded-md border shadow "
    />
  )
}
