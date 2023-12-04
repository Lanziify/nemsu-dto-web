import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import ModalBackdrop from "../components/ModalBackdrop";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import RequestForm from "../components/RequestForm";
import MenuDrawer from "../components/MenuDrawer";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading, setError } from "../redux/requestSlice";
import Preloader from "../components/Preloader";
import { motion } from "framer-motion";
import { fadeDefault } from "../animations/variants";
import Portal from "../components/Portal";

function ProtectedRoutes({ allowedUser }) {
  const { user, userLoading, userToken } = useAuth();
  const dispatch = useDispatch();

  const dtoRequestsRef = collection(firestore, "requests");
  const dtoNotificatonsRef = collection(firestore, "notifications");
  const requestQuery = query(dtoRequestsRef, orderBy("createdAt", "desc"));
  const notification = query(dtoNotificatonsRef, where())
  const userRequestQuery = query(
    dtoRequestsRef,
    where("uid", "==", user ? user.uid : null),
    orderBy("createdAt", "desc")
  );

  const [adminRequestList, adminRequestFetchloading, adminError] =
    useCollectionData(requestQuery);
  const [userRequests, userRequestFetchloading, userError] =
    useCollectionData(userRequestQuery);

  const [isSidebarToggled, setIsSidebarToggled] = useState(true);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 960);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

  const handleDrawerToggle = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const setSidebar = (close) => {
    setIsSidebarToggled(close);
  };

  if (window.innerWidth <= 960 && isSidebarToggled && !showSidebar) {
    document.body.classList.add("dto-no-scroll");
  } else if (isCreatingRequest) {
    document.body.classList.add("dto-no-scroll");
  } else {
    document.body.classList.remove("dto-no-scroll");
  }

  const handleCreateRequest = () => {
    setIsCreatingRequest(true);
  };

  useEffect(() => {
    try {
      if (userToken?.claims.admin) {
        const stringyfiedList = JSON.stringify(adminRequestList);
        dispatch(setLoading(adminRequestFetchloading));
        if (stringyfiedList) {
          const parsedList = JSON.parse(stringyfiedList);
          dispatch(setData(parsedList));
        }
      } else {
        const stringyfiedList = JSON.stringify(userRequests);
        dispatch(setLoading(userRequestFetchloading));
        if (stringyfiedList) {
          const parsedList = JSON.parse(stringyfiedList);
          dispatch(setData(parsedList));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [adminRequestList, userRequests]);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 960);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!showSidebar) {
      setIsSidebarToggled(!isSidebarToggled);
    } else {
      setIsSidebarToggled(true);
    }
  }, [showSidebar]);

  if (userLoading || adminRequestFetchloading || userRequestFetchloading) {
    return <Preloader />;
  }

  return allowedUser.includes(userToken?.claims.admin) ? (
    <motion.div
      variants={fadeDefault}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="relative flex min-h-screen flex-col bg-white">
        <Navbar
          isToggled={handleDrawerToggle}
          isCreatingRequest={handleCreateRequest}
          setToggled={setSidebar}
        />
        <AnimatePresence>
          {isCreatingRequest && (
            <Portal>
              <ModalBackdrop onClick={() => setIsCreatingRequest(false)}>
                <RequestForm user={user} closeForm={setIsCreatingRequest} />
              </ModalBackdrop>
            </Portal>
          )}
        </AnimatePresence>
        <div className="mx-auto flex h-full w-full max-w-7xl gap-4 p-4">
          <Sidebar
            isToggled={showSidebar && isSidebarToggled}
            isAdmin={userToken.claims.admin}
          />
          <MenuDrawer
            isToggled={!showSidebar && isSidebarToggled}
            isAdmin={userToken.claims.admin}
            closeSidebar={setSidebar}
          />
          <main className="relative min-h-[calc(100vh_-_89px)] w-full min-w-0">
            <Outlet context={{ isAdmin: userToken.claims.admin }} />
          </main>
        </div>
      </div>
    </motion.div>
  ) : (
    <Navigate to="" />
  );
}

export default ProtectedRoutes;
