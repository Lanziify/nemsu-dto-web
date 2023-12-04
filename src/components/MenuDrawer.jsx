import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { drawerAnimation, drawerItems } from "../animations/variants";
import { adminItems, userItems } from "../utils/MenuItems";
import dtoLogo from "../assets/dtoLogo.svg";
import Portal from "./Portal";

function MenuDrawer(props) {
  const { isAdmin, isToggled, closeSidebar } = props;
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
      <AnimatePresence>
        {isToggled && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 0.1,
                },
              }}
              transition={{ duration: 0.4 }}
              className="fixed left-0 top-0 z-10 flex h-full w-full items-start bg-black/50 text-sm"
              onClick={() => closeSidebar(false)}
            >
              <motion.div
                variants={drawerAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative flex h-full w-[280px] flex-col justify-between bg-white"
              >
                {/* Drawer header */}
                <div
                  className="absolute right-0 top-0 z-10 m-4 cursor-pointer"
                  onClick={() => closeSidebar(false)}
                >
                  <IoClose size={24} />
                </div>
                <div>
                  <div className="flex h-[180px] flex-col items-center justify-center">
                    <img
                      src={dtoLogo}
                      alt="DTO logo"
                      className="z-10 mb-4 h-12"
                    />
                    <p className="font-semibold text-cyan-500">
                      Digital Transformation Office
                    </p>
                    {/* <h1 className="text-center text-lg font-black">
                    Digital Transformation Office
                  </h1> */}
                  </div>
                  <nav className="p-4">
                    {menuItems().map((item, index) => (
                      <div key={index}>
                        <NavLink
                          to={item.path}
                          key={index}
                          className={({ isActive }) => {
                            return (
                              "flex items-center gap-2 rounded-xl p-2 font-medium transition-all " +
                              (isActive
                                ? `bg-cyan-500 text-white`
                                : "hover:bg-gray-500/10")
                            );
                          }}
                          onClick={() => closeSidebar(false)}
                        >
                          {item.path.includes(
                            location.pathname.split("/").at(1)
                          )
                            ? item.icon
                            : item.inactiveIcon}
                          <div>{item.name}</div>
                        </NavLink>
                      </div>
                    ))}
                  </nav>
                </div>
                {/* Drawer footer */}
                <footer className="mb-4 text-center text-[10px] leading-tight">
                  <p>©2023 Nemsu - Tagbina Campus</p>
                  <p>Design and Develop by Lance</p>
                  <p>Current version 0.0.1.2</p>
                </footer>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}

export default MenuDrawer;
