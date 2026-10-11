import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/600.css";
import "@fontsource/chonburi/400.css";
import "@fontsource/aladin/400.css";
import "@fontsource/italiana/400.css";
import "./styles/base.css";
import "./styles/site.css";
import "./styles/responsive.css";
import "./styles/scenes.css";
import "./styles/features.css";
import "./styles/genie.css";
import "./styles/elements.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
