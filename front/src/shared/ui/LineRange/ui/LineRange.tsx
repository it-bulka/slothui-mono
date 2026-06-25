import { memo, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const TIMEOUT_MS = 200;
interface LineRangeProps {
  percentage?: number
  className?: string
  barClassName?: string
}

export const LineRange = memo(({ percentage: width = 0, className, barClassName }: LineRangeProps) => {
  const [w, setW] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setW(typeof width !== 'undefined' ? width : 0)
    }, TIMEOUT_MS)
    return () => clearTimeout(timeout)
  }, [setW, width])
  return (
    <div className={twMerge("track relative h-2 rounded-2xl overflow-hidden bg-gray-g2 border border-gray-g1", className)}>
      <div
        className={twMerge("progress absolute top-0 left-0 transition duration-500 w-0 h-full bg-blue-b1", barClassName)}
        style={{ width: `${w}%` }}
      />
    </div>
  )
})

LineRange.displayName = 'LineRange'