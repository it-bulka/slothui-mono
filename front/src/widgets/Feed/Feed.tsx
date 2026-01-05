import { type ReactNode } from 'react';
export const Feed = ({ header, children }: { header?: ReactNode, children: ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      {header}
      <div className="bg-light-l3 px-main py-6 grow flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}