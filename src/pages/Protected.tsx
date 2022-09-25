import { Navigate } from "react-router-dom";

interface ProtectedProps {
  isLoggedIn: boolean;
  children: any
}

const Protected = (props: ProtectedProps) => {

  if (!props.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export default Protected;