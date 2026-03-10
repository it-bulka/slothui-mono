import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/config/redux'
import { fetchPollDetailsThunk } from '@/entities/Poll/model/thunk';
import { selectPollOptions, selectPollAnonymous, selectPollLoading } from '@/entities/Poll/model/selectors/pollSelectors.ts';
import { Modal, Card, ActionButton   } from '@/shared/ui';
import CloseImg from '@/shared/assets/images/actions/close.svg?react'
import { PollResultFull } from './PollResulFull.tsx';

type Props = {
  onClose: () => void,
  isOpen: boolean
  pollId: string
}

export const PollResultModal = ({ pollId, isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch()

  const options = useAppSelector((s) => selectPollOptions(s, pollId))
  const anonymous = useAppSelector((s) => selectPollAnonymous(s, pollId))
  const loading = useAppSelector((s) => selectPollLoading(s, pollId))

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchPollDetailsThunk(pollId))
    }
  }, [isOpen, pollId, dispatch])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card max>
        <Card.Header className="flex sticky top-0 bg-inherit">
          <ActionButton Icon={CloseImg} onClick={onClose} className="ml-auto"/>
        </Card.Header>

        <Card.Body>

          {loading && <div>Loading...</div>}

          {!loading && <PollResultFull options={options} anonymous={anonymous} pollId={pollId}/> }

        </Card.Body>
      </Card>
    </Modal>
  )
}