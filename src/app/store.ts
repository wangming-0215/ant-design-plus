import { configureStore } from '@reduxjs/toolkit';

import config from './config.slice';

export const store = configureStore({
  reducer: {
    config,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
