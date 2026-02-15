
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12">
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start animate-fade-in">
        <div className="order-2 md:order-1 md:flex-1">
          <p className="text-tech-teal font-medium mb-3">Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Ahmad Fareed Khan
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 gradient-text">
            AI Engineer for LLM Apps, Automation and Computer Vision
          </h2>
          <p className="text-lg max-w-2xl mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            I help startups and teams turn AI ideas into production-ready systems that reduce manual effort,
            improve response quality, and ship faster. With 3+ years of applied AI delivery, I build
            reliable solutions across LLM workflows, intelligent automation, and data-driven products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-md border border-border/70 bg-card/80 p-3">
              <p className="text-lg font-semibold text-tech-teal">3+ Years</p>
              <p className="text-xs text-muted-foreground">Applied AI delivery experience</p>
            </div>
            <div className="rounded-md border border-border/70 bg-card/80 p-3">
              <p className="text-lg font-semibold text-tech-teal">50%</p>
              <p className="text-xs text-muted-foreground">Manual effort reduction in production workflows</p>
            </div>
            <div className="rounded-md border border-border/70 bg-card/80 p-3">
              <p className="text-lg font-semibold text-tech-teal">30%</p>
              <p className="text-xs text-muted-foreground">Server cost reduction on AI media pipeline</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-md border border-border/70 bg-card/70 p-4">
              <h3 className="font-semibold mb-1">LLM Product Features</h3>
              <p className="text-sm text-muted-foreground">RAG, multi-agent workflows, and production-grade AI assistants.</p>
            </div>
            <div className="rounded-md border border-border/70 bg-card/70 p-4">
              <h3 className="font-semibold mb-1">Workflow Automation</h3>
              <p className="text-sm text-muted-foreground">Automations that replace repetitive work and improve team throughput.</p>
            </div>
            <div className="rounded-md border border-border/70 bg-card/70 p-4">
              <h3 className="font-semibold mb-1">AI Data Pipelines</h3>
              <p className="text-sm text-muted-foreground">Reliable extraction, validation, scheduling, and analytics pipelines.</p>
            </div>
            <div className="rounded-md border border-border/70 bg-card/70 p-4">
              <h3 className="font-semibold mb-1">Computer Vision Solutions</h3>
              <p className="text-sm text-muted-foreground">Vision-powered systems for recognition, media, and quality checks.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            <Button onClick={scrollToContact} className="bg-tech-blue hover:bg-tech-blue/90">
              Start a Project
            </Button>
            <Button variant="secondary" onClick={scrollToProjects} className="bg-tech-teal/90 hover:bg-tech-teal text-white">
              View Case Studies
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

        <div className="order-1 md:order-2 flex justify-center md:flex-1 md:justify-end md:pt-2">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-tech-teal shadow-xl">
              <img
                src="/lovable-uploads/profile.jpeg"
                alt="Ahmad Fareed Khan"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-tech-blue/10 to-tech-teal/10"></div>
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
