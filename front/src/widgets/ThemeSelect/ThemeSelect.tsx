import { memo, useState } from 'react';
import { DropSelect, Typography } from '@/shared/ui';
import { ThemeOption } from './ThemeOption.tsx';
import SunSvg from "@/shared/assets/images/theme/sun.svg?react"
import MoonSvg from "@/shared/assets/images/theme/moon.svg?react"

const options = [
  { value: 'light', label: <ThemeOption title="Light" Icon={SunSvg} className="text-amber-400"/> },
  { value: 'dark',  label: <ThemeOption title="Dark"  Icon={MoonSvg} className="text-dark"/> },
]

export const ThemeSelect = memo(() => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'light'
  )

  const currentOption = options.find(o => o.value === theme) ?? options[0]

  const handleChange = (option: typeof options[number] | null) => {
    if (!option) return
    setTheme(option.value)
    document.documentElement.setAttribute('data-theme', option.value)
    localStorage.setItem('theme', option.value)
  }

  return (
    <>
      <Typography bold>Theme:</Typography>
      <DropSelect options={options} value={currentOption} onChange={handleChange} />
    </>
  )
})

ThemeSelect.displayName = 'ThemeSelect'
