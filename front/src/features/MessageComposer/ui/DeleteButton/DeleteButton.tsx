interface DeleteButtonProps {
  onClick: () => void;
}
export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button onClick={onClick}>x</button>
  )
}