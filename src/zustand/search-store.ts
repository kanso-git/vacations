import { SearchRental } from '@/types'
import { create } from 'zustand'

type SearchStore = {
  sValues: SearchRental
  setCategory: (category?: string) => void
  setSearch: (term: string) => void
  setOrderBy: (orderBy: 'updatedAt' | 'createdAt') => void
  setPageSize: (pageSize: number) => void
  setPageNumber: (pageNumber: number) => void
  setResults: (results: number) => void
  resetValues: () => void
}

const useSearchStore = create<SearchStore>((set) => ({
  sValues: {
    category: undefined,
    search: '',
    orderBy: 'createdAt',
    pageSize: 12,
    pageNumber: 1,
    results: 0,
  },

  resetValues: () =>
    set(() => {
      return {
        sValues: {
          category: undefined,
          search: '',
          orderBy: 'createdAt',
          pageSize: 12,
          pageNumber: 1,
          results: 0,
        },
      }
    }),

  setCategory: (category) =>
    set((state) => {
      const _sValues = { ...state.sValues, category, pageNumber: 1 }
      return { ...state, sValues: _sValues }
    }),

  setSearch: (term) =>
    set((state) => {
      const _sValues = { ...state.sValues, search: term, pageNumber: 1 }
      return { ...state, sValues: _sValues }
    }),

  setOrderBy: (orderBy) =>
    set((state) => {
      const _sValues = { ...state.sValues, orderBy, pageNumber: 1 }
      return { ...state, sValues: _sValues }
    }),
  setPageSize: (pageSize) =>
    set((state) => {
      const _sValues = { ...state.sValues, pageSize, pageNumber: 1 }
      return { ...state, sValues: _sValues }
    }),

  setPageNumber: (pageNumber) =>
    set((state) => {
      const _sValues = { ...state.sValues, pageNumber }
      return { ...state, sValues: _sValues }
    }),

  setResults: (results) =>
    set((state) => {
      const _sValues = { ...state.sValues, results }
      return { ...state, sValues: _sValues }
    }),
}))

export const useSearchValues = () => useSearchStore((state) => state.sValues)
export const useSetSearch = () => useSearchStore((state) => state.setSearch)
export const useSetCategory = () => useSearchStore((state) => state.setCategory)
export const useSetOrderBy = () => useSearchStore((state) => state.setOrderBy)
export const useSetPageSize = () => useSearchStore((state) => state.setPageSize)
export const useSetPageNumber = () =>
  useSearchStore((state) => state.setPageNumber)
export const useSetResults = () => useSearchStore((state) => state.setResults)
export const useResetValues = () => useSearchStore((state) => state.resetValues)
