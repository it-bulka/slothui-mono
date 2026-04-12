import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useTypeTab = (tabs: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentType = searchParams.get('type') ?? tabs[0];
  const activeIndex = Math.max(tabs.indexOf(currentType), 0);

  const onTabChange = useCallback(
    (index: number) => {
      setSearchParams({ type: tabs[index] }, { replace: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSearchParams],
  );

  return { activeIndex, onTabChange };
};
