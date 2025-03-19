import SiteFooter from "@/components/myComponents/site-footer";
import SiteHeader from "@/components/myComponents/site-header";
import LandingHero from "./landingHeroPage";
import { UrlShortener } from "./urlShortner";
import ReviewPage from "./reviewPage";

// Notes : implemet carousel for landing page see the bitly site later

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero />
        <UrlShortener />
        <ReviewPage />

        {/* <Features />   */}
      </main>
      <SiteFooter />
    </div>
  );
};

export default HomePage;
