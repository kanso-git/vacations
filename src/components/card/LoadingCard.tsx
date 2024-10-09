import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingCard() {
  return (
    <div className='mt-10 gap-8 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full  border'>
      {[1, 2, 3, 4].map((p) => (
        <SkeletonCard key={p} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div>
      <Skeleton className='h-[300px] rounded-md' />
      <Skeleton className='h-4  mt-2 w-3/4' />
      <Skeleton className='h-4 mt-2 w-1/4' />
    </div>
  )
}
