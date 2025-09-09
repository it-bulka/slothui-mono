import LogoSvg from '@/shared/assets/images/logo.svg?react'

export const Logo = () => {
  return (
    <div className={'flex items-center font-extrabold text-3xl'}>
      <LogoSvg />
      <p>slothui</p>
    </div>
  )
}