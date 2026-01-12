import { memo } from 'react'
import { Skeleton } from '@/shared/ui'

export const StatisticsSkeleton = memo(() => {
  return (
    <div className="flex w-fit mx-auto my-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-2 border-style-r last:border-0 flex flex-col items-center"
        >
          {/* number */}
          <Skeleton
            width={32}
            height={18}
            border="4px"
          />

          {/* label */}
          <Skeleton
            width={56}
            height={14}
            border="4px"
          />
        </div>
      ))}
    </div>
  )
})

StatisticsSkeleton.displayName = 'StatisticsSkeleton'
