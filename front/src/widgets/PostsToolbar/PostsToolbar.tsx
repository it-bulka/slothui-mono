import { SearchBar } from '@/shared/ui';
import { AddPostBtn } from '@/features';
import { PostTextarea } from '@/widgets';
import { useState, memo } from 'react';
import { useUserSearch, UserSearchResults } from '@/features/user-search';

export const PostsToolbar = memo(() => {
  const [isPostTextarea, setPostTextarea] = useState(false);
  const {
    query,
    setQuery,
    results,
    isLoading,
    hasSearched
  } = useUserSearch();


  return (
    <div className={"border-style-b px-main py-5 flex flex-wrap justify-between relative"}>
      <SearchBar
        placeholder={"Search users by nickname"}
        size="lg"
        iconPosition="right"
        className="grow max-w-[400px] mr-2"
        onChange={setQuery}
        value={query}
      />
      <AddPostBtn onClick={() => setPostTextarea(prev => !prev)} active={!isPostTextarea} />
      {isPostTextarea && <PostTextarea className="basis-full py-6"/>}

      {hasSearched && (
        <UserSearchResults
          isLoading={isLoading}
          list={results}
          className="absolute top-full left-0 w-full shadow bg-white px-main m-h-[50vh] overflow-auto"
        />
      )}

    </div>
  )
})

PostsToolbar.displayName = "PostsToolbar"