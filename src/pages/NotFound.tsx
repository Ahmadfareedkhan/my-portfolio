import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <div className="shell py-32">
          <p className="label">Error 404</p>
          <h1 className="mt-8 max-w-[16ch] text-display font-medium">Page not found.</h1>
          <p className="mt-8 max-w-measure text-lead text-muted-foreground">
            That page does not exist. The work and every case study are linked from the home page.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="/"
              className="group inline-flex items-baseline gap-2 text-[1.0625rem] font-medium text-primary"
            >
              Back to home
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a href="/#work" className="link-underline text-[1.0625rem] text-muted-foreground">
              See the work
            </a>
            <a href="/#contact" className="link-underline text-[1.0625rem] text-muted-foreground">
              Get in touch
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
