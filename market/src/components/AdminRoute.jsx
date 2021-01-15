/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const AdminRoute = ({ component: Component, ...rest }) => {
  const UserSignInReducer = useSelector((state) => state.UserSignInReducer);
  const { UserInfo } = UserSignInReducer;

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          UserInfo && UserInfo.isAdmin ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  );
};

export default AdminRoute;
