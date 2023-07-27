import React, { useState } from "react";

import { createContext } from "react";
import AlertInvertedColors from "../components/AlertInvertedColors";
export const AlertContex = createContext(null);

function AlertContexProvider({ children }) {
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertContent, setAlertContent] = useState();

  const displayAlert = (type, content) => { 
    setAlertType(type);
    setAlertContent(content);
    setAlert(true);
  };

  return (
    <AlertContex.Provider value={{ displayAlert }}>
      {children}
      <AlertInvertedColors
        display={alert}
        type={alertType}
        setDisplay={setAlert}
        content={alertContent}
      />
    </AlertContex.Provider>
  );
}

export default AlertContexProvider;
