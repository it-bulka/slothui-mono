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
    <Card max={max}>
      <Card.Header className="flex">
        <Typography className="grow" bold type={TypographyTypes.BLOCK_TITLE}>{title}</Typography>
        <CloseButton onClick={close} />
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  )
}