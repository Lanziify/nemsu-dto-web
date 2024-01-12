import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: '/' })
    .catch(function (err) {
      console.log("Service worker registration failed", err);
    })
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);
