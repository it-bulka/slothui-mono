import { twMerge } from 'tailwind-merge'

interface DividerProps {
  className?: string
}
export const Divider = ({ className }: DividerProps) => {
  return <div className={twMerge('w-full h-[1px] bg-gray-g2', className)}/>
}