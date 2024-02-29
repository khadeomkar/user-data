import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: any;
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      data.id = nanoid();
      state.users.push(data);
    },

    updateUser: (state, action: PayloadAction<any>) => {
      state.users.map((item: any, index: number) => {
        if (item.id === action.payload.id) {
          state.users[index] = action.payload;
        }
      });
    },

    removeUser: (state, action) => {
      const data = state.users.filter((item: any) => {
        return item.id !== action.payload;
      });
      state.users = data;
    },
  },
});

export const { addUsers, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
