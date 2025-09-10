import { memo } from 'react';
import { DropSelect, Typography } from '@/shared/ui';
import { ThemeOption } from './ThemeOption.tsx';
import SunSvg from "@/shared/assets/images/theme/sun.svg?react"
import MoonSvg from "@/shared/assets/images/theme/moon.svg?react"

const options = [
  { value: 'light', label: <ThemeOption title="Light" Icon={SunSvg} className="text-amber-400"/> },
  { value: 'dark', label: <ThemeOption title="Dark" Icon={MoonSvg} className="text-dark"/> }
]

export const ThemeSelect = memo(() => {
  return (
    <>
      <Typography bold >Theme:</Typography>
      <DropSelect options={options} defaultValue={options[0]}/>
    </>
  )
})

ThemeSelect.displayName = 'ThemeSelect'