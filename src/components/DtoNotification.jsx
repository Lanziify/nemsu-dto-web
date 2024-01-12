import React from "react";
import getTimeAgo from "../utils/getTimeAgo";
import { MdDelete } from "react-icons/md";
import { firestore } from "../config/firebase-config";
import { collection, query, deleteDoc, where, doc } from "firebase/firestore";

function DtoNotification(props) {
  const { notifications, selectedNotification } = props;

  const dtoNotificatonsRef = collection(firestore, "notifications");

  // const deleteNotificationQuery = query(
  //   dtoNotificatonsRef,
  //   where("notificationId", "==", user ? user.uid : null),
  // );

  const deleteNotification = async (e, values) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(dtoNotificatonsRef, values.notificationId))
    } catch (error) {
      console.log(error);
    }
  };

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
          className="group cursor-pointer rounded-xl text-sm hover:bg-black/5"
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
            <div className="relative">
              <div
                className="absolute bottom-0 right-5 top-0 m-auto h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 group-hover:flex max-sm:flex lg:hidden"
                onClick={(e) => deleteNotification(e, notification)}
              >
                <MdDelete size={18} />
              </div>
              <div className="h-3 w-3 ">
                {!notification?.read && (
                  <div className="h-full w-full rounded-full bg-cyan-500"></div>
                )}
              </div>
            </div>
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
