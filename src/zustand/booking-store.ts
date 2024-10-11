import { BookingItem } from '@/types'
import { addDays, differenceInDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

type BookingStore = {
  bookingItem: BookingItem
  bookingList: BookingItem[]

  setBookingItem: (
    propertyId: string,
    price: number,
    cleaningFee: number,
    serviceFee: number,
    tax: number,
    dateRange?: DateRange
  ) => void
  setBookingList: (bookingList: BookingItem[]) => void
  resetDateRange: () => void
}

const useBookingStore = create<BookingStore>((set) => ({
  bookingItem: {
    propertyId: '',
    price: 0,
    cleaningFee: 0,
    serviceFee: 0,
    tax: 0,
    totalNights: 0,
    orderTotal: 0,
    dateRange: undefined,
  },
  bookingList: [],

  resetDateRange: () =>
    set((state) => ({
      ...state,
      bookingItem: {
        ...state.bookingItem,
        dateRange: undefined,
      },
    })),
  setBookingItem: (
    propertyId,
    price,
    cleaningFee,
    serviceFee,
    tax,
    dateRange
  ) =>
    set((state) => {
      if (dateRange && dateRange.from && dateRange.to) {
        const totalNights = differenceInDays(dateRange.to!, dateRange.from!)
        const _cleaningFee = cleaningFee * totalNights
        const _serviceFee = serviceFee * totalNights
        const _tax = tax * totalNights
        return {
          ...state,
          bookingItem: {
            dateRange,
            propertyId,
            price,
            cleaningFee: _cleaningFee,
            serviceFee: _serviceFee,
            tax: _tax,
            totalNights,
            orderTotal: totalNights * price + _cleaningFee + _serviceFee + _tax,
          },
        }
      }
      return state
    }),
  setBookingList: (bookingList) =>
    set((state) => {
      return {
        ...state,
        bookingList,
      }
    }),
}))

export const useBookingItem = () =>
  useBookingStore((state) => state.bookingItem)

export const useBookingList = () =>
  useBookingStore((state) => state.bookingList)

export const useSetBookingItem = () =>
  useBookingStore((state) => state.setBookingItem)

export const useSetBookingList = () =>
  useBookingStore((state) => state.setBookingList)

export const useResetDateRange = () =>
  useBookingStore((state) => state.resetDateRange)
