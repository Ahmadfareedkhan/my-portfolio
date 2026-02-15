
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BriefcaseBusiness, Database, ExternalLink, Github, Lock, MessageSquare, Terminal, Video } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Automated Tariff Classification Assistant",
      description: "TenX client delivery for PwC: agentic classification workflow for trade operations",
      role: "Associate Data Scientist",
      company: "TenX",
      icon: <BriefcaseBusiness className="h-8 w-8 text-tech-blue" />,
      tags: ["LangChain", "OpenAI", "Agentic AI", "Automation"],
      features: [
        "Challenge: tariff classification was manual, slow, and expensive to scale.",
        "Built an AI agentic pipeline for automated tariff classification and reasoning support.",
        "Integrated validation logic to improve consistency across complex category mappings.",
        "Impact: reduced manual effort by ~50% and improved operational turnaround."
      ],
      linkType: "demo"
    },
    {
      title: "2nd Brain CRM",
      description: "Multi-agent CRM system with conversational AI capabilities",
      role: "AI Engineer",
      company: "Product Build",
      icon: <Brain className="h-8 w-8 text-tech-blue" />,
      tags: ["LangChain", "Supabase", "RAG", "Multi-Agent", "API Integration"],
      features: [
        "Engineered multi-agent architecture with specialized agents for sales and operations.",
        "Implemented vector search with pgvector in Supabase for contextual RAG workflows.",
        "Integrated external services including Google Calendar, Gmail, and Fireflies.ai.",
        "Deployed Slack-based interaction for fast team adoption and execution."
      ],
      link: "https://www.thesecondbrain.io/",
      linkType: "demo"
    },
    {
      title: "JADOC V3 (Pearson TenX)",
      description: "Production ML engine mapping unstructured job ads to standardized occupations at massive scale",
      role: "Sole ML Engineer (End-to-End Owner)",
      company: "TenX for Pearson/Faethm",
      icon: <BriefcaseBusiness className="h-8 w-8 text-tech-blue" />,
      tags: ["Databricks", "PySpark", "SageMaker", "MLflow", "FAISS", "FP16"],
      features: [
        "Owned V3 end-to-end: model training on SageMaker, calibration, Databricks/Spark inference, and production delivery for 600M job ads (AU, CA, UK, US).",
        "Implemented a two-stage ranking pipeline (bi-encoder retrieval + cross-encoder reranking) with hard-negative mining (2.5M+ pairs).",
        "Improved quality from 12.48% to 65.13% top-1 cross-encoder accuracy; raised end-to-end pipeline accuracy from 10.47% to 62.24%.",
        "Built FP16 + partitioning optimizations, reducing projected 600M-run cost from ~$48K to ~$12K and runtime from ~23 days to ~4.7 days.",
        "Validated scale in production: processed 20.9M US records in ~12 hours using autoscaling Databricks GPU workers."
      ],
      type: "Client Project"
    },
    {
      title: "Real-Time Voice Sales Assistant",
      description: "Real-time voice sales assistant powered by LiveKit, LangGraph, and GPT-4o",
      role: "AI Engineer",
      company: "DevInsignia",
      icon: <MessageSquare className="h-8 w-8 text-tech-blue" />,
      tags: ["LiveKit", "LangGraph", "GPT-4o", "RAG", "Cartesia", "Deepgram", "FAISS", "Cohere Rerank"],
      features: [
        "Built a real-time voice sales agent with LangGraph orchestration and GPT-4o streaming.",
        "Implemented RAG with FAISS/Qdrant and Cohere reranking for product knowledge retrieval.",
        "Integrated Cartesia and Deepgram STT/TTS with expressive emotion control.",
        "Automated demo scheduling with calendar invites and async email delivery."
      ],
      link: "https://voice-assistant-frontend-27bufa.sandbox.livekit.io/",
      linkType: "demo"
    },
    {
      title: "Stock Exchange Data Platform",
      description: "Advanced data platform with agentic capabilities",
      role: "ML Engineer",
      company: "Data Product",
      icon: <Database className="h-8 w-8 text-tech-blue" />,
      tags: ["Selenium", "Streamlit", "Plotly", "SQLite", "PostgreSQL"],
      features: [
        "Built resilient Selenium ingestion pipelines with robust retry and validation logic.",
        "Designed dual-database architecture supporting SQLite and PostgreSQL deployment modes.",
        "Developed Streamlit dashboards with Plotly for quick operational insights.",
        "Automated scheduling and data quality checks for reliable recurring runs."
      ],
      link: "https://github.com/TauricResearch/TradingAgents",
      linkType: "github"
    },
    {
      title: "Thumbly",
      description: "AI-powered video thumbnail generator",
      role: "AI Developer",
      icon: <Video className="h-8 w-8 text-tech-blue" />,
      tags: ["Computer Vision", "FLUX", "Deepgram STT", "YouTube API"],
      features: [
        "Built AI backend to automate video frame and context analysis for thumbnail generation.",
        "Applied computer vision models to rank visually engaging moments from content.",
        "Integrated Deepgram STT signals to align imagery with spoken context."
      ],
      company: "Octaloop Technologies",
      link: "https://thumbly.ai/",
      linkType: "demo"
    },
    {
      title: "Anti-Spoofing Security System",
      description: "Facial recognition system with anti-spoofing capabilities",
      role: "ML Engineer",
      icon: <Lock className="h-8 w-8 text-tech-blue" />,
      tags: ["YOLO v8", "OpenCV", "Flutter", "CUDA"],
      features: [
        "Developed anti-spoofing detection for attendance-grade face recognition.",
        "Trained and optimized model behavior using YOLOv8, OpenCV, and CUDA tooling.",
        "Integrated the detection pipeline into a Flutter-based mobile attendance workflow."
      ],
      company: "DevFusion",
      link: "https://github.com/Ahmadfareedkhan/Anti-Spoofing-Face-Recogntion-System",
      linkType: "github"
    },
    {
      title: "AI Lawyer",
      description: "AI-powered legal assistant platform",
      role: "AI Developer",
      icon: <MessageSquare className="h-8 w-8 text-tech-blue" />,
      tags: ["OpenAI", "Voice Interaction", "Semantic Search", "UK Law"],
      features: [
        "Built legal assistant workflows for document understanding and contextual retrieval.",
        "Implemented voice interaction and dynamic follow-up handling for user queries.",
        "Designed conversation management with summary-aware context retention."
      ],
      company: "Octaloop Technologies",
      link: "https://ailawyer.pro/",
      linkType: "demo"
    },
    {
      title: "Nutrition AI",
      description: "Voice-enabled nutrition assistant",
      role: "Contributor",
      icon: <Terminal className="h-8 w-8 text-tech-blue" />,
      tags: ["OpenAI GPT", "Gradio", "Hugging Face", "STT", "TTS"],
      features: [
        "Built GPT-based conversational nutrition assistant with Gradio interface.",
        "Integrated STT and TTS modules for voice-first interactions.",
        "Applied prompt engineering to improve relevance and conversational quality."
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
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.role && (
                      <Badge variant="outline" className="text-xs border-tech-teal/50 text-tech-teal">
                        {project.role}
                      </Badge>
                    )}
                    {project.company && (
                      <Badge variant="secondary" className="text-xs">
                        {project.company}
                      </Badge>
                    )}
                  </div>
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
              {project.type && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs border-dashed">
                    {project.type}
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
