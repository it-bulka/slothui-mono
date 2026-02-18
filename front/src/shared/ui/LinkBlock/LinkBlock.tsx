import { AppLink } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';

interface LinkBlockProps {
  links: { to: string; label: string }[];
  className?: string;
  noArrow?: boolean;
}
export const LinkBlock = ({ links, className = '', noArrow }: LinkBlockProps) => {
  return (
    <div className={twMerge("flex flex-col", className)}>
      {links.map(({ to, label }) => (
        <AppLink to={to} noArrow={noArrow}>{label}</AppLink>
      ))}
    </div>
  )
}