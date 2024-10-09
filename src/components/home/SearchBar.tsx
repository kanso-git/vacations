'use client'

import React, { useEffect, useTransition } from 'react'
import {
  useSearchValues,
  useSetCategory,
  useSetOrderBy,
} from '@/zustand/search-store'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'

import clsx from 'clsx'
import { Card } from '../ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { categories } from '@/utils/categories'

const orderOptions = [
  { key: 'updatedAt', label: 'Last updated' },
  { key: 'createdAt', label: 'Newest' },
]

export default function SearchBarContent() {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()
  const setOrderBy = useSetOrderBy()
  const searchValues = useSearchValues()
  const setCategory = useSetCategory()

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sv = searchValues as any
      Object.keys(sv).forEach((key) => {
        if (key !== 'results') {
          sv[key] && params.set(key, sv[key])
        }
      })
      router.replace(`${pathname}?${params.toString()}`)
    })
    return () => {
      //
    }
  }, [searchValues, router, pathname])

  return (
    <Card className='flex flex-row justify-around items-center  border-none shadow-none'>
      <div className=' flex flex-row gap-2 items-center'>
        <div className=' text-primary font-semibold flex  w-20'>
          Results:
          {isPending ? (
            <FaSpinner className='text-primary' size={20} />
          ) : (
            searchValues.results
          )}
        </div>
      </div>

      <div className=' flex flex-row  mx-10 w-3/4'>
        {categories.map((c) => (
          <div
            key={c.label}
            className='flex flex-col justify-start items-baseline gap-2 space-x-6  cursor-pointer  hover:text-primary '
            onClick={() => {
              if (searchValues.category && searchValues.category === c.label) {
                setCategory(undefined)
              } else {
                setCategory(c.label)
              }
            }}
          >
            <c.icon
              className={clsx(
                'w-8 h-8 ',
                searchValues.category === c.label && 'text-primary'
              )}
            />
            <div
              className={clsx(
                '',
                searchValues.category === c.label && 'text-primary'
              )}
            >
              {c.label}
            </div>
          </div>
        ))}
      </div>

      <div className='w-1/4'>
        <Select value={searchValues.orderBy} onValueChange={setOrderBy}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Order by option' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {orderOptions.map((o) => (
                <SelectItem key={o.key} value={o.key}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
