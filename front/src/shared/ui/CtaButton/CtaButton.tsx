import { type FunctionComponent, type SVGProps, type PropsWithChildren, type MouseEvent } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { twMerge } from 'tailwind-merge';

interface CtaButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  onClick?: (e: MouseEvent) => void
  className?: string
  disabled?: boolean
}

export const CtaButton = ({ Icon, onClick, className, disabled, children }: PropsWithChildren<CtaButtonProps>) => (
  <Button
    onClick={onClick}
    variant="primary"
    size="md"
    disabled={disabled}
    className={twMerge('inline-flex items-center gap-2', className)}
  >
    <Icon className="w-5 h-5 shrink-0" />
    {children}
  </Button>
)
