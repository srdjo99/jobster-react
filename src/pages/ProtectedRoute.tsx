import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../store";

const ProtectedRoute = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { user } = useSelector((store: RootState) => store.user);

  if (!user) return <Navigate to="/landing" />;

  return children;
};

export default ProtectedRoute;
