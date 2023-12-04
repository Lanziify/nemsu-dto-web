import React from "react";
import dtoLogo from "../assets/dtoLogo.svg";
import { motion } from "framer-motion";
import { fadeDefault } from "../animations/variants";
import Portal from "./Portal";

function Preloader() {
  return (
    <Portal>
      <motion.div
        variants={fadeDefault}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-white"
      >
        <img
          src={dtoLogo}
          alt="DTO logo"
          className="h-[56px] min-w-[56px] animate-pulse"
        />
      </motion.div>
    </Portal>
  );
}

export default Preloader;
