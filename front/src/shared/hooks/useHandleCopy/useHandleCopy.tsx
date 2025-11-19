import { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useHandleCopy = () => {
  return useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.info('copied')
    })
  }, [])
}