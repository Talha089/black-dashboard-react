import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "layouts/Admin/Admin.js";
import Login from "./views/Login/index.js";
import PrivateRoute from './store/PrivateRoute.js';

function App() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
