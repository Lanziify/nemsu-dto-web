import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeroHeader from "../components/HeroHeader";
import { motion } from "framer-motion";
import { fadeDefault } from "../animations/variants";

function PublicRoutes() {
  const { user, userToken } = useAuth();
  return !user ? (
    <motion.div
      variants={fadeDefault}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen flex-col bg-white"
    >
      <HeroHeader />
      <div className="mx-auto flex h-full w-full max-w-7xl">
        <main className="min-h-[calc(100vh_-_56px)] w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </motion.div>
  ) : userToken?.claims?.admin ? (
    <Navigate to={"dashboard"} />
  ) : (
    <Navigate to={"home"} />
  );
}

export default PublicRoutes;
