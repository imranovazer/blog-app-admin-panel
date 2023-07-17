import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RoutesList from "./router/routes";
import About from "./pages/About";
import ProectedRoute from "./router/ProectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
          <Route   element={<ProectedRoute shouldAuth={true}/>}>
              <Route path="/" element= {<Home/>} />
              <Route path="about" element={<About/>} /> 
          </Route>
          <Route  element ={<ProectedRoute  shouldAuth={false}/>}>
              <Route path="/login" element={<Login/>} />
          </Route>
          <Route path="/*" element={<h1>404</h1>}/>
      </Routes>
    
    </>
  );
}

export default App;
