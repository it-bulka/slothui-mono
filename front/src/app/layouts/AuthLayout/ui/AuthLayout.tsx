import { memo } from 'react';
import { Outlet } from 'react-router';
import { Logo } from '@/shared/ui/Logo/Logo';

export const AuthLayout = memo(() => {
  return (
    <div className="min-h-screen bg-underground-secondary">
      <header className="px-6 py-4">
        <Logo />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
})

AuthLayout.displayName = 'AuthLayout'
