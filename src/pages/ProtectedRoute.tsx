import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../store";
import { useAppSelector } from "../hooks/useRTK";

const ProtectedRoute = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { user } = useAppSelector((store) => store.user);

  if (!user) return <Navigate to="/landing" />;

  return children;
};

export default ProtectedRoute;
