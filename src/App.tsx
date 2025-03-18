import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DashboardPage from "./pages/dashboardpage";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show a loading state while Clerk is loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, redirect to the login page
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user is signed in, render the children
  return <>{children}</>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
