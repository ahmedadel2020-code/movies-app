import React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/Details";
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  );
};

export default Routes;
