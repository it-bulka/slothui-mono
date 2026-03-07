import { useState, useRef, useCallback } from 'react'

export const useChatScrollState = (msgsLength: number) => {
  const [isAtBottom, setIsAtBottom] = useState(true)
  const initRenderScrollDown = useRef(true)

  const handleBottomChange = useCallback((atBottom: boolean) => {
    if (!msgsLength) return

    if (initRenderScrollDown.current && atBottom) {
      initRenderScrollDown.current = false
      return
    }

    setIsAtBottom(atBottom)
  }, [msgsLength])

  return {
    isAtBottom,
    handleBottomChange,
    initRenderScrollDown
  }
}