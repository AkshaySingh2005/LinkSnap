import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";

const SiteHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <NavLink to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Link className="h-6 w-6 text-[#4387f6]" />
            </motion.div>
            <span className="font-bold text-[26px] flex items-center">
              Link<span className="text-[#4387f6]">Snap</span>
            </span>
          </NavLink>
        </motion.div>
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavLink
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </NavLink>
          </motion.div>
          {isSignedIn && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NavLink
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Dashboard
              </NavLink>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <SignOutButton>
                  <Button>Logout</Button>
                </SignOutButton>
                <span className="text-sm text-muted-foreground">
                  Hello, {user?.firstName || "User"}
                </span>
              </div>
            ) : (
              <>
                <NavLink to="/login">
                  <Button variant="ghost">Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button>Sign Up</Button>
                </NavLink>
              </>
            )}
            <ModeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
