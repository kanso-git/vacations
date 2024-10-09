'use client'
import { useSetSearch } from '@/zustand/search-store'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function NavSearch() {
  const [term, setTerm] = useState('')
  const [dTerm] = useDebounce(term, 100)
  const setSearch = useSetSearch()

  useEffect(() => {
    setSearch(dTerm)
    return () => {
      //
    }
  }, [dTerm, setSearch])

  return (
    <Input
      onChange={(e) => setTerm(e.target.value)}
      type='text'
      placeholder='Find a property...'
      className='max-w-xs dark:bg-muted'
    />
  )
}
