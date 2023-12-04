import React, { useState } from "react";
import { motion } from "framer-motion";
import { popUpItem } from "../animations/variants";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdEmail, MdLock } from "react-icons/md";

function FormInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <motion.div variants={popUpItem} className="flex w-full flex-col gap-1">
      {props.label && (
        <label className="text-xs font-medium">{props.label}</label>
      )}
      <div className="relative">
        {(props.showEmailIcon || props.showPasswordIcon) && (
          <div className="absolute bottom-0 left-0 top-0 flex items-center">
            <div className="cursor-pointer select-none">
              {props.showEmailIcon ? (
                <MdEmail size={18} />
              ) : (
                <MdLock size={18} />
              )}
            </div>
          </div>
        )}
        <input
          className={`w-full border-b p-2 autofill:bg-none ${
            props.showEmailIcon || props.showPasswordIcon ? "pl-6" : null
          } ${
            props.enableShowPassword ? "pr-6" : null
          } text-gray-500 outline-none`}
          name={props.name}
          type={showPassword ? "text" : props.type}
          value={props.value}
          placeholder={props.placeholder ? props.placeholder : "Placeholder"}
          height={props.height}
          onChange={props.onChange}
        />
        {props.enableShowPassword && (
          <div className="absolute bottom-0 right-0 top-0 flex items-center text-gray-500">
            <div
              className="cursor-pointer select-none"
              onClick={(e) => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeFill size={18} />
              ) : (
                <BsEyeSlashFill size={18} />
              )}
            </div>
          </div>
        )}
      </div>
      {props.error && (
        <span className="text-start text-sm text-red-500">{props.error}</span>
      )}
    </motion.div>
  );
}

export default FormInput;
