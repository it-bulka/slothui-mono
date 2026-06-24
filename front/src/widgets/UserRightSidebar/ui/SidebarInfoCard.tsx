import type { ReactNode } from 'react'
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx'

interface SidebarInfoCardProps {
  title: string
  children: ReactNode
}

export const SidebarInfoCard = ({ title, children }: SidebarInfoCardProps) => (
  <div className="bg-white rounded-[1.25rem] border border-gray-g3 mb-4 overflow-hidden">
    <div className="px-4 pt-4 pb-3">
      <BlockTitle title={title} withoutBtn />
    </div>
    <hr className="border-gray-g3" />
    <div className="px-4 py-3">
      {children}
    </div>
  </div>
)
