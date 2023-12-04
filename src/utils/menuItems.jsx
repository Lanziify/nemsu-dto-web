import { MdSpaceDashboard, MdOutlineSpaceDashboard } from "react-icons/md";
import {
  IoPeople,
  IoDocuments,
  IoNotifications,
  IoNotificationsOutline,
  IoDocumentsOutline,
  IoTime,
  IoTimeOutline,
  IoHome,
  IoHomeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export const userItems = [
  {
    path: "/home",
    name: "Home",
    inactiveIcon: <IoHomeOutline size={18} />,
    icon: <IoHome size={18} />,
  },
  {
    path: "/notifications",
    name: "Notifications",
    inactiveIcon: <IoNotificationsOutline size={18} />,
    icon: <IoNotifications size={18} />,
  },
  {
    path: "/request",
    name: "Requests",
    inactiveIcon: <IoDocumentsOutline size={18} />,
    icon: <IoDocuments size={18} />,
  },
  {
    path: "/history",
    name: "History",
    inactiveIcon: <IoTimeOutline size={18} />,
    icon: <IoTime size={18} />,
  },
];

export const adminItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    inactiveIcon: <MdOutlineSpaceDashboard size={18} />,
    icon: <MdSpaceDashboard size={18} />,
  },
  {
    path: "/notifications",
    name: "Notifications",
    inactiveIcon: <IoNotificationsOutline size={18} />,
    icon: <IoNotifications size={18} />,
  },
  {
    path: "/users",
    name: "Manage Users",
    inactiveIcon: <IoPeopleOutline size={18} />,
    icon: <IoPeople size={18} />,
  },
  {
    path: "/list",
    name: "Request List",
    inactiveIcon: <IoDocumentsOutline size={18} />,
    icon: <IoDocuments size={18} />,
  },
];
