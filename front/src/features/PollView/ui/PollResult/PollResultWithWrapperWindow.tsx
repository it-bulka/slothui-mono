import { PollResulFull } from './PollResulFull.tsx';
import { ActionButton, Card } from '@/shared/ui';
import type { PollFullResult } from '@/features/PollView/model/types';
import CloseImg from '@/shared/assets/images/actions/close.svg?react'
import { Modal } from '@/shared/ui';

type PollResultWrapperProps = PollFullResult & {
  onClose: () => void,
  isOpen: boolean
}

export const PollResultWithWrapperWindow = ({ isOpen, onClose, ...rest }: PollResultWrapperProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card max>
        <Card.Header className="flex sticky top-0 left-0 bg-inherit">
          <ActionButton Icon={CloseImg} onClick={onClose} className="ml-auto"/>
        </Card.Header>
        <Card.Body>
          <PollResulFull {...rest} />
        </Card.Body>
      </Card>
    </Modal>
  )
}