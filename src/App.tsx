import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/main/homepage";
import LoginPage from "./pages/main/loginPage";
import RegisterPage from "./pages/main/registerPage";
import DashboardPage from "./pages/dashboard/dashboardpage";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "./components/ui/toaster";

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
    <>
      <Toaster />
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
    </>
  );
};

export default App;
