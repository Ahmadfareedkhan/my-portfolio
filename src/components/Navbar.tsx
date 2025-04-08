
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Brain, Code, FileText, Github, GraduationCap, Home, Linkedin, Mail, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
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
        
        {/* Social Links - Desktop */}
        <div className="hidden md:flex items-center gap-2">
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
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
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
                    document.body.click(); // Close the sheet
                  }}
                  className="justify-start gap-2"
                >
                  {item.icon}
                  {item.name}
                </Button>
              ))}
              
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
    </header>
  );
};

export default Navbar;
