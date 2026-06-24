import { CtaButton } from '@/shared/ui/CtaButton';
import PostsSvg from '@/shared/assets/images/sidebar/2.posts.svg?react';

interface AddPostBtnProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AddPostBtn = ({ onClick, active, className }: AddPostBtnProps) => (
  <CtaButton Icon={PostsSvg} onClick={onClick} className={className}>
    {active ? 'Add New Post' : 'Hide Post Input'}
  </CtaButton>
);
