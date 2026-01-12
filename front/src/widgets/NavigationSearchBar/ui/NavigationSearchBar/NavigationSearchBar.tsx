import { useState } from 'react';
import { SearchBar, SearchSuggestionsList } from '@/shared/ui';
import {
  useNavigationSearchSuggestions
} from '../../model/hooks/useNavigationSearchSuggestions.ts';

export const NavigationSearchBar = () => {
  const [value, setValue] = useState('');
  const { results, onSearchChange } = useNavigationSearchSuggestions();

  const handleChange = (v: string) => {
    setValue(v);
    onSearchChange(v);
  };

  return (
    <div className="relative">
      <SearchBar
        value={value}
        onChange={handleChange}
        placeholder="Navigation over site..."
        name="navigationSearchBar"
      />

      {!value || (
        <SearchSuggestionsList
          items={results}
          onItemClick={() => setValue('')}
          className="absolute top-full left-0 z-100"
        />
      )}
    </div>
  );
};
