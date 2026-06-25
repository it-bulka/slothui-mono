import LogoSvg from '@/shared/assets/images/logo2.svg?react'

export const Logo = () => {
  return (
    <div className="flex items-center font-extrabold text-3xl">
      <LogoSvg aria-hidden="true" />
      <span>slothui</span>
    </div>
  )
}
