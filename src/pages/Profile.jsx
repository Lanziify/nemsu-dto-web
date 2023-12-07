import React from "react";
import DtoButton from "../components/DtoButton";
import { NavLink } from "react-router-dom";
import {
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoChatboxOutline,
} from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, userToken, logoutUser } = useAuth();
  const items = [
    {
      path: "/settings",
      name: "Settings",
      icon: <IoSettingsOutline size={18} />,
    },
    {
      path: "/help",
      name: "Help",
      icon: <IoHelpCircleOutline size={18} />,
    },
    {
      path: "/feedback",
      name: "Send feedback",
      icon: <IoChatboxOutline size={18} />,
    },
  ];
  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <div className="m-auto mb-2 h-[96px] max-w-[96px] rounded-full bg-gradient-to-br from-cyan-100 to-cyan-500"></div>
        <p
          className={`text-center text-lg font-bold ${
            userToken.claims.admin ? "text-cyan-500" : ""
          }`}
        >
          {user.displayName}
        </p>
        <DtoButton width="full" rounded="md" buttonText="Manage profile" />
      </div>
      <div className="py-2">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-2 text-sm font-semibold hover:bg-gray-300/50"
          >
            <div>{item.icon}</div>
            <p>{item.name}</p>
          </NavLink>
        ))}
      </div>
      <hr />
      <a
        className="mt-2 flex cursor-pointer place-items-center gap-4 rounded-md px-4 py-2 text-sm font-semibold  hover:bg-gray-300/50"
        onClick={handleLogout}
      >
        <IoLogOutOutline size={18} />
        <p>Logout</p>
      </a>
    </div>
  );
};

export default Profile;
