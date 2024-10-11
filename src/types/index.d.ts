import { ZodIssue } from 'zod'
import { DateRange } from 'react-day-picker'
type ActionSubmissionResult<T> =
  | { status: 'success'; data: Partial<T> }
  | { status: 'error'; errors: string | ZodIssue[] }

export type PropertyCardProps = {
  image: string
  id: string
  name: string
  tagline: string
  country: string
  price: number
}

export type SearchRental = {
  category?: string
  search: string
  orderBy: 'updatedAt' | 'createdAt'
  pageSize: number
  pageNumber: number
  results: number
}

export type BookingItem = {
  dateRange?: DateRange
  price: number
  totalNights: number
  cleaningFee: number
  serviceFee: number
  tax: number
  orderTotal: number
  propertyId: string
}
