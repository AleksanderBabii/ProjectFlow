import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

const PublicRoute = ({
  children,
}: Props) => {
  const token = useAuthStore(
    (state) => state.token
  );

  if (token) {
    return (
      <Navigate to="/dashboard" />
    );
  }

  return children;
};

export default PublicRoute;