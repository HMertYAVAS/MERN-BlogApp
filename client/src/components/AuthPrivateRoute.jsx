import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ?   <Navigate to={"/"} /> : <Outlet />;
}