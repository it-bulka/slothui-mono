import { RouterProvider } from 'react-router';
import { router } from '@/app/config/router/router.tsx';

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

