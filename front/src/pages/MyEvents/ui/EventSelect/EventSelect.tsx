import { DropSelect } from '@/shared/ui';
import { useSearchParams } from 'react-router';
import type { EventOption } from '@/pages/MyEvents/model/types/eventOption.type.ts';
import type { SingleValue } from 'react-select';
import { useMemo } from 'react';

const eventOptions: EventOption[] = [
  { value: 'your', label: 'Your' },
  { value: 'subscribed', label: 'Subscribed' },
  { value: 'upcoming', label: 'Upcomming' },
]
export const EventSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (option: SingleValue<EventOption>) => {
    if(!option) return;

    setSearchParams(prev => {
      prev.set('sort', option.value);
      return prev;
    });
  };

  const sort = searchParams.get('sort');
  const defaultOption = useMemo(() => {
    switch (sort) {
      case 'your':
        return eventOptions[0];
      case 'subscribed':
        return eventOptions[1];
      case 'upcoming':
        return eventOptions[2];
    }
  }, [sort])

  return (
    <DropSelect options={eventOptions} defaultValue={defaultOption} onChange={handleChange}/>
  )
}