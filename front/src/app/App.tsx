import { RouterProvider } from 'react-router';
import { router } from './config/router/router.tsx';
import { ServiceProvider } from '@/shared/libs/services';
import { Provider } from 'react-redux';
import { store } from './config/store/config.ts';

export function App() {
  return (
    <Provider store={store}>
      <ServiceProvider>
        <RouterProvider router={router} />
      </ServiceProvider>
    </Provider>
  )
}

