import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import themeSlice from './features/themeSlice';
import loginSlice from './features/loginSlice';

export const userStore = () => {
  return configureStore({
    reducer: {
      userInfo: userSlice,
      themeInfo: themeSlice,
      loginInfo: loginSlice
    },
  });
};

export type AppStore = ReturnType<typeof userStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];