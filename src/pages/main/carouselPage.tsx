import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";

interface Testimonial {
  industry: string;
  title: string;
  description: string;
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      industry: "RETAIL",
      title: "Attract customers and keep loyal shoppers coming back",
      description:
        "Whether you're a brick-and-mortar shop or a major department store, LinkSnap makes it easy to manage and track your in-person and online retail customer connections.",
    },
    {
      industry: "CONSUMER PACKAGED GOODS",
      title: "Thriving brands start with raving fans and powerful connections",
      description:
        "Give consumers the power to learn about your products and interact directly with your brand. It's all possible with LinkSnap, the loved-by-millions solution for CPG brands.",
    },
    {
      industry: "HOSPITALITY",
      title: "Delight your guests with their every need via digital solutions",
      description:
        "Helping customers find information and make reservations, making it convenient and accessible - it's all possible with LinkSnap.",
    },
    {
      industry: "MARKETING",
      title: "Track campaign performance with precision analytics",
      description:
        "Optimize your marketing efforts by understanding which channels drive the most engagement. LinkSnap provides detailed analytics for every shortened link.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance slides every 5 seconds
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       nextSlide()
  //     }, 5000)
  //     return () => clearInterval(interval)
  //   }, [])

  // Calculate visible testimonials (current and next two)
  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between mb-14 md:flex-row">
          <h3 className="text-2xl  font-bold tracking-tight text-center md:text-left sm:text-4xl">
            <SparklesText
              text="See how other businesses use LinkSnap"
              sparklesCount={10}
            />
          </h3>
          <div className="flex mt-4 space-x-2 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.industry}-${index}`}
              className="h-full flex flex-col backdrop-blur-sm bg-background/80 border-primary/20 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {testimonial.industry}
                </p>
                <h3 className="text-xl font-bold">{testimonial.title}</h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                  {testimonial.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <a
                  href="#"
                  className="flex items-center text-[#4387f6] text-sm font-medium text-primary hover:underline"
                >
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </CardFooter>
              <div className="mt-4 p-4 bg-muted/20 rounded-b-lg">
                <div className="w-full h-40 bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Industry illustration</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
