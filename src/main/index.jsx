import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { SignIn, SignUp } from "../auth";

import { Trello } from "../trello";

export const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/project" element={<Trello />} />
      </Routes>
    </Router>
  );
};
