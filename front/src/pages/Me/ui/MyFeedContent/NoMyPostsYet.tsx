import { useState } from 'react'
import { NoDataYet } from '@/shared/ui'
import noPostsImage from '@/shared/assets/images/general/no_posts_2.png'
import { PostTextarea } from '@/widgets/PostTextarea/PostTextarea.tsx'

export const NoMyPostsYet = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <NoDataYet
        image={noPostsImage}
        title="No any posts yet"
        subtitle="You haven't created any posts yet"
        buttonLabel="Create first post"
        onButtonClick={() => setIsOpen(true)}
      />
      {isOpen && <PostTextarea className="mt-4" />}
    </>
  )
}
