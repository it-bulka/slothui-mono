import type { MouseEvent } from 'react';

interface ClickStoryProps {
  isPress?: boolean
  onClick?: () => void
  onRightClick?: () => void
  onLeftClick?: () => void
  onTopClick?: () => void
  onBottomClick?: () => void
}

export const useClickStory = ({
  isPress,
  onClick,
  onRightClick,
  onLeftClick,
  onTopClick,
  onBottomClick,
}: ClickStoryProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isPress) return

    const rect = e.currentTarget.getBoundingClientRect(); // позиція елемента
    const x = e.clientX - rect.left;  // координата кліку всередині елемента по X
    const y = e.clientY - rect.top;   // координата кліку по Y

    const isLeft = x < rect.width / 2;
    const isTop = y < rect.height / 2;

    if (isLeft) {
      onLeftClick?.()
    } else {
      onRightClick?.()
    }

    if (isTop) {
      onTopClick?.()
    } else {
      onBottomClick?.()
    }

    onClick?.()
  }

  return { handleClick }
}