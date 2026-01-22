import { BlockTitle } from '@/widgets';
import type { PropsWithChildren } from 'react';

export const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <div>
    <BlockTitle title={title} withMargin />
    {children}
  </div>
);
