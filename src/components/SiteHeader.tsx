import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// Absolute, not bare hashes. The header renders on case study pages too, where
// "#work" resolves to /work/<slug>#work - a section that does not exist there,
// so the link silently does nothing. "/#work" scrolls on the home page and
// navigates home from anywhere else.
const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

/**
 * Deliberately quiet: a name, four links, a hairline that only appears once you
 * have scrolled past the opening statement. The header is not the design.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-rule bg-background/90 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <a href="/" className="text-[0.9375rem] font-medium tracking-tight hover:text-primary">
          {profile.name}
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="label transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-rule">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the page.
              </SheetDescription>
              <nav className="mt-12 flex flex-col" aria-label="Mobile">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-rule py-5 text-statement tracking-tight hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
