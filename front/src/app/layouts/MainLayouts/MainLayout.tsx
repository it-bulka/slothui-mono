import { RightSidebar } from './blocks/RightSidebar.tsx';
import { LeftSidebar } from './blocks/LeftSightbar.tsx'
import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <div className={'grid grid-cols-[minmax(150px,25%)_1fr_minmax(200px,30%)] min-h-screen'}>
      <LeftSidebar />
      <main>
        <Outlet />
      </main>
      <RightSidebar />
    </div>
  )
}