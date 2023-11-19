importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
});

const messaging = firebase.messaging();

// Handle incoming messages
messaging.onMessage((payload) => {
  // Customize how you handle the incoming message
  console.log('Foreground message received:', payload);
});

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.subtitle,
    icon: "http://localhost:5173/src/assets/logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// Export the messaging instance so it can be used elsewhere if needed
export default messaging;
