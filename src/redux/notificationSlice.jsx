import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../api/apiService";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    isFetchingNotif: null,
    notifications: [],
  },
  reducers: {
    getNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    isFetchingNotif: (state, action) => {
      state.isFetchingNotif = action.payload;
    },
  },
});

export const { getNotifications, isFetchingNotif } =
  notificationSlice.actions;
export default notificationSlice.reducer;
