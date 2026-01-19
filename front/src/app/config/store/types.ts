import { store } from './config.ts';

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;