import { Button, Typography, Input, ModalCard, Modal } from '@/shared/ui';
import { memo } from 'react';
import DeleteSvg from '@/shared/assets/images/actions/delete.svg?react'
import { Toggler, Error } from '@/shared/ui';
import { Controller } from 'react-hook-form';
import { usePollForm } from '../../model/libs';
import type { PollDraft } from '../../model/types/poll.types.tsx';

interface CreatePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePoll: (poll: PollDraft) => void;
}
export const CreatePollModal = memo(({ isOpen, onClose, onCreatePoll }: CreatePollModalProps) => {
  const {
    onSubmit,
    remove,
    addFieldOnInputChange,
    addField,
    watch,
    validateAnswer,
    control,
    fields,
    validateQuestion,
    isNoEmptyInput,
    answerErr
  } = usePollForm({ onSubmit: onCreatePoll })

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalCard title="Create poll" onClose={onClose}>
          <form onSubmit={onSubmit} className="form-default">
            <Typography>Question</Typography>
            <Controller
              name="question"
              control={control}
              rules={{
                validate: validateQuestion
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  placeholder="Enter question"
                  name={field.name}
                  error={fieldState.error?.message}
                  value={field.value}
                />
              )}
            />
            <Typography>Answers</Typography>
            {fields.map((_, i) => {
              const value = watch(`answers.${i}.value`)
              return (
                <Controller
                  name={`answers.${i}.value`}
                  control={control}
                  rules={{
                    validate: value => validateAnswer(value, i),
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      name={field.name}
                      value={field.value}
                      onChange={val => {
                        field.onChange(val)
                        addFieldOnInputChange(i, value)
                      }}
                      onBlur={field.onBlur}
                      addendum={<DeleteSvg />}
                      onAddendumClick={() => remove(i)}
                      placeholder="+ Add answer"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              )
            })}

            {answerErr && <Error text={answerErr}/>}

            {isNoEmptyInput && !answerErr && (
              <Button
                className="min-w-[50%] inline-block ml-auto"
                onClick={addField}
              >
                + Add answer
              </Button>
            )}

            <Controller
              name='multiple'
              control={control}
              render={({ field }) => (
                <Toggler label='Allow multiple answers' initialState={field.value} onChange={field.onChange} />
              )}
            />

            <Controller
              name='anonymous'
              control={control}
              render={({ field }) => (
                <Toggler label='Anonymous poll' initialState={field.value} onChange={field.onChange} />
              )}
            />

            <Button className="form-btn" type="submit">
              Create
            </Button>
          </form>
        </ModalCard>
      </Modal>
    </>
  )
})

CreatePollModal.displayName = 'PollAction';