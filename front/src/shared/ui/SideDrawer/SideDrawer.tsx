import { memo, type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { Overlay } from '../Overlay/Overlay.tsx';
import { Portal } from '../Portal/Portal.tsx';
import cls from './SideDrawer.module.css';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const SideDrawer = memo(({ isOpen, onClose, children, className }: PropsWithChildren<SideDrawerProps>) => (
  <Portal>
    <div className={classnames(cls.root, { [cls.open]: isOpen }, className)}>
      <Overlay
        onClick={onClose}
        className={classnames(cls.overlay, { [cls.overlayVisible]: isOpen })}
      />
      <aside className={classnames(cls.panel, { [cls.panelOpen]: isOpen })}>
        {children}
      </aside>
    </div>
  </Portal>
));

SideDrawer.displayName = 'SideDrawer';
