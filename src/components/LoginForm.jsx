import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "./FormInput";
import dtoLogo from "../assets/dtoLogo.svg";
import DtoButton from "./DtoButton";
import Validation from "../utils/Validation";
import { popUpItem } from "../animations/variants";
import { motion } from "framer-motion";
import { ERROR } from "../utils/error";
import { AuthErrorCodes } from "firebase/auth";
import { IoChevronBack } from "react-icons/io5";

function LoginForm(props) {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [firebaseError, setFirebaseError] = useState();
  const [error, setError] = useState({});

  // Assign the inputs of the selected field to the target name of state values
  // Clear the error when input changes
  function handleOnChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = Validation.validateLogin(values);
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      try {
        setLoading(true);
        await loginUser(values.email, values.password);
        setLoading(false);
      } catch (error) {
        console.log(error);
        const errorMessage = ERROR.authError(error, AuthErrorCodes);
        setFirebaseError(errorMessage.firebaseError);
        setLoading(false);
      }
    }
  }

  return (
    <>
      <motion.form
        variants={popUpItem}
        className="relative flex w-[24rem] flex-1 flex-col items-center gap-4 rounded-2xl bg-white px-8 pb-8  shadow-sm"
        onSubmit={handleSubmit}
      >
        {props.cancelable && (
          <motion.button
            variants={popUpItem}
            className="absolute left-4 top-4"
            type="button"
            onClick={props.onCancelClick}
          >
            <IoChevronBack size={24} />
          </motion.button>
        )}
        {/* <div className="h-24 min-w-[96px] rounded-full border bg-gradient-to-br from-cyan-100 to-cyan-500"></div> */}
        <div className="mt-6 rounded-full p-2">
          <img src={dtoLogo} alt="DTO logo" className="h-14 w-14" />
        </div>

        {firebaseError && (
          <motion.div
            variants={popUpItem}
            className="w-full rounded-md bg-red-500 p-1 text-center"
          >
            <span className="text-xs text-white">{firebaseError}</span>
          </motion.div>
        )}
        <FormInput
          name="email"
          type="email"
          value={values.email}
          placeholder="Email@example.com"
          error={error.email}
          onChange={handleOnChange}
          showEmailIcon
        />
        <FormInput
          name="password"
          type="password"
          value={values.password}
          placeholder="Password"
          error={error.password}
          onChange={handleOnChange}
          showPasswordIcon
          enableShowPassword
        />
        <DtoButton
          loading={loading}
          primary
          width="full"
          rounded="lg"
          buttonText="Login"
          type="submit"
        />
      </motion.form>
    </>
  );
}

export default LoginForm;
