export const SeeMoreCommentsButton = ({ onClick }: { onClick: () => void}) => {
  return (
    <button
      onClick={() => onClick?.()}
      className="block mx-auto mt-2 text-xs font-medium text-blue-b1 hover:underline transition-colors"
    >
      See all comments
    </button>
  )
}