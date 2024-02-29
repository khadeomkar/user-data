import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface themeState {
  theme: string;
}

const initialState: themeState = {
  theme: 'light-theme',
};

export const themeSlice = createSlice({
  name: 'theme-type',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;