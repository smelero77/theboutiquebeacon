import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// PrivateRoute: Si el usuario está autenticado, renderiza los hijos; de lo contrario, redirige a Sign In.
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/authentication/sign-in" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
