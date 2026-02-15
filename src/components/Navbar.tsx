
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Brain, Code, FileText, Github, GraduationCap, Home, Linkedin, Mail, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", icon: <Home size={18} />, action: () => window.scrollTo(0, 0) },
    { name: "Experience", icon: <Code size={18} />, action: () => scrollToSection("experience") },
    { name: "Projects", icon: <Brain size={18} />, action: () => scrollToSection("projects") },
    { name: "Skills", icon: <FileText size={18} />, action: () => scrollToSection("skills") },
    { name: "Education", icon: <GraduationCap size={18} />, action: () => scrollToSection("education") },
    { name: "Contact", icon: <User size={18} />, action: () => scrollToSection("contact") }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold gradient-text">
          Ahmad Khan
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              onClick={item.action}
              className="text-sm font-medium"
            >
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Social Links & Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => scrollToSection("contact")}
            className="bg-tech-teal/90 hover:bg-tech-teal text-white"
          >
            Start Project
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/Ahmadfareedkhan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.linkedin.com/in/ahmad-ml-engineer-ai-expert"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="mailto:ahmadkhanfareed388@gmail.com"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    onClick={() => {
                      item.action();
                      setIsMobileOpen(false);
                    }}
                    className="justify-start gap-2"
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                ))}

                <Button
                  className="mt-2 bg-tech-teal hover:bg-tech-teal/90"
                  onClick={() => {
                    scrollToSection("contact");
                    setIsMobileOpen(false);
                  }}
                >
                  Start Project
                </Button>

                <div className="pt-4 mt-4 border-t flex gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com/Ahmadfareedkhan" target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.linkedin.com/in/ahmad-ml-engineer-ai-expert" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:ahmadkhanfareed388@gmail.com">
                      <Mail size={20} />
                    </a>
                  </Button>
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

