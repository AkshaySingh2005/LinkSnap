import { SparklesText } from "@/components/magicui/sparkles-text";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, LineChart, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track clicks, geographic data, and referrers with detailed analytics.",
    },
    {
      icon: LineChart,
      title: "Performance Insights",
      description:
        "Gain valuable insights into your link performance and audience.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Your links are secure and always available when you need them.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <SparklesText text="Powerful Features" />
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage, track, and optimize your links in one
            place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full backdrop-blur-sm bg-background/80 border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                    <feature.icon className="h-6 w-6 text-[#7c3aed] dark:text-[#7c3aed]" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
