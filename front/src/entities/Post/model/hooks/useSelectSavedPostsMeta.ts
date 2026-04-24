import { useSelector } from 'react-redux';
import { selectSavedPostsMeta } from '../selectors/selectSavedPostsMeta';

export const useSelectSavedPostsMeta = () => {
  return useSelector(selectSavedPostsMeta);
};