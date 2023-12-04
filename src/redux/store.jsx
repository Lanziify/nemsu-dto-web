import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./requestSlice";
import notificationSlice from "./notificationSlice";
import readNotificationSlice from "./readNotificationSlice";
import usersListSlice from "./usersListSlice";

export default configureStore({
  reducer: {
    requests: requestSlice,
    notifications: notificationSlice,
    readNotification: readNotificationSlice,
    usersList: usersListSlice,
  },
});
