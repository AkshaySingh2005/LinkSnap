import { Meteors } from "@/components/magicui/meteors";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const LandingHero = () => {
  return (
    <section className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Meteors number={35} />
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              {/* <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              > */}
              <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                <TypingAnimation>Shorten, Share, Track !!!</TypingAnimation>
              </div>

              {/* </motion.h1> */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                Transform long, unwieldy links into short, memorable URLs. Track
                clicks, analyze traffic, and optimize your online presence.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              <NavLink to="/register">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </NavLink>
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
