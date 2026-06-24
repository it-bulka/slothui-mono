import { useNavigate } from 'react-router';
import type { SearchSuggestionsType } from '@/shared/ui/SearchSuggestionsList';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';

export const SearchSuggestionsList = ({
  items, onItemClick, className
}: {
  items: SearchSuggestionsType[],
  onItemClick?: (s: SearchSuggestionsType) => void,
  className?: string
}) => {
  const navigate = useNavigate();

  if(!items.length) {
    return (
      <p className={twMerge(classnames("p-4 w-full text-gray-g1", [className]))}>
        No results found.
      </p>
    )
  }
  return (
    <ul
      className={twMerge(classnames("w-full", [className]))}
    >
      {items?.map(s => (
        <li
          key={s.id}
          className="px-4 py-3 cursor-pointer hover:bg-blue-b4 transition-colors rounded-[var(--radius-sm)]"
          onClick={() => {
            navigate(s.path);
            onItemClick?.(s);
          }}
        >
          {s.name}
        </li>
      ))}
    </ul>
  )
}