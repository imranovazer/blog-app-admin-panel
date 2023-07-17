import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RoutesList from "./router/routes";
import About from "./pages/About";

console.log(RoutesList);
function App() {
  return (
    <>
      {console.log(RoutesList)}
      <Routes>
        {RoutesList.map((item, index) => (
          <Route path={item.path} element={item.element} key={index} />
        ))}
      </Routes>
    </>
  );
}

export default App;
