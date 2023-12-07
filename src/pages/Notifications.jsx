import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DtoNotification from "../components/DtoNotification";
import { useNavigate } from "react-router-dom";
import { readNotification } from "../redux/readNotificationSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notifications, isFetchingNotif } = useSelector(
    (state) => state.notifications
  );

  const { requests } = useSelector((state) => state.requests);

  const handleSelectedNotification = (notification) => {
    if (!notification.read) {
      dispatch(readNotification(notification.notificationId));
    }

    if (!notification?.data) {
      const id = notification.body
        .slice(notification.body.indexOf("#") + 1)
        .split(" ")[0];
      navigate(`/notifications/request/${id}`);
    } else {
      const selected = requests.find((request) => {
        return request.requestId === notification.data.requestId;
      });

      navigate(`/notifications/request/${selected?.requestId}`, {
        state: selected,
      });
    }
  };

  if (isFetchingNotif)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton opacity={1} />
        <Skeleton opacity={0.5} />
        <Skeleton opacity={0.1} />
      </div>
    );

  return (
    <div className="rounded-2xl bg-white text-sm ">
      <div className="mb-2 text-2xl font-bold">Notifications</div>
      <DtoNotification
        notifications={notifications}
        isFetching={isFetchingNotif}
        selectedNotification={(data) => handleSelectedNotification(data)}
      />
    </div>
  );
};



export default Notifications;
