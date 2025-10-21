import { memo } from 'react';
import { Outlet } from 'react-router';
import { Logo } from '@/shared/ui';

export const AuthLayout = memo(() => {
  return (
    <main className="min-h-screen bg-gray-g4">
      <Logo />
      <Outlet />
    </main>
  )
})

AuthLayout.displayName = 'AuthLayout'