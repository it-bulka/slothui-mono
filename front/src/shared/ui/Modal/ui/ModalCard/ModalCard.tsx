import { Card } from '../../../Card/Card.tsx';
import { CloseButton, Typography, TypographyTypes } from '@/shared/ui';
import type { PropsWithChildren } from 'react';
import { useModalContext } from '../Modal.tsx';

interface ModalCardProps {
  title?: string
  onClose?: () => void
  max?: boolean
}
export const ModalCard = ({
  children,
  title,
  max = true
}: PropsWithChildren<ModalCardProps>) => {
  const { close } = useModalContext();
  return (
    <Card max={max} className="flex flex-col max-h-[90vh] overflow-hidden">
      <Card.Header className="flex shrink-0">
        <Typography className="grow" bold type={TypographyTypes.BLOCK_TITLE}>{title}</Typography>
        <CloseButton onClick={close} />
      </Card.Header>
      <Card.Body className="overflow-y-auto flex-1 scrollbar-themed">
        {children}
      </Card.Body>
    </Card>
  )
}
