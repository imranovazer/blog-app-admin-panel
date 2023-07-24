import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import AuthContexProvider from "./contex/AuthContex.jsx";
import AlertContexProvider from "./contex/AlertContex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContexProvider>
      <AlertContexProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertContexProvider>
    </AuthContexProvider>
  </React.StrictMode>
);
