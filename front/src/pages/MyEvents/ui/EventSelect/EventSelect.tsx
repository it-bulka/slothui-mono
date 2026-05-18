import { DropSelect } from '@/shared/ui/DropSelect/DropSelect';
import { useSearchParams } from 'react-router';
import type { EventOption } from '@/pages/MyEvents/model/types/eventOption.type.ts';
import type { SingleValue } from 'react-select';

const eventOptions: EventOption[] = [
  { value: 'your', label: 'Your' },
  { value: 'subscribed', label: 'Subscribed' },
  { value: 'upcoming', label: 'Upcoming' },
];

export const EventSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (option: SingleValue<EventOption>) => {
    if (!option) return;
    setSearchParams(prev => {
      prev.set('sort', option.value);
      return prev;
    });
  };

  const sort = searchParams.get('sort');
  const currentOption = eventOptions.find(o => o.value === sort) ?? eventOptions[0];

  return (
    <DropSelect options={eventOptions} value={currentOption} onChange={handleChange} />
  );
};