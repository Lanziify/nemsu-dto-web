import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../api/apiService";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    getNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { getNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
