import { useUserSearch } from '../../model/hooks/useUserSearch/useUserSearch.ts';
import { SearchBar } from '@/shared/ui';
import { UserSearchResults } from '@/features/user-search';
import { memo } from 'react';

export const UserSearchToolbar = memo(() => {
  const { query, setQuery, results, isLoading, hasSearched } = useUserSearch();

  return (
    <>
      <SearchBar
        placeholder="Search users by nickname"
        size="lg"
        iconPosition="right"
        onChange={setQuery}
        value={query}
      />
      {hasSearched && (
        <UserSearchResults
          isLoading={isLoading}
          list={results}
          className="absolute top-full left-0 w-full shadow bg-white px-main m-h-[50vh] overflow-auto z-50"
        />
      )}
    </>
  )
})

UserSearchToolbar.displayName = 'UserSearchToolbar';
