import { useMemo } from 'react';
import classnames from 'classnames';

interface StoryProgressProps {
  amount: number
  activeIndex: number
}
export const StoryProgress = ({ amount, activeIndex }: StoryProgressProps) => {
  const arr = useMemo(() => {
    return Array.from({ length: amount }).map((_, i) => i)
  }, [amount])
  if(amount <= 1 || amount >= 20) return null;

  return (
    <div className="flex gap-0.5 absolute w-full top-0 left-0">
      {arr.map((_, i) => (
        <div className={classnames('bg-blue-b3 rounded-2xl h-1.5 grow', { 'bg-progress-gradient': i === activeIndex })} key={i}/>
      ))}
    </div>
  )
}