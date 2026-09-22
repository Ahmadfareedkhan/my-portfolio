
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Brain, Code, FileText, Github, GraduationCap, Home, Linkedin, Mail, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const CONTACT_EMAIL = "ahmadkhanfareed388@gmail.com";
const GITHUB_URL = "https://github.com/Ahmadfareedkhan";
const LINKEDIN_URL = "https://www.linkedin.com/in/ahmad-ml-engineer-ai-expert";

// Real hrefs rather than scrollIntoView handlers: sections become deep-linkable
// (you can send a client straight to /#projects), crawlable as internal links,
// and keyboard/middle-click behave like normal links. Smooth scrolling still
// happens via `html { scroll-behavior: smooth }`, which the reduced-motion
// media query in index.css disables for users who ask for that.
const navItems = [
  { name: "Home", href: "#home", icon: <Home size={18} /> },
  { name: "Experience", href: "#experience", icon: <Code size={18} /> },
  { name: "Projects", href: "#projects", icon: <Brain size={18} /> },
  { name: "Skills", href: "#skills", icon: <FileText size={18} /> },
  { name: "Education", href: "#education", icon: <GraduationCap size={18} /> },
  { name: "Contact", href: "#contact", icon: <User size={18} /> }
];

const socialLinks = [
  { label: "GitHub", href: GITHUB_URL, icon: <Github size={20} />, external: true },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: <Linkedin size={20} />, external: true },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: <Mail size={20} />, external: false }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold gradient-text">
          Ahmad Khan
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1" aria-label="Main">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className="text-sm font-medium">
              <a href={item.href}>{item.name}</a>
            </Button>
          ))}
        </nav>

        {/* Social Links & Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="secondary"
            asChild
            className="bg-tech-teal/90 hover:bg-tech-teal text-white"
          >
            <a href="#contact">Start Project</a>
          </Button>
          {socialLinks.map((social) => (
            <Button key={social.label} variant="ghost" size="icon" asChild>
              <a
                href={social.href}
                aria-label={social.label}
                {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {social.icon}
              </a>
            </Button>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              {/* Radix requires both a title and a description on dialog content;
                  without them screen readers announce an unnamed dialog. */}
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the page, or open a social or email link.
              </SheetDescription>
              <nav className="flex flex-col space-y-4 mt-6" aria-label="Mobile">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    asChild
                    className="justify-start gap-2"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <a href={item.href}>
                      {item.icon}
                      {item.name}
                    </a>
                  </Button>
                ))}

                <Button
                  className="mt-2 bg-tech-teal hover:bg-tech-teal/90"
                  asChild
                  onClick={() => setIsMobileOpen(false)}
                >
                  <a href="#contact">Start Project</a>
                </Button>

                <div className="pt-4 mt-4 border-t flex gap-2">
                  {socialLinks.map((social) => (
                    <Button key={social.label} variant="outline" size="icon" asChild>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {social.icon}
                      </a>
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
