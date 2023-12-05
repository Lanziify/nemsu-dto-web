import "./App.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// Routes
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
// Public Pages
import Hero from "./pages/Hero";
import Notfound from "./pages/Notfound";
// Import user pages
import Home from "./pages/user/Home";
import Settings from "./pages/user/Settings";
import UserRequests from "./pages/user/Requests";
import History from "./pages/user/History";
// Import admin pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminRequests from "./pages/admin/Requests";
// Shared Pages
import Notifications from "./pages/Notifications";
import RequestDetails from "./pages/RequestDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Hero />} />
      </Route>

      <Route element={<ProtectedRoutes allowedUser={[true]} />}>
        <Route path="dashboard" index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="list/:tab" element={<AdminRequests />} />
        <Route path="list" element={<Navigate replace to="/list/pending" />} />
        <Route path="list/:tab/request/:id" element={<RequestDetails />} />
        <Route path="" element={<Navigate replace to="" />} />
      </Route>

      <Route element={<ProtectedRoutes allowedUser={[false]} />}>
        <Route path="home" index element={<Home />} />
        <Route path="request/:tab" element={<UserRequests />} />
        <Route
          path="request"
          element={<Navigate replace to="/request/pending" />}
        />
        <Route path="request/:tab/:requestId" element={<RequestDetails />} />
        <Route path="history" element={<History />} />
        <Route path="history/:status/:requestId" element={<RequestDetails />} />
        <Route path="" element={<Navigate replace to="" />} />
      </Route>

      <Route element={<ProtectedRoutes allowedUser={[true, false]} />}>
        <Route path="notifications" element={<Notifications />} />
        <Route path="notifications/request/:id" element={<RequestDetails />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
