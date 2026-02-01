
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Database, ExternalLink, Github, Lock, MessageSquare, Terminal, Video } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "2nd Brain CRM",
      description: "Multi-agent CRM system with conversational AI capabilities",
      icon: <Brain className="h-8 w-8 text-tech-blue" />,
      tags: ["LangChain", "Supabase", "RAG", "Multi-Agent", "API Integration"],
      features: [
        "Engineered multi-agent architecture using LangChain to create specialized agents",
        "Created a context-aware conversation management system",
        "Implemented vector search with pgvector in Supabase for RAG capabilities",
        "Integrated with multiple external services including Google Calendar, Gmail, Fireflies.ai",
        "Deployed a Slack interface allowing natural language interaction",
        "Built intelligent workflows that reason across different data sources"
      ],
      link: "https://www.thesecondbrain.io/",
      linkType: "demo"
    },
    {
      title: "Stock Exchange Data Platform",
      description: "Advanced data platform with agentic capabilities",
      icon: <Database className="h-8 w-8 text-tech-blue" />,
      tags: ["Selenium", "Streamlit", "Plotly", "SQLite", "PostgreSQL"],
      features: [
        "Implemented a Selenium-based web scraper with robust error handling",
        "Built a Streamlit dashboard with interactive visualizations using Plotly",
        "Designed a flexible dual-database system supporting SQLite and PostgreSQL",
        "Created an automated scheduling system with cron-based execution",
        "Incorporated data validation and gap detection algorithms",
        "Developed an agentic framework for future expansion"
      ],
      link: "https://github.com/TauricResearch/TradingAgents",
      linkType: "github"
    },
    {
      title: "Thumbly",
      description: "AI-powered video thumbnail generator",
      icon: <Video className="h-8 w-8 text-tech-blue" />,
      tags: ["Computer Vision", "FLUX", "Deepgram STT", "YouTube API"],
      features: [
        "Built an AI backend for YouTube, automating content analysis",
        "Used computer vision to analyze frames with vision models",
        "Added Deepgram STT for analyzing transcription"
      ],
      company: "Octaloop Technologies",
      link: "https://thumbly.ai/",
      linkType: "demo"
    },
    {
      title: "Anti-Spoofing Security System",
      description: "Facial recognition system with anti-spoofing capabilities",
      icon: <Lock className="h-8 w-8 text-tech-blue" />,
      tags: ["YOLO v8", "OpenCV", "Flutter", "CUDA"],
      features: [
        "An anti-spoofing model for facial recognition",
        "Designed to distinguish between genuine faces and fraudulent attempts",
        "Integrated with Flutter Mobile Application for Attendance System"
      ],
      company: "DevFusion",
      link: "https://github.com/Ahmadfareedkhan/Anti-Spoofing-Face-Recogntion-System",
      linkType: "github"
    },
    {
      title: "AI Lawyer",
      description: "AI-powered legal assistant platform",
      icon: <MessageSquare className="h-8 w-8 text-tech-blue" />,
      tags: ["OpenAI", "Voice Interaction", "Semantic Search", "UK Law"],
      features: [
        "Created an AI-powered legal assistant platform integrating OpenAI",
        "Designed end-to-end document analysis and contextual search features",
        "Enabling natural voice queries and dynamic conversation management"
      ],
      company: "Octaloop Technologies",
      link: "https://ailawyer.pro/",
      linkType: "demo"
    },
    {
      title: "Nutrition AI",
      description: "Voice-enabled nutrition assistant",
      icon: <Terminal className="h-8 w-8 text-tech-blue" />,
      tags: ["OpenAI GPT", "Gradio", "Hugging Face", "STT", "TTS"],
      features: [
        "Created a chatbot using the OpenAI GPT model and UI with Gradio",
        "Added STT and TTS models for voice interaction",
        "Used prompt engineering to build a relevant chatbot"
      ],
      type: "Opensource Contribution",
      link: "https://www.nutritionai.app/",
      linkType: "demo"
    }
  ];

  return (
    <section id="projects" className="py-16">
      <h2 className="section-heading">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className={`card-hover animate-fade-in`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="bg-muted rounded-md p-2 mr-4">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="mt-1">{project.description}</CardDescription>
                </div>
                {project.link && (
                  <Button variant="ghost" size="icon" asChild className="ml-2 shrink-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.linkType === "github" ? "View on GitHub" : "View live demo"}
                    >
                      {project.linkType === "github" ? (
                        <Github className="h-5 w-5" />
                      ) : (
                        <ExternalLink className="h-5 w-5" />
                      )}
                    </a>
                  </Button>
                )}
              </div>
              {(project.company || project.type) && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {project.company || project.type}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-outside ml-5 space-y-1 text-sm">
                {project.features.map((feature, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-xs bg-gray-100 dark:bg-gray-800"
                >
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
