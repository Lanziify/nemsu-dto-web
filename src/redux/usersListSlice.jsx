import { createSlice } from "@reduxjs/toolkit";

const usersListSlice = createSlice({
  name: "usersList",
  initialState: {
    users: [],
    loading: true,
    error: {},
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
      state.loading = action.payload;
      state.error = action.payload;
    },
  },
});

export const { getUsers } = usersListSlice.actions;
export default usersListSlice.reducer;
