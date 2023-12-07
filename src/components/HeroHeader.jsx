import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCarrot, FaSignOutAlt } from "react-icons/fa";
import DtoLogo from "../assets/DtoLogo";
import { MdMenu } from "react-icons/md";

export default function HeroHeader() {
  const [headerBackground, setHeaderBackground] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const onScroll = () => {
    if (window.scrollY >= 80) {
      setHeaderBackground(true);
    } else {
      return setHeaderBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerBackground]);

  return (
    <header
      className={`no_selection fixed top-0 z-10 w-full text-sm  ${
        headerBackground || openMenu
          ? "bg-white/50 shadow-sm backdrop-blur-xl"
          : ""
      } transition-all duration-300`}
    >
      <div className="mx-auto flex h-[56px] max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DtoLogo width={24} height={24} fill={"#06b6d4"} />
            <span className="font-bold text-cyan-500">
              Digital Transformation Office
            </span>
          </div>
        </div>

        <div
          className={`select-none rounded-lg md:hidden ${
            headerBackground ? "bg-gray-200" : ""
          } p-1`}
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <MdMenu size={24} />
        </div>

        <div className="flex items-center gap-4 font-semibold max-sm:hidden sm:max-md:hidden">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink href="about">About</NavLink>
          <NavLink>Contact Us</NavLink>
        </div>
      </div>
      {openMenu && (
        <div className="flex justify-center gap-4 p-6 font-semibold duration-300">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink href="about">About</NavLink>
          <NavLink>Contact Us</NavLink>
        </div>
      )}
    </header>
  );
}
