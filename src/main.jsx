import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SavedProvider } from "./context/SavedContext";
import { FeedProvider } from "./context/FeedContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SavedProvider>
        <FeedProvider>
          <App />
        </FeedProvider>
      </SavedProvider>
    </BrowserRouter>
  </StrictMode>
);
