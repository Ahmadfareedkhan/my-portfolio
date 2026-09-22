import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-tech-teal mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          That page doesn't exist. Everything lives on the main page — jump back
          in below.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild className="bg-tech-blue hover:bg-tech-blue/90 text-white">
            <a href="/">Back to home</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/#projects">View projects</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/#contact">Get in touch</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
