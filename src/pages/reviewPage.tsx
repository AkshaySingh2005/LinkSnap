import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useMemo } from "react";

const ReviewPage = () => {
  // Use useMemo to prevent recreating this array on every render
  const testimonials = useMemo(
    () => [
      {
        quote:
          "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
        name: "Sarah Chen",
        designation: "Product Manager at TechFlow",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop", // Reduced size
      },
      {
        quote:
          "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
        name: "Michael Rodriguez",
        designation: "CTO at InnovateSphere",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", // Reduced size
      },
      {
        quote:
          "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
        name: "Emily Watson",
        designation: "Operations Director at CloudScale",
        src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=400&auto=format&fit=crop", // Reduced size
      },
      {
        quote:
          "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
        name: "James Kim",
        designation: "Engineering Lead at DataPro",
        src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=400&auto=format&fit=crop", // Reduced size
      },
      {
        quote:
          "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
        name: "Lisa Thompson",
        designation: "VP of Technology at FutureNet",
        src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop", // Reduced size
      },
    ],
    []
  );

  return (
    <div>
      <div className="text-center py-12  ">
        <h2 className="text-4xl font-bold tracking-tight sm:text-4xl">
          What our customers are saying ...
        </h2>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
};

export default ReviewPage;
