import SearchIcon from '@/shared/assets/images/general/search.svg?react'
import { twMerge } from 'tailwind-merge'
import { type ForwardedRef, type KeyboardEventHandler, useCallback, forwardRef  } from 'react';
import cls from './SearchBar.module.css'
import classnames from 'classnames';

interface SearchBarProps {
  className?: string
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  placeholder?: string
  iconPosition?: 'left' | 'right'
  size?: 'md' | 'lg'
  name?: string
}
export const SearchBar = forwardRef(
  ({ className, onSearch, placeholder, iconPosition = 'left', size = 'md', value, onChange, name }: SearchBarProps,
   ref: ForwardedRef<HTMLInputElement | null>) => {
    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
      e => {
        if (e.key === 'Enter') {
          onSearch?.()
        }
      },
      [onSearch]
    )

    const Search = () => {
      return (
        <button
          onClick={onSearch}
          className={`rounded-10 w-[20px] h-[20px] inline-block text-gray-g1 ${cls[iconPosition]}`}
        >
          <SearchIcon className="w-full" />
        </button>
      )
    }

    return (
      <div
        className={twMerge(classnames(
          `flex items-center rounded-3xl border border-gray-g4 wrapper ${cls[size]}`,
          [className]))}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
      >
        {iconPosition === 'left' && <Search />}
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={'grow font-medium placeholder:text-gray-g1'}
          placeholder={placeholder}
          name={name}
        />
        {iconPosition === 'right' && <Search />}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'
