'use client'
import { BookingSchema, bookingSchema } from '@/zod-schemas/bookingSchema'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as actions from '@/actions'
import { handleFormServerErrors } from '@/lib/utils'
import SubmitBtn from '@/components/form/SubmitBtn'
import { useRouter } from 'next/navigation'

import { useBookingItem, useResetDateRange } from '@/zustand/booking-store'
import Title from './Title'
import ControllerForm from './reviews/ControllerForm'
import { Separator } from '../ui/separator'

interface Props {
  propertyId: string
}
export default function BookingForm({ propertyId }: Props) {
  const router = useRouter()
  const divRef = useRef<HTMLDivElement>(null)
  const bookingItem = useBookingItem()
  const resetDateRange = useResetDateRange()
  const [isClient, setIsClient] = useState(false)

  const formMethods = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
    defaultValues: {
      propertyId,
      cleaningFee: 5.25,
      serviceFee: 10,
      tax: 40,
    },
  })

  const {
    handleSubmit,
    setError,
    getValues,
    register,
    setValue,

    reset,
    formState: { errors, isValid, isSubmitting },
  } = formMethods

  const onSubmit = async () => {
    const formValues = getValues()
    const r = await actions.createOneBooking(formValues)
    if (r.status === 'error') {
      handleFormServerErrors<BookingSchema>(r.errors, setError)
    } else {
      resetDateRange()
      router.push(`/bookings`)
    }
  }

  useEffect(() => {
    setValue('propertyId', bookingItem.propertyId)
    setValue('cleaningFee', bookingItem.cleaningFee)
    setValue('serviceFee', bookingItem.cleaningFee)
    setValue('tax', bookingItem.tax)
    if (
      bookingItem.dateRange &&
      bookingItem.dateRange.from &&
      bookingItem.dateRange.to
    ) {
      if (divRef.current) divRef.current.style.display = 'block'
      setValue('totalNights', bookingItem.totalNights, {
        shouldValidate: true,
      })
      setValue('orderTotal', bookingItem.orderTotal, {
        shouldValidate: true,
      })
      setValue('checkIn', bookingItem.dateRange.from, {
        shouldValidate: true,
      })
      setValue('checkOut', bookingItem.dateRange.to, {
        shouldValidate: true,
      })
    } else {
      if (divRef.current) divRef.current.style.display = 'none'
    }
  }, [setValue, bookingItem, divRef])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className='mt-8 hidden' ref={divRef}>
      <div className=' py-8 w-full flex flex-col'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='border p-8 rounded-xl shadow-sm w-full '>
            <Title text='Summary' />
            <div className=' mt-8 flex justify-between items-center'>
              <p>
                ${bookingItem.price} x {bookingItem.totalNights} nights
              </p>
              <p>${bookingItem.price * bookingItem.totalNights}</p>
            </div>

            <div className=' mt-4 flex justify-between items-center'>
              <p>Cleaning Fee</p>
              <p>${bookingItem.cleaningFee}</p>
            </div>

            <div className=' mt-4 flex justify-between items-center'>
              <p>Service Fee</p>
              <p>${bookingItem.serviceFee}</p>
            </div>

            <div className=' my-4 flex justify-between items-center'>
              <p>Tax</p>
              <p>${bookingItem.tax}</p>
            </div>

            <Separator />
            <div className=' my-4 flex justify-between items-center font-semibold text-lg'>
              <p>Booking Total</p>
              <p>${bookingItem.orderTotal}</p>
            </div>

            {errors.root?.serverError && (
              <p className='text-danger text-sm'>
                {errors.root.serverError.message}
              </p>
            )}
          </div>
          <div className=' flex flex-row items-center gap-6 mt-10'>
            {isClient && (
              <ControllerForm>
                <SubmitBtn
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  label='Reserve Booking'
                  onActionLabel='Creating...'
                />
              </ControllerForm>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
