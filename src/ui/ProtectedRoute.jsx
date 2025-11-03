import { useUser } from "../services/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // check if user is authenticated
  const { isLoading, isAuthenticated } = useUser();

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // If authenticated, render the children

  return children;
}

export default ProtectedRoute;
