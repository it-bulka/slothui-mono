import { memo } from 'react';
import { DropSelect, Typography } from '@/shared/ui';
import { ThemeOption } from './ThemeOption.tsx';
import { useTheme } from '@/shared/hooks';
import SunSvg from "@/shared/assets/images/theme/sun.svg?react"
import MoonSvg from "@/shared/assets/images/theme/moon.svg?react"
import type { Theme } from '@/shared/hooks';

const options = [
  { value: 'light' as Theme, label: <ThemeOption title="Light" Icon={SunSvg} className="text-amber-400"/> },
  { value: 'dark'  as Theme, label: <ThemeOption title="Dark"  Icon={MoonSvg} className="text-dark"/> },
]

export const ThemeSelect = memo(() => {
  const { theme, changeTheme } = useTheme()

  const currentOption = options.find(o => o.value === theme) ?? options[0]

  const handleChange = (option: typeof options[number] | null) => {
    if (!option) return
    changeTheme(option.value)
  }

  return (
    <>
      <Typography bold>Theme:</Typography>
      <DropSelect options={options} value={currentOption} onChange={handleChange} />
    </>
  )
})

ThemeSelect.displayName = 'ThemeSelect'
