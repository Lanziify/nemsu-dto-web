import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { popUp, popUpItem } from "../animations/variants";

export default function Hero() {
  return (
    <>
      <div className="grid h-[100vh] w-full place-items-center">
        <div className="z-[1] flex w-full max-w-7xl flex-row-reverse items-center justify-between gap-6 p-4 max-sm:flex-col sm:max-md:flex-col">
          <LoginForm />

          <div className="flex-1 text-gray-700 max-sm:hidden sm:max-md:text-center ">
            <motion.h1
              variants={popUpItem}
              className="mb-4 text-5xl font-black"
            >
              Digital Transformation Office
            </motion.h1>
            <motion.p variants={popUpItem} className="text-sm">
              Innovative solution implemented at North Eastern Mindanao -
              Tagbina Campus, designed to streamline and enhance the process of
              handling repair requisitions for ICT-related issues across various
              school offices. This system facilitates a seamless communication
              channel between different offices and the ICT department, ensuring
              efficient and timely resolution of technical problems.
            </motion.p>
          </div>
        </div>
        <div className="bg-nemsu absolute top-0 h-full w-full"></div>
        <div className="absolute top-0 h-full w-full bg-gradient-to-t from-white to-cyan-100/50 to-85% backdrop-blur-sm"></div>
      </div>
      <div className="grid h-screen w-full place-items-center">
        <p className="mx-32 text-center">
          The Digital Transformation Office System is a cornerstone in fostering
          a technologically advanced and responsive environment within North
          Eastern Mindanao - Tagbina Campus. It stands as a testament to the
          commitment to embrace digital innovation for the betterment of
          administrative processes and user experience.
        </p>
      </div>
    </>
  );
}
