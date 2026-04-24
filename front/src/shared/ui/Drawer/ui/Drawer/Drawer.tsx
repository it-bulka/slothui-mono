import { lazy, memo, Suspense, type PropsWithChildren } from 'react'
import classnames from 'classnames'
import cls from './Drawer.module.css'
import { Overlay } from '../../../Overlay/Overlay.tsx'
import { Portal } from '../../../Portal/Portal.tsx'

const DrawerAnimated = lazy(() => import('./DrawerAnimated'))

interface DrawerProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

const DrawerFallback = ({ className, onClose, children }: PropsWithChildren<Omit<DrawerProps, 'isOpen'>>) => (
  <Portal>
    <div className={classnames(cls.drawer, cls.opened, className, 'app_drawer')}>
      <Overlay onClick={onClose} />
      <div className={cls.sheet} style={{ bottom: `calc(-100vh + ${window.innerHeight - 200}px)` }}>
        <div className={cls.handle} />
        {children}
      </div>
    </div>
  </Portal>
)

export const Drawer = memo(({ isOpen, ...props }: PropsWithChildren<DrawerProps>) => {
  if (!isOpen) return null
  return (
    <Suspense fallback={<DrawerFallback {...props} />}>
      <DrawerAnimated {...props} />
    </Suspense>
  )
})
