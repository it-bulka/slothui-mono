import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/config/redux';
import { fetchPollDetailsThunk } from '@/entities/Poll/model/thunk';
import {
  selectPollOptions,
  selectPollAnonymous,
  selectPollLoading,
  selectPollQuestion,
  selectPollUserVote
} from '@/entities/Poll/model/selectors/pollSelectors.ts';
import { Modal } from '@/shared/ui/Modal';
import { Card } from '@/shared/ui/Card/Card';
import { ActionButton } from '@/shared/ui/ActionButton';
import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { PollMeta } from '../common/PollMeta.tsx';
import { PollResultFull } from './PollResultFull.tsx';
import { PollResultSkeleton } from './PollResultSkeleton.tsx';
import CloseImg from '@/shared/assets/images/actions/close.svg?react';
import cls from './PollResultModal.module.css';

type Props = {
  onClose: () => void
  isOpen: boolean
  pollId: string
}

export const PollResultModal = ({ pollId, isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch()

  const options = useAppSelector((s) => selectPollOptions(s, pollId))
  const anonymous = useAppSelector((s) => selectPollAnonymous(s, pollId))
  const loading = useAppSelector((s) => selectPollLoading(s, pollId))
  const question = useAppSelector((s) => selectPollQuestion(s, pollId))
  const userVote = useAppSelector((s) => selectPollUserVote(s, pollId))

  const totalVotes = useMemo(
    () => options.reduce((sum, a) => sum + a.votes, 0),
    [options]
  )

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchPollDetailsThunk(pollId))
    }
  }, [isOpen, pollId, dispatch])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card max>
        <Card.Header className={cls.header}>
          <div className={cls.headerInfo}>
            <Typography bold type={TypographyTypes.BLOCK_TITLE} variant="h2" className="text-sm">
              {question || 'Poll Results'}
            </Typography>
            {!loading && <PollMeta totalVotes={totalVotes} />}
          </div>
          <ActionButton Icon={CloseImg} onClick={onClose} aria-label="Close poll results" />
        </Card.Header>

        <Card.Body>
          {loading && <PollResultSkeleton />}

          {!loading && (
            <PollResultFull
              options={options}
              anonymous={anonymous}
              pollId={pollId}
              userVote={userVote}
            />
          )}
        </Card.Body>
      </Card>
    </Modal>
  )
}
