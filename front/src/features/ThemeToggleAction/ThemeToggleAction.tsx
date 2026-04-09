import { ActionButton } from '@/shared/ui';
import { useTheme } from '@/shared/hooks';
import SunSvg from '@/shared/assets/images/theme/sun.svg?react';
import MoonSvg from '@/shared/assets/images/theme/moon.svg?react';

export const ThemeToggleAction = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ActionButton
      variant="secondary"
      Icon={theme === 'dark' ? SunSvg : MoonSvg}
      onClick={toggleTheme}
    />
  );
};
