import { RouterProvider } from 'react-router';
import { router } from './config/router/router.tsx';
import { ServiceProvider } from '@/shared/libs/services';
import { useState } from 'react';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/constants';
import { Provider } from 'react-redux';
import { store } from './config/store/config.ts';

export function App() {
  const [token] = useState(
    localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || '',
  );

  if (!token) {
    //return <LoginDialog onLogin={(u) => { localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, u); setToken(u); }} />;
    // TODO: add LoginDialog
    //return <input onSubmit={() => }/>;
  }


  return (
    <Provider store={store}>
      <ServiceProvider token={token}>
        <RouterProvider router={router} />
      </ServiceProvider>
    </Provider>
  )
}

