import { Button } from '@/shared/ui';

interface AddPostBtnProps {
  active?: boolean;
  onClick?: () => void;
}
export const AddPostBtn = ({ onClick, active }: AddPostBtnProps) => {
  return (
    <Button size="md" variant="primary" className={"flex items-center gap-[10px]"} onClick={onClick}>
      {active ? (
        <>
          <span>Add New Post</span>
          <span>+</span>
        </>
      ) : <span>Hide Post Input</span>}
    </Button>
  )
}