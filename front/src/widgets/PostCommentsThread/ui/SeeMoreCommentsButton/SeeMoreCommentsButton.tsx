export const SeeMoreCommentsButton = ({ onClick }: { onClick: () => void}) => {
  return (
    <button
      onClick={() => onClick?.()}
      className="block mx-auto text-[75%] opacity-90"
    >
      See more comments
    </button>
  )
}