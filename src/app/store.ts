import { configureStore } from '@reduxjs/toolkit';

import config from './config.slice';
import authority from './authority.slice';

export const store = configureStore({
  reducer: {
    config,
    authority,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
