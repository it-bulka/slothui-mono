import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Story } from '@/entities/Story/model/types/types.tsx';

export const storiesAdapter = createEntityAdapter<Story, string>({
  selectId: (story) => story.id,
});