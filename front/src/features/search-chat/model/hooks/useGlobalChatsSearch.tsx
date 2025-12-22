import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchGlobalChats } from '@/features/search-chat/model/thunk/fetchGlobalChats.tsx';
import { debounce } from 'lodash';
import { useAppDispatch } from '@/shared/config/redux';
import type { ChatGlobalSearchResult } from '@/shared/types/chat.types.ts';
import { useChatSearchDebouncedText } from '../../model/context/useChatSearchDebouncedText.tsx';

type AbortableThunkPromise = {
  abort: () => void;
  unwrap: () => Promise<ChatGlobalSearchResult>;
};

export const useGlobalChatsSearch = () => {
  const { debouncedSearchText } = useChatSearchDebouncedText()

  const [globalResults, setGlobalResults] = useState<ChatGlobalSearchResult>([]);
  const globalSearchThunkRef = useRef<AbortableThunkPromise | null>(null);
  const dispatch = useAppDispatch();

  const globalSearch = useCallback((search: string) => {
    globalSearchThunkRef.current?.abort();

    if (search.length < 4) {
      setGlobalResults([]);
      return;
    }

    globalSearchThunkRef.current = dispatch(fetchGlobalChats(search));

    globalSearchThunkRef.current
      ?.unwrap()
      .then(res => setGlobalResults(res))
      .catch(err => {
        if (err.name === 'AbortError') return;
      });
  }, [dispatch]);

  const debouncedGlobalSearch = useMemo(() => debounce(globalSearch, 500), [globalSearch]);

  useEffect(() => {
    debouncedGlobalSearch(debouncedSearchText);

    return () => {
      debouncedGlobalSearch.cancel();
    };
  }, [debouncedSearchText, debouncedGlobalSearch]);

  return { items: globalResults };
}