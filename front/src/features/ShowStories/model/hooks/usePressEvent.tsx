import { useRef } from 'react';

const DELAY = 150 // 150–200 мс — комфортна затримка
export const usePressEvent = ({ onPress }: { onPress?: () => void }) => {
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);

  const handleMouseDown = () => {
    isHolding.current = true;

    // delay (to distinguish from click)
    holdTimeout.current = setTimeout(() => {
      if (isHolding.current) {
        onPress?.()
      }
    }, DELAY);
  };

  const handleMouseUp = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);

    if (isHolding.current) {
      isHolding.current = false;
    }
  };

  return {
    isPress: isHolding.current,
    handleMouseDown,
    handleMouseUp
  }
}