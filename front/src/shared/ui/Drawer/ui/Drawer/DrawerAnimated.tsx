import { useSpring, config, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { memo, type PropsWithChildren, useCallback, type ComponentType, type HTMLAttributes } from 'react'
import cls from './Drawer.module.css'
import classnames from 'classnames'
import { Overlay } from '../../../Overlay/Overlay.tsx'
import { Portal } from '../../../Portal/Portal.tsx'

type SpringDivProps = PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, 'style'> & { style?: Record<string, unknown> }>;
const SpringDiv = animated.div as ComponentType<SpringDivProps>;

interface DrawerProps {
  className?: string
  onClose?: () => void
}

const dvhSupported = typeof CSS !== 'undefined' && CSS.supports('height', '1dvh')
const vhUnit = dvhSupported ? '100dvh' : '100vh'

const DrawerAnimated = memo(({ className, onClose, children }: PropsWithChildren<DrawerProps>) => {
  // Capture at mount (not module load) so it reflects the actual viewport when drawer opens
  const height = window.innerHeight - 100

  // Spring starts at open position: this component only mounts when isOpen=true
  const [{ y, bgOpacity }, api] = useSpring(() => ({ y: 0, bgOpacity: 1 }))

  const openDrawer = useCallback(() => {
    api.start({ y: 0, bgOpacity: 1, immediate: false })
  }, [api])

  const close = (velocity = 0) => {
    api.start({
      y: height,
      bgOpacity: 0,
      immediate: false,
      config: { ...config.stiff, velocity, precision: 0.0001 },
      onResolve: onClose,
    })
  }

  const bind = useDrag(
    state => {
      const { last, velocity: [, vy], direction: [, dy], movement: [, my], cancel } = state
      if (my > 70) cancel()

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close()
        } else {
          openDrawer()
        }
      } else {
        api.start({ y: my, immediate: true })
      }
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  )

  return (
    <Portal>
      <SpringDiv
        style={{ opacity: bgOpacity }}
        className={classnames(cls.drawer, cls.opened, className, 'app_drawer')}
      >
        <Overlay onClick={() => close()} />
        <SpringDiv
          className={cls.sheet}
          style={{ bottom: `calc(-${vhUnit} + ${height - 100}px)`, y }}
          {...bind()}
        >
          <div className={cls.handle} />
          {children}
        </SpringDiv>
      </SpringDiv>
    </Portal>
  )
})

export default DrawerAnimated
