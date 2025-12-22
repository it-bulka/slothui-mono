import type { ChatDTO } from '@/shared/types/chat.types.ts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { searchChats, selectSortedChats } from '@/entities';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '@/shared/config/redux';
import { useChatSearchDebouncedText } from '@/features/search-chat/model/context/useChatSearchDebouncedText.tsx';

type AbortableThunkPromise = {
  abort: () => void;
  unwrap: () => Promise<ChatDTO[]>;
};

export const useLocalChatsSearch = () => {
  const { debouncedSearchText } = useChatSearchDebouncedText()

  const dispatch = useAppDispatch();
  const searchThunkRef = useRef<AbortableThunkPromise | null>(null);
  const chats = useAppSelector(selectSortedChats)
  const [loading, setLoading] = useState<boolean>(false);

  const filteredChats = useMemo(() => {
    if (!debouncedSearchText) return chats;

    return chats.filter(chat =>
      chat.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
  }, [chats, debouncedSearchText]);

  const localSearch = useCallback(
    (search: string) => {
      searchThunkRef.current?.abort();
      if (!search) return;

      setLoading(true);
      searchThunkRef.current = dispatch(searchChats(search));

      searchThunkRef.current
        ?.unwrap()
        .finally(() => setLoading(false));
    },
    [dispatch, setLoading]
  );

  const debouncedLocalSearch = useMemo(() => debounce(localSearch, 300), [localSearch]);

  useEffect(() => {
    debouncedLocalSearch(debouncedSearchText);

    return () => {
      debouncedLocalSearch.cancel();
    };
  }, [debouncedSearchText, debouncedLocalSearch]);

  return { items: filteredChats, loading }
}