import { selectPostById } from '../selectors/adapterSelectors.ts';
import { useAppSelector } from '@/shared/config/redux';

export const useSelectPostById = (id: string) => useAppSelector((state) => selectPostById(state, id))