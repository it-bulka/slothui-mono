import { type ReactNode } from 'react';
export const Feed = ({ header, children }: { header?: ReactNode, children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-full">
      {header && (
        <div className="sticky top-0 z-40 header-glass">
          {header}
        </div>
      )}
      <div className="bg-white px-main py-6 grow flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}