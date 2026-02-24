import { Outlet } from 'react-router';
import { SocketBootstrap } from '../../sockets/SocketBootstrap.tsx';
import { store } from '../../config/store/config.ts';
import { memo } from 'react';
import { CustomToastContainer } from '@/shared/ui';

export const AppLayout = memo(()=> {
  return (
    <>
      <SocketBootstrap store={store} />
      <Outlet />
      <div id="toast-root">
        <CustomToastContainer />
      </div>
    </>
  );
})