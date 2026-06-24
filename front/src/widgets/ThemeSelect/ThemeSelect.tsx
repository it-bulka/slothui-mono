import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography/Typography';
import { ThemeOption } from './ThemeOption.tsx';
import { useTheme } from '@/shared/hooks';
import { twMerge } from 'tailwind-merge';
import SunSvg from "@/shared/assets/images/theme/sun.svg?react"
import MoonSvg from "@/shared/assets/images/theme/moon.svg?react"
import type { Theme } from '@/shared/hooks';

const options = [
  { value: 'light' as Theme, label: <ThemeOption title="Light" Icon={SunSvg} className="text-amber-400"/> },
  { value: 'dark'  as Theme, label: <ThemeOption title="Dark"  Icon={MoonSvg} className="text-dark"/> },
]

export const ThemeSelect = memo(() => {
  const { theme, changeTheme } = useTheme()

  return (
    <div>
      <Typography bold className="mb-3">Theme</Typography>
      <div className="grid grid-cols-2 gap-3">
        {options.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => changeTheme(value)}
            className={twMerge(
              'flex items-center justify-center gap-2 p-4 rounded-[1.25rem] border-2 transition-all cursor-pointer',
              theme === value
                ? 'border-blue-b1 bg-blue-b4'
                : 'border-gray-g3 bg-light-l2 hover:border-blue-b2'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
})

ThemeSelect.displayName = 'ThemeSelect'
