
import { createRoot } from "react-dom/client";
import React from 'react';
import App from "./App.tsx";
import { EventProvider } from "./context/EventContext";
import { AuthProvider } from "./context/AuthContext";
import { GalleryProvider } from "./context/GalleryContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <GalleryProvider>
          <App />
        </GalleryProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);


