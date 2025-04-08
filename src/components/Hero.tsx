
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-10">
      <div className="flex flex-col md:flex-row gap-8 items-center animate-fade-in">
        <div className="order-2 md:order-1 md:flex-1">
          <p className="text-tech-teal font-medium mb-3">Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Ahmad Fareed Khan
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 gradient-text">
            AI & Machine Learning Engineer
          </h2>
          <p className="text-lg max-w-2xl mb-8 text-gray-700 dark:text-gray-300">
            I'm passionate about solving complex problems, building impactful AI applications, 
            and continuously learning new skills to develop practical solutions that positively 
            benefit users and society.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Button onClick={scrollToContact} className="bg-tech-blue hover:bg-tech-blue/90">
              Contact Me
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://github.com/Ahmadfareedkhan" target="_blank" rel="noopener noreferrer">
                <Github size={18} /> GitHub
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://www.linkedin.com/in/ahmad-ml-engineer-ai-expert" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 md:flex-1 flex justify-center">
          <div className="relative">
            <div className="max-w-[320px] md:max-w-[380px] h-auto">
              <img 
                src="/lovable-uploads/8eed2f86-93c5-4246-be01-3ad8eb5ef872.png" 
                alt="Ahmad Fareed Khan" 
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -right-6 h-20 bg-gradient-to-t from-background to-transparent z-[-1]"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
          className="animate-bounce"
        >
          <ArrowDown />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
