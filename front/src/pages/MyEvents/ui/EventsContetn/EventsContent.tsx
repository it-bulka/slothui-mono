import { useSearchParams } from 'react-router';
import type { EventsContentType } from '../../model/types/eventOption.type.ts';
import { EventCategoryContent } from '../EventCategoryContent/EventCategoryContent.tsx';
import { EventSelect } from '../EventSelect/EventSelect.tsx';

export const EventsContent = ({ userId }: { userId: string }) => {
  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') || 'your') as EventsContentType;

  return (
    <>
      <EventSelect />
      <EventCategoryContent userId={userId} type={sort} />
    </>
  );
};
