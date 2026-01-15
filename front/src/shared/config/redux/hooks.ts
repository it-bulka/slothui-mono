import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { RootState, AppStore } from '@/app/config';
import type { ThunkExtra } from './thunk-types';

export type AppDispatch = ThunkDispatch<RootState, ThunkExtra, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = (): AppStore => {
  return useStore() as AppStore;
};
