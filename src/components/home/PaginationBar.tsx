'use client'
import React, { useEffect } from 'react'
import {
  useSearchValues,
  useSetPageNumber,
  useSetPageSize,
  useSetResults,
} from '@/zustand/search-store'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { Button } from '../ui/button'
import clsx from 'clsx'

interface Props {
  results: number
}
export default function PaginationBar({ results }: Props) {
  const setPageSize = useSetPageSize()
  const searchValues = useSearchValues()
  const setPageNumber = useSetPageNumber()
  const setResults = useSetResults()

  const totalPages =
    Math.ceil(searchValues.results / searchValues.pageSize) || 1

  const pageNumbers: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  const maxPageNum = 5 // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2) // Current page should be in the middle if possible

  const activePages = pageNumbers.slice(
    Math.max(0, searchValues.pageNumber - 1 - pageNumLimit),
    Math.min(searchValues.pageNumber - 1 + pageNumLimit + 1, pageNumbers.length)
  )

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={
          searchValues.pageNumber === page ? 'bg-neutral-100 rounded-md' : ''
        }
      >
        <PaginationLink onClick={() => setPageNumber(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ))

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key='ellipsis-start'
          onClick={() => setPageNumber(activePages[0] - 1)}
        />
      )
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key='ellipsis-end'
          onClick={() => setPageNumber(activePages[activePages.length - 1] + 1)}
        />
      )
    }

    return renderedPages
  }

  useEffect(() => {
    setResults(results)
    return () => {}
  }, [results, setResults])

  return (
    <div className={' flex flex-row justify-between  '}>
      <span>{`Showing ${
        searchValues.pageSize * (searchValues.pageNumber - 1) + 1
      } - ${
        searchValues.pageSize * searchValues.pageNumber > searchValues.results
          ? searchValues.results
          : searchValues.pageSize * searchValues.pageNumber
      } of ${searchValues.results} results`}</span>

      {/**
         
        <Pagination
          color="secondary"
          page={searchValues.pageNumber}
          total={Math.ceil(searchValues.results / searchValues.pageSize) || 1}
          onChange={(e) => setPageNumber(e)}
        />

        
         */}
      <div className='gap-1 flex items-center '>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (searchValues.pageNumber > 1) {
                    setPageNumber(searchValues.pageNumber - 1)
                  }
                }}
              />
            </PaginationItem>
            {renderPages()}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (searchValues.pageNumber < totalPages) {
                    setPageNumber(searchValues.pageNumber + 1)
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className='gap-1 flex items-center'>
        <div className=''>Page size:</div>
        {[3, 6, 12].map((p) => (
          <Button
            key={p}
            type='button'
            size='icon'
            className={clsx('w-[36px] h-[36px]')}
            variant={searchValues.pageSize === p ? 'outline' : 'ghost'}
            onClick={() => {
              setPageSize(p)
            }}
          >
            {p}
          </Button>
        ))}
      </div>
    </div>
  )
}
