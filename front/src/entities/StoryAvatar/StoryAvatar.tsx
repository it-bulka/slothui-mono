interface StoryAvatarProps {
  avatarSrc: string;
  username: string;
}

export const StoryAvatar = ({ avatarSrc, username}: StoryAvatarProps) => {
  return (
    <div className="flex flex-col gap-2 text-gray-g1 text-semibold text-xs">
      <div className='border rounded-full flex items-center justify-center'>
        <img src={avatarSrc} title={`${username} avatar`} className="block w-[66px] rounded-full" />
      </div>
      <p>{username}</p>
    </div>
  )
}