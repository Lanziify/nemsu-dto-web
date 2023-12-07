import React from "react";
import getTimeAgo from "../utils/getTimeAgo";

function DtoNotification(props) {
  const { notifications, selectedNotification } = props;

  // const sortedNotifications = [...notifications].sort(
  //   (a, b) => b.createdAt._seconds - a.createdAt._seconds
  // );

  if (props.isFetching)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton opacity={1} />
        <Skeleton opacity={0.5} />
        <Skeleton opacity={0.1} />
      </div>
    );

  if (notifications.length === 0)
    return <p>You don't have any notifications right now</p>;

  return (
    <>
      {notifications.map((notification, index) => (
        <div
          className="relative cursor-pointer rounded-xl text-sm hover:bg-black/5"
          key={index}
          onClick={() => {
            selectedNotification(notification);
          }}
        >
          <div className="flex items-center gap-2 p-2">
            <div className="h-8 w-8 self-start rounded-full  bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
            <div className="flex-1 ">
              <p
                className={`text-md font-bold ${
                  !notification.read ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                {notification.title}
              </p>
              <p
                className={`${
                  !notification.read ? "font-semibold" : "text-gray-500"
                }`}
              >
                {notification?.body}
              </p>
              <p
                className={`text-start text-xs ${
                  !notification.read ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                {getTimeAgo(notification.createdAt?.seconds)}
              </p>
            </div>
            {!notification?.read && (
              <div className=" h-2 w-2 rounded-full bg-cyan-500"></div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
function Skeleton(props) {
  return (
    <div
      className="flex animate-pulse flex-col gap-2 rounded-xl bg-gray-200 p-2"
      style={{ opacity: props.opacity }}
    >
      <div className="w-48 animate-pulse rounded-lg bg-gray-400 p-2"></div>
      <div className="animate-pulse rounded-lg bg-gray-300 p-2"></div>
      <div className="w-[15%] animate-pulse rounded-lg bg-gray-300 p-2"></div>
    </div>
  );
}

export default DtoNotification;
