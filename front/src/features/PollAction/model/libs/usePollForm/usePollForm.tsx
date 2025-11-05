import { useFieldArray, useForm } from 'react-hook-form';
import { useCallback, useMemo, useEffect } from 'react';

type PollActionForm = {
  question: string;
  answers: {value: string}[];
  anonymous: boolean;
  multiple: boolean;
  root: string;
}

const ERRORS_FIELDS = {
  ROOT: 'answers',
} as const
export const usePollForm = ({ limit = 4 }: { limit?: number } = {}) => {
  const {
    handleSubmit, control, watch, setError, getValues, formState: { errors }, clearErrors
  } = useForm<PollActionForm>({
    defaultValues: {
      question: '',
      answers: [{ value: ''}, { value: ''}],
      anonymous: false,
      multiple: false
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers'
  })

  const checkFieldsLimit = useCallback(() => {
    if(fields.length > limit ) {
      setError(ERRORS_FIELDS.ROOT, {
        type: 'manual',
        message: `Max amount of answers could be ${limit}`,
      });

      return true
    }

    return false
  }, [fields, limit, setError])

  const answerErr = errors[ERRORS_FIELDS.ROOT]?.message
  const clearAnswerErr = useCallback(() => {
    if(fields.length <= limit ) {
      clearErrors(ERRORS_FIELDS.ROOT)
    }
  }, [clearErrors, fields.length, limit])
  
  useEffect(() => {
    clearAnswerErr()
  }, [clearAnswerErr])
  const addFieldOnInputChange = useCallback((index: number, value: string) => {
   if(checkFieldsLimit()) return

    if(index === fields.length - 1 && value.trim() !== '') {
      append({ value: ''})
    }
  }, [fields, append, checkFieldsLimit])

  const addField = useCallback(() => {
    append({ value: ''})
  }, [append])

  const onSubmit = handleSubmit((data) => {
    // TODO: add creating poll
    const values = data.answers.map(a => a.value.trim().toLowerCase());
    const hasDuplicates = new Set(values).size !== values.length;

    if (hasDuplicates) {
      setError('answers', {
        type: 'manual',
        message: 'Answers must be unique',
      });
      return;
    }

    const last = values[values.length - 1]
    if(last === '') values.pop()

    console.log('✅ valid poll', data);
  })

  const isNoEmptyInput = useMemo(() => {
    const last = fields.length - 1
    const values = watch('answers')
    const fieldValue = values[last]?.value.trim()
    return fieldValue !== ''
  }, [fields, watch])

  const validateAnswer = useCallback((val: string, index: string | number) => {
    const trimmedValue = val.trim()
    const values = getValues("answers").map(a => a.value.trim().toLowerCase());

    // REQUIRED
    const isLast = values.length - 1 === index;
    const isEmpty = trimmedValue === ''
    const oneElement = values.length === 1
    if (isEmpty && (!isLast || oneElement)) {
      return 'Required'
    }

    // UNIQUE
    const duplicates = values.filter(v => v === val.trim().toLowerCase()  && trimmedValue !== '');
    return duplicates.length > 1 ? "Duplicate answer" : true;
  }, [getValues])

  const validateQuestion = useCallback((val: string) => {
    return val.trim() !== '' || 'Required'
  }, [])

  return {
    isNoEmptyInput,
    append,
    validateAnswer,
    onSubmit,
    addFieldOnInputChange,
    addField,
    remove,
    watch,
    fields,
    control,
    validateQuestion,
    answerErr
  }
}