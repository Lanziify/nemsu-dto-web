import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { AuthErrorCodes } from "firebase/auth";
import { ERROR } from "../utils/error";
import Preloader from "../components/Preloader";

const UserAuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  // Login user with email and password
  async function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUserLoading(false);
      })
  }
  // Logout user
  async function logoutUser() {
    setUserLoading(true);
    return auth
      .signOut()
      .then(() => {
        setUserLoading(false);
      })
      .catch((error) => {
        setUserLoading(false);
        throw new Error(error);
      });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
      if (currentUser) {
        // Fetch the user's profile data
        currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            const profileData = idTokenResult;
            setUserToken(profileData);
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      } else {
        setUserToken(null);
      }
    });
    return unsubscribe;
  }, []);

  const value = { user, userLoading, loginUser, logoutUser, userToken };

  return (
    <UserAuthContext.Provider value={value}>
      {userLoading ? <Preloader /> : children}
    </UserAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserAuthContext);
}
