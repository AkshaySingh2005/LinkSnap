import { Meteors } from "@/components/magicui/meteors";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <section className="relative flex h-[535px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Meteors number={35} />
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                <TypingAnimation duration={60} className="text-[3.7rem]">
                  Shorten, Share, Track !!!
                </TypingAnimation>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                Transform long, unwieldy links into short, memorable URLs. Track
                clicks, analyze traffic, and optimize your online presence.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <NavLink to="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/80 hover:to-blue-500/80"
                >
                  Get Started
                </Button>
              </NavLink>
              {!isSignedIn && (
                <NavLink to="/register">
                  <Button size="lg" variant="outline">
                    Create Account
                  </Button>
                </NavLink>
              )}
              
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full  flex justify-center object-contain"
          >
            {" "}
            <BackgroundGradient animate={false}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="URL Shortener Dashboard"
                className="relative rounded-[22px] z-10  shadow-2xl border border-gray-200 dark:border-gray-700 "
              />
            </BackgroundGradient>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
