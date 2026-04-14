
import { createRoot } from "react-dom/client";
import React from 'react';
import App from "./App.tsx";
import "./styles/globals.css";

// Capture invite/recovery flow indicator before Supabase processes and clears the URL.
// AdminLogin is lazy-loaded, so by the time it mounts the ?code= param may already be gone.
if (window.location.search.includes('code=') || window.location.hash.includes('type=invite') || window.location.hash.includes('type=recovery')) {
    sessionStorage.setItem('supabase_invite_flow', '1');
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
