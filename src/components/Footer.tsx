
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <footer className="py-10 border-t">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg gradient-text">Ahmad Fareed Khan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI Engineer helping clients ship production-ready AI solutions
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Button
              variant="secondary"
              className="bg-tech-teal/90 hover:bg-tech-teal text-white"
              onClick={scrollToContact}
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
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} Ahmad Fareed Khan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
