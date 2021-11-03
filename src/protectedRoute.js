import React from "react";
import { Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("loggedin") === "true") {
          return <Component {...props} />;
        } else {
          alert("Cannot perform this action");
          props.history.push("/login");
        }
      }}
    />
  );
};
