import { Button } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';

interface AddPostBtnProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}
export const AddPostBtn = ({ onClick, active, className }: AddPostBtnProps) => {
  return (
    <Button size="md" variant="primary" className={twMerge("flex items-center gap-[10px]", className)} onClick={onClick}>
      {active ? (
        <>
          <span>Add New Post</span>
          <span>+</span>
        </>
      ) : <span>Hide Post Input</span>}
    </Button>
  )
}