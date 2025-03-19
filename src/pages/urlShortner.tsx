import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, QrCode, Share2, Loader2 } from "lucide-react";
import { QrCodeModal } from "@/components/myComponents/qr-modal";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { NavLink } from "react-router-dom";
import { MagicCard } from "@/components/magicui/magic-card";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const { isSignedIn } = useAuth();

  const { toast } = useToast();

  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast({
        title: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 8);
      setShortUrl(`https://linksnap.io/${randomString}`);
      setLoading(false);

      toast({
        title: "URL shortened successfully!",
        description: "Your shortened URL is ready to share.",
      });
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    toast({
      title: "Copied to clipboard!",
      description: "Your shortened URL has been copied.",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out my shortened URL",
        text: "I've shortened a URL with LinkSnap",
        url: shortUrl,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <section id="shorten" className="w-full py-14">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl">
            Build stronger digital connections
          </h2>
          <p className="mt-4 text-muted-foreground">
            Use our URL shortener, QR Codes to engage your audience and connect
            them to the right information. Build, edit, and track everything
            inside the Linksnap Connections Platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-xl"
        >
          <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
            <MagicCard gradientSize={250}>
              <CardHeader>
                <CardTitle>URL Shortener</CardTitle>
                {/* <CardDescription>
                {user
                  ? "Create and track your shortened URLs"
                  : "Sign up to track and manage your links"}
              </CardDescription> */}
              </CardHeader>
              <CardContent>
                <form onSubmit={shortenUrl} className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Input
                      type="url"
                      placeholder="Enter your long URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/80 hover:to-blue-500/80"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Shortening...
                      </>
                    ) : (
                      "Shorten URL"
                    )}
                  </Button>
                </form>

                <AnimatePresence>
                  {shortUrl && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="font-medium mb-2">Your shortened URL:</p>
                        <div className="flex items-center">
                          <Input value={shortUrl} readOnly className="mr-2" />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={copyToClipboard}
                            className="flex-shrink-0"
                          >
                            {copied ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowQrCode(true)}
                            className="flex items-center gap-1"
                          >
                            <QrCode className="h-4 w-4" />
                            QR Code
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={shareUrl}
                            className="flex items-center gap-1"
                          >
                            <Share2 className="h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                {isSignedIn ? (
                  <p>Your links are saved to your account</p>
                ) : (
                  <p>
                    <NavLink
                      to="/register"
                      className="text-primary hover:underline"
                    >
                      Sign up ‎
                    </NavLink>{" "}
                    to track and manage your link
                  </p>
                )}
              </CardFooter>
            </MagicCard>
          </Card>
        </motion.div>
      </div>

      <QrCodeModal
        open={showQrCode}
        onOpenChange={setShowQrCode}
        url={shortUrl}
      />
    </section>
  );
}
