import { motion } from "framer-motion";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { fadeDefault } from "../animations/variants";

function DtoButton(props) {
  const getRoundedClass = () => {
    if (props.rounded === "sm") return "rounded-sm";
    if (props.rounded === "md") return "rounded-md";
    if (props.rounded === "lg") return "rounded-lg";
    if (props.rounded === "xl") return "rounded-xl";
    if (props.rounded === "full") return "rounded-full";
    return "rounded-xl";
  };

  const getWidthClass = () => {
    if (props.width === "full") return "w-full";
  };

  const getVariantClass = () => {
    const transition = "transition-all duration-300 ease-in-out";

    if (props.primary)
      return `bg-cyan-500 text-white ${transition} hover:bg-cyan-600`;
    if (props.secondary)
      return `bg-gray-400/70 text-white ${transition} hover:bg-gray-500/70`;
    if (props.outlinePrimary)
      return `border border-cyan-500 bg-transparent text-cyan-500 ${transition} hover:text-white hover:bg-cyan-500`;
    if (props.outlineSecondary)
      return `border border-gray-400 bg-transparent text-gray-400 ${transition} hover:text-white hover:bg-gray-400`;
    if (props.outlineWarning)
      return `border border-yellow-500 bg-transparent text-yellow-500 ${transition} hover:text-white hover:bg-yellow-500`;
    if (props.success)
      return `bg-green-500 text-white ${transition} hover:bg-green-600`;
    if (props.danger)
      return `bg-red-500 text-white ${transition} hover:bg-red-600`;
    if (props.warning)
      return `bg-yellow-500 text-white ${transition} hover:bg-yellow-600`;
    return `bg-transparent text-gray-500 ${transition} hover:bg-gray-300/50`;
  };

  const buttonClasses = `flex ${getWidthClass()} h-fit items-center whitespace-nowrap justify-center gap-2 px-4 py-2 font-semibold text-xs ${getRoundedClass()} ${getVariantClass()}  disabled:opacity-50 outline-none`;

  return (
    <button
      ref={props.buttonRef}
      className={buttonClasses}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? (
        <motion.div variants={fadeDefault} className="animate-spin">
          <AiOutlineLoading size={16} />
        </motion.div>
      ) : (
        <>
          {props.iconStart && props.iconStart}
          {props.buttonText ? props.buttonText : "Button"}
          {props.iconEnd && props.iconEnd}
        </>
      )}
    </button>
  );
}

export default DtoButton;
