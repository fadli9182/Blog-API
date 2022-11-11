import React from "react";
import { Route, Routes } from "react-router";
import Home from "./cobalogin/Home";
import Login from "./cobalogin/Login";
import Register from "./cobalogin/Register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
