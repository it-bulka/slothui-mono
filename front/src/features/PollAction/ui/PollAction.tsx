import { Modal } from '@/shared/ui/Modal/Modal.tsx';
import { Button, Typography, Card, Input } from '@/shared/ui';
import { useState, memo } from 'react';
import DeleteSvg from '@/shared/assets/images/actions/delete.svg?react'
import { TypographyTypes, Toggler, Error } from '@/shared/ui';
import { Controller } from 'react-hook-form';
import { usePollForm } from '@/features/PollAction/model/libs';

export const PollAction = memo(() => {
  const [isOpen, setOpen] = useState(true)
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
  } = usePollForm()

  console.log('answerErr', answerErr)
  return (
    <>
      <Modal isOpen={isOpen}>
        <Card max>
          <Card.Header>
            <div className="flex">
              <Typography className="grow" bold type={TypographyTypes.BLOCK_TITLE}>Create poll</Typography>
              <Button variant="icon" onClick={() => setOpen(false)} className="py-2 px-4 font-bold block">x</Button>
            </div>

          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
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

              <Button className="min-w-[50%] inline-block ml-auto" type="submit">
                Create
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Modal>
    </>
  )
})

PollAction.displayName = 'PollAction';