'use client'
interface Props {
  propertyId: string
  price: number
}
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { useSetBookingItem } from '@/zustand/booking-store'
import * as actions from '@/actions'

export function BookingCalendar({ propertyId, price }: Props) {
  const setBookingItem = useSetBookingItem()
  const [bookingHistory, setBookingHistory] = React.useState<DateRange[]>([])
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  React.useEffect(() => {
    actions.getBookingHistoryByProperty(propertyId).then(setBookingHistory)
  }, [propertyId])

  React.useEffect(() => {
    setBookingItem(propertyId, price, 5.25, 10, 40, range)
  }, [range, propertyId, price, setBookingItem])

  console.log(`bookingHistory ${JSON.stringify(bookingHistory, null, 3)}`)

  return (
    <Calendar
      mode='range'
      defaultMonth={new Date()}
      selected={range}
      onSelect={setRange}
      disabled={[{ before: new Date() }, ...bookingHistory]}
      className='rounded-md border '
    />
  )
}
