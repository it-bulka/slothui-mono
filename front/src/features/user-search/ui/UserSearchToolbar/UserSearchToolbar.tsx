import { useUserSearch } from '../../model/hooks/useUserSearch/useUserSearch.ts';
import { SearchBar } from '@/shared/ui/SearchBar/SearchBar';
import { UserSearchResults } from '@/features/user-search';
import { memo } from 'react';

export const UserSearchToolbar = memo(({ className }: { className?: string }) => {
  const { query, setQuery, results, isLoading, hasSearched } = useUserSearch();

  return (
    <>
      <SearchBar
        className={className}
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
          className="absolute top-full left-0 w-full bg-light-l2 backdrop-blur-[12px] border border-gray-g3 rounded-b-[var(--radius-lg)] px-main max-h-[50vh] overflow-auto z-50 shadow-theme-lg"
        />
      )}
    </>
  )
})

UserSearchToolbar.displayName = 'UserSearchToolbar';
