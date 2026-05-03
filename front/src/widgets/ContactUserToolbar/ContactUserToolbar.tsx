import { useCallback, memo } from 'react';
import { Button } from '@/shared/ui';
import ArrowSvg from '@/shared/assets/images/general/arrow-right.svg?react'
import { twMerge } from 'tailwind-merge';

interface ContactUserToolbarProps {
  className?: string;
}

export const ContactUserToolbar = memo(({ className }: ContactUserToolbarProps) => {
  const onClick = useCallback(() => {

  }, [])

  return (
    <div className={twMerge("border-style-b px-main py-5 flex flex-wrap justify-end", className)}>
      <Button size="md" variant="primary" className={"flex items-center gap-[10px]"} onClick={onClick}>
        <span>Message</span>
        <ArrowSvg />
      </Button>
    </div>
  )
})

ContactUserToolbar.displayName = "ContactUserToolbar"