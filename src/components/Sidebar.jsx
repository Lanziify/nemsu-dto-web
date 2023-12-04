import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  drawerAnimation,
  drawerItems,
  fadeDefault,
} from "../animations/variants";
import { adminItems, userItems } from "../utils/MenuItems";

function Sidebar(props) {
  const { isAdmin, isToggled, setToggled } = props;
  const location = useLocation();

  const menuItems = () => {
    if (isAdmin) {
      return adminItems;
    } else {
      return userItems;
    }
  };

  return (
    <>
      {isToggled && (
        <motion.aside
          variants={fadeDefault}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="sticky top-[73px] flex min-h-[calc(100vh_-_89px)] w-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 text-sm">
            <div>
              {menuItems().map((item, index) => (
                <motion.div variants={drawerItems} key={index}>
                  <NavLink
                    to={item.path}
                    key={index}
                    className={({ isActive }) => {
                      return (
                        "flex items-center gap-2 rounded-xl p-2 font-semibold " +
                        (isActive
                          ? `text-white ${
                              isAdmin
                                ? "bg-gradient-to-r from-cyan-500 to-teal-200/50"
                                : "bg-cyan-500"
                            }`
                          : "hover:bg-black/5")
                      );
                    }}
                  >
                    {item.path.includes(location.pathname.split("/").at(1))
                      ? item.icon
                      : item.inactiveIcon}

                    <div>{item.name}</div>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <footer className="text-center text-[10px] leading-tight">
              <p>©2023 Nemsu - Tagbina Campus</p>
              <p>Design and Develop by Lance</p>
              <p>Current version 0.0.1.2</p>
            </footer>
          </div>
        </motion.aside>
      )}
    </>
  );
}

export default Sidebar;
