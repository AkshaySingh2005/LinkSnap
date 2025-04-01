import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/main/homepage";
import LoginPage from "./pages/main/loginPage";
import RegisterPage from "./pages/main/registerPage";
import DashboardPage from "./pages/dashboard/dashboardpage";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "./components/ui/toaster";
import { PageLoader } from "./components/myComponents/PageLoader";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Add slightly longer initial loading state for auth check
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!isLoaded || isInitialLoading) {
    return <PageLoader message="Navigating to your destination ✈️  ..." />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const SimpleLoader = ({ children }: { children: React.ReactNode }) => {
  const [homepageLoader, sethomepageLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      sethomepageLoader(false);
    }, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  });

  if (homepageLoader) {
    return <PageLoader message="Loading..." />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SimpleLoader>
            <HomePage />
          </SimpleLoader>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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

const App = () => {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
};
export default App;
