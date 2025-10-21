import {
  useCallback, useEffect, useRef, useState
} from 'react'
import { disableBodyScroll, enableBodyScroll } from '@/shared/libs'

/**
 * Custom hook to manage modal open, close, and animation states.
 *
 * @param {Object} UseModalProps - Props for configuring the hook.
 * @param {boolean} [UseModalProps.isOpen=false] - Initial open state of the modal.
 * @param {() => void} [UseModalProps.onClose] - Callback function triggered when
 *   the modal is closed.
 * @param {number} [UseModalProps.animationDelay=300] - Delay in milliseconds for
 *   the close animation.
 *
 * @returns {Object} Hook state and functions.
 * @returns {boolean} isClosing - Indicates whether the modal is in the closing
 *   animation phase.
 * @returns {() => void} closeHandler - Function to handle closing the modal.
 */

interface UseModalProps {
  isOpen?: boolean
  onClose?: () => void
  animationDelay?: number
}

const ANIMATION_DELAY = 300

/**
 * useModal hook to manage modal state and animations.
 *
 * @param {UseModalProps} param - Configuration parameters for the modal.
 */

export const useModal = ({
  onClose, animationDelay = ANIMATION_DELAY, isOpen = false
}: UseModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const closeHandler = useCallback(() => {
    if(onClose) {
      enableBodyScroll()
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [onClose, animationDelay])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  useEffect(() => {
    if(isOpen) {
      disableBodyScroll()
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown, isOpen])

  return { isClosing, closeHandler }
}
