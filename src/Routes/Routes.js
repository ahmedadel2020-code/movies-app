import React from "react";
import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/Details";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
