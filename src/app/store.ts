import { configureStore } from '@reduxjs/toolkit';

import menu from './menu.slice';

export const store = configureStore({
  reducer: {
    menu,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
