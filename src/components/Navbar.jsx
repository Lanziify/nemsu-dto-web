import React, { useState, useEffect, useRef } from "react";
import {
  IoMenu,
  IoPersonCircle,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import DtoNotification from "./DtoNotification";
import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { messaging } from "../config/firebase-config";
import { toast } from "react-toastify";
import notificationRingtone from "../assets/notification.mp3";
import { AnimatePresence, motion } from "framer-motion";
import { popUp, popUpItem } from "../animations/variants";
import ApiService from "../api/apiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../redux/notificationSlice";
import { readNotification } from "../redux/readNotificationSlice";
import dtoLogo from "../assets/dtoLogo.svg";

function Navbar(props) {
  const { isToggled, isCreatingRequest } = props;
  const { user, userToken, logoutUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notifications, unreads, showUnreads } = useSelector(
    (state) => state.notifications
  );

  const { requests } = useSelector((state) => state.requests);
  const { isReadingNotifiation } = useSelector(
    (state) => state.readNotification
  );

  const [isProfileToggled, setIsProfileToggled] = useState(false);
  const [isNotificationToggled, setIsNotificationToggled] = useState(false);
  // Refs
  const notificationButton = useRef(null);
  const notificationFloater = useRef(null);
  const profileButton = useRef(null);
  const profileFloater = useRef(null);

  const items = [
    {
      path: "/settings",
      name: "Settings",
      icon: <IoSettingsOutline size={24} />,
    },
    {
      path: "/help",
      name: "Help",
      icon: <IoHelpCircleOutline size={24} />,
    },
    {
      path: "/feedback",
      name: "Send feedback",
      icon: <BsChatLeftDots size={20} />,
    },
  ];

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BItYMIPmv1rk5OeMPmz2__C1LaALFQZs-eRDr0JojHd8Hj3PyelNHMz5xzGgH-j1jRLecKyMVDP_wiRceSQvbDo",
      });
      await ApiService.updateFcm(user.uid, token);
    } else {
      await deleteToken(messaging);
      await ApiService.updateFcm(user.uid, null);
    }
  };

  const ToastifyNotification = ({ title, body }) => (
    <>
      <div className="mb-2 flex items-center gap-2">
        <img className="max-h-6 rounded-full" src={logo} />
        <h1 className="text-sm font-bold">{title}</h1>
      </div>
      <p className="text-xs">{body}</p>
    </>
  );

  const handleNotificationClick = () => {
    if (
      window.innerWidth <= 428 ||
      (window.innerWidth <= 428 && isNotificationToggled)
    ) {
      setIsNotificationToggled(false);
      navigate("/notifications");
    } else {
      setIsNotificationToggled(!isNotificationToggled);
    }
  };

  const handleSelectedNotification = (notification) => {
    if (!notification.read) {
      dispatch(readNotification(notification.notificationId));
    }
    const selected = requests.find((request) => {
      return request.requestId === notification.data.requestId;
    });
    setIsNotificationToggled(false);
    navigate(`notifications/request/${selected.requestId}`, {
      state: selected,
    });
  };

  useEffect(() => {
    requestPermission();
    try {
      onMessage(messaging, (payload) => {
        const ringtone = new Audio(notificationRingtone);
        // dispatch(fetchNotifications(user.uid));

        toast(
          <ToastifyNotification
            title={payload.data.title}
            body={payload.data.subtitle}
          />,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        ringtone.play();
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchNotifications(user.uid));
    // dispatch(fetchRequests());
  }, [isReadingNotifiation]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isNotificationToggled &&
        notificationFloater.current &&
        !notificationFloater.current.contains(e.target) &&
        notificationButton.current &&
        !notificationButton.current.contains(e.target)
      ) {
        setIsNotificationToggled(false);
      }

      if (
        profileFloater.current &&
        !profileFloater.current.contains(e.target) &&
        profileButton.current &&
        !profileButton.current.contains(e.target)
      ) {
        setIsProfileToggled(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNotificationToggled, isProfileToggled]);

  return (
    <header className="no_selection sticky top-0 z-10 bg-white text-sm  shadow-sm">
      {/* Left side div */}
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          {/* Hamburger */}
          <div
            className="cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-gray-200 "
            onClick={isToggled}
          >
            <IoMenu size={24} />
          </div>

          <div className="flex items-center gap-2">
            {/* <div className="h-[36px] min-w-[36px] rounded-full border bg-gradient-to-br from-cyan-100 to-cyan-500"></div> */}
            <img
              src={dtoLogo}
              alt="DTO logo"
              className="h-[24px] min-w-[24px]"
            />
            <span className="font-bold text-cyan-500 max-sm:hidden">
              Digital Transformation Office
            </span>
          </div>
        </div>

        <div className=" flex items-stretch gap-4">
          {/* Create request button */}
          {!userToken.claims.admin && (
            <Button
              primary
              rounded="md"
              buttonText="Create a request"
              onClick={isCreatingRequest}
            />
          )}
          {/* Notification */}
          <div
            className="relative flex items-center p-1"
            onClick={handleNotificationClick}
          >
            <div className="cursor-pointer" ref={notificationButton}>
              <div>
                <IoNotificationsOutline size={24} />
              </div>
              {unreads ? (
                <div
                  className="no_selection absolute right-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-cyan-500 text-white"
                  onClick={handleNotificationClick}
                >
                  <span className="absolute -z-10 h-4 w-4 animate-ping rounded-full bg-cyan-500"></span>
                  <p className="text-[10px]">{unreads}</p>
                </div>
              ) : null}
            </div>
            {/* Notification floater */}
            <AnimatePresence mode="wait">
              {isNotificationToggled && (
                <motion.div
                  variants={popUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  ref={notificationFloater}
                  className="sm:max-md: absolute right-0 top-full -z-10 mt-4 flex max-h-[632px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="px-4 pt-4">
                    <motion.h1
                      variants={popUpItem}
                      className="text-2xl font-bold"
                    >
                      Notifications
                    </motion.h1>
                  </div>
                  <div className="overflow-y-auto p-4">
                    <DtoNotification
                      notifications={notifications}
                      selectedNotification={(data) =>
                        handleSelectedNotification(data)
                      }
                    />
                  </div>
                  <div className="py-2">
                    <ul className="flex justify-center gap-4 [&>li]:cursor-pointer [&>li]:rounded-xl">
                      <li>All</li>
                      <li>Unread</li>
                      <li>Completed</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative flex cursor-pointer items-center">
            <div
              ref={profileButton}
              className="rounded-full text-cyan-500"
              onClick={() => setIsProfileToggled(!isProfileToggled)}
            >
              <IoPersonCircle size={36} />
            </div>

            {/* Profile floater */}
            <AnimatePresence>
              {isProfileToggled && (
                <motion.div
                  variants={popUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  ref={profileFloater}
                  className="absolute right-0 top-full -z-10 mt-4 min-w-[280px] rounded-2xl bg-white p-4 shadow-xl"
                >
                  <div>
                    <div className="m-auto mb-2 h-[96px] max-w-[96px] rounded-full bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
                    <p
                      className={`text-center text-lg font-bold ${
                        userToken.claims.admin
                          ? "text-cyan-500"
                          : "text-gray-500"
                      }`}
                    >
                      {user.displayName}
                    </p>
                    <Button
                      width="full"
                      rounded="md"
                      buttonText="Manage profile"
                    />
                  </div>
                  <div className="py-2">
                    {items.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        className="flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-2 font-semibold hover:bg-gray-300/50"
                      >
                        <div>{item.icon}</div>
                        <p>{item.name}</p>
                      </NavLink>
                    ))}
                  </div>
                  <hr />
                  <a
                    className="mt-2 flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-2 font-semibold  hover:bg-gray-300/50"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline size={24} />
                    <p>Logout</p>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
