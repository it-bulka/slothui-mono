import { memo } from 'react';
import { Outlet } from 'react-router';
import { Logo } from '@/shared/ui/Logo/Logo';

export const AuthLayout = memo(() => {
  return (
    <main className="min-h-screen bg-underground-secondary">
      <Logo />
      <Outlet />
    </main>
  )
})

AuthLayout.displayName = 'AuthLayout'