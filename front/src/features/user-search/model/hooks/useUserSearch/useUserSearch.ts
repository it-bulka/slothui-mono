import { useEffect, useRef, useState } from 'react';
import { useUserService } from '@/shared/libs/services';
import type { UserShort } from '@/shared/types';
import { toast } from 'react-toastify'

export const useUserSearch = () => {
  const usersService = useUserService();
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<UserShort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if(error) {
      toast.warn(error)
    }
  }, [error]);
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    // debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const res = await usersService.searchUsers(
          { search: query.trim(), signal: abortRef.current.signal}
        );
        setResults(res.items);
      } catch (e: unknown) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (e.name !== 'AbortError') {
          setError('SEARCH_FAILED');
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, usersService]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    hasSearched
  };
}
