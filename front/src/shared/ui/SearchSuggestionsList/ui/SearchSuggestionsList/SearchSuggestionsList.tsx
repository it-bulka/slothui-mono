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
      <p className={twMerge(classnames("p-2 w-full bg-white mt-1 rounded shadow", [className]))}>
        No results found.
      </p>
    )
  }
  return (
    <ul
      className={twMerge(classnames("w-full bg-white mt-1 rounded shadow", [className]))}
    >
      {items?.map(s => (
        <li
          key={s.id}
          className="p-2 cursor-pointer hover:bg-gray-100"
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