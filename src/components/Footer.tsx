
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 border-t">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg gradient-text">Ahmad Fareed Khan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI & Machine Learning Engineer
            </p>
          </div>
          
          <div className="flex items-center gap-3">
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
          <p className="mt-1">Built with React, TypeScript and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
