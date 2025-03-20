import SiteFooter from "@/components/myComponents/site-footer";
import SiteHeader from "@/components/myComponents/site-header";
import LandingHero from "./landingHeroPage";
import { UrlShortener } from "./urlShortner";

// import { lazy, Suspense } from "react";
import { TestimonialCarousel } from "./carouselPage";
import { Features } from "./FeaturesPage";

// Notes : implemet carousel for landing page see the bitly site later

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero />
        <UrlShortener />
        <Features />
        <TestimonialCarousel />
      </main>
      <SiteFooter />
    </div>
  );
};

export default HomePage;
