import { ActionButton } from '@/shared/ui/ActionButton';
import PostsSvg from '@/shared/assets/images/sidebar/2.posts.svg?react';

interface AddPostBtnProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AddPostBtn = ({ onClick, active, className }: AddPostBtnProps) => {
  return (
    <ActionButton Icon={PostsSvg} onClick={onClick} className={className}>
      {active ? 'Add New Post' : 'Hide Post Input'}
    </ActionButton>
  );
};
