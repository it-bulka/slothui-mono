import type { PropsWithChildren } from 'react';

export const Badge = ({ children }: PropsWithChildren) => {
  return (
    <span className={"block py-1 px-[10px] text-blue-b1 bg-light-l1 border border-blue-b2 rounded-full"}>
      {children}
    </span>
  )
}