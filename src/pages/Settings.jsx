import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IoChevronBack } from "react-icons/io5";

export default function Settings() {
  const { logoutUser } = useAuth();
  const settingsItems = [
    {
      option: "Edit Profile",
      path: "",
    },
    {
      option: "Change Password",
      path: "change_password",
    },
  ];
  return (
    <div className="">
      <NavLink to={-1} className="mb-4 flex items-center gap-1 text-sm hover:opacity-50 font-semibold ">
        <IoChevronBack size={18} />
        <div>Return</div>
      </NavLink>
      <h1 className="mb-4 text-2xl font-black text-cyan-500">Settings</h1>
      <div className="mb-2 flex flex-col gap-2">
        {settingsItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="group inline-flex cursor-pointer items-center gap-2"
          >
            <p className="text-sm group-hover:opacity-50">{item.option}</p>
          </NavLink>
        ))}
      </div>
      <div
        className="cursor-pointer text-sm hover:opacity-50"
        onClick={logoutUser}
      >
        Logout
      </div>
    </div>
  );
}
