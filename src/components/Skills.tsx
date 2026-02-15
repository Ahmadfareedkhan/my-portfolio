
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Skills = () => {
  const skillGroups = [
    {
      title: "Core Strengths",
      description: "Technologies I use most often in paid client delivery.",
      skills: [
        {
          name: "LLM Applications (RAG, Agents)",
          proficiency: "Expert",
          proof: "Built multi-agent workflows and retrieval systems for client products."
        },
        {
          name: "Python & AI Backends",
          proficiency: "Expert",
          proof: "Primary language for production AI services, APIs, and automations."
        },
        {
          name: "NLP & Semantic Retrieval",
          proficiency: "Advanced",
          proof: "Delivered context-aware assistants and domain-specific search features."
        },
        {
          name: "Computer Vision",
          proficiency: "Advanced",
          proof: "Shipped CV solutions for media automation and anti-spoofing workflows."
        }
      ]
    },
    {
      title: "Frameworks & Tools",
      description: "Stack used to move from prototype to reliable user-facing workflows.",
      skills: [
        {
          name: "LangChain / LCEL / LangGraph",
          proficiency: "Expert",
          proof: "Designed maintainable orchestration chains and task-specialized agents."
        },
        {
          name: "FastAPI / Flask / Streamlit",
          proficiency: "Advanced",
          proof: "Built APIs and dashboards for rapid deployment and stakeholder testing."
        },
        {
          name: "Selenium / Data Extraction",
          proficiency: "Advanced",
          proof: "Implemented scraping + scheduling + validation for data platforms."
        },
        {
          name: "OpenAI Ecosystem",
          proficiency: "Advanced",
          proof: "Integrated completion, voice, and retrieval capabilities in production flows."
        }
      ]
    },
    {
      title: "Cloud & Delivery",
      description: "Infrastructure and data foundations to keep systems stable in production.",
      skills: [
        {
          name: "PostgreSQL / SQLite / Supabase",
          proficiency: "Advanced",
          proof: "Designed dual-database and vector-enabled data models for AI apps."
        },
        {
          name: "AWS / Azure / GCP",
          proficiency: "Working Proficiency",
          proof: "Deploy and maintain cloud-hosted AI services for client needs."
        },
        {
          name: "MLOps & Optimization",
          proficiency: "Advanced",
          proof: "Improved cost-efficiency and throughput across AI media pipelines."
        },
        {
          name: "Git, CI Workflows, QA",
          proficiency: "Advanced",
          proof: "Versioned delivery with reproducible releases and collaboration standards."
        }
      ]
    },
    {
      title: "Client Collaboration",
      description: "How I work with teams to reduce delivery risk and increase clarity.",
      skills: [
        {
          name: "Requirements to Execution",
          proficiency: "Expert",
          proof: "Translate vague business requirements into practical technical milestones."
        },
        {
          name: "Stakeholder Communication",
          proficiency: "Advanced",
          proof: "Provide concise updates, tradeoffs, and clear next steps."
        },
        {
          name: "Problem Solving Under Constraints",
          proficiency: "Expert",
          proof: "Balance speed, quality, and cost for deadline-sensitive projects."
        },
        {
          name: "Team Collaboration",
          proficiency: "Advanced",
          proof: "Work smoothly with product, engineering, and non-technical stakeholders."
        }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16">
      <h2 className="section-heading">Skills & Expertise</h2>
      <p className="mb-8 text-sm md:text-base text-muted-foreground max-w-3xl">
        Skill labels reflect real delivery depth: <strong>Expert</strong>, <strong>Advanced</strong>, and
        <strong> Working Proficiency</strong>. I prioritize business outcomes over inflated self-ratings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, groupIndex) => (
          <Card
            key={group.title}
            className="card-hover animate-fade-in"
            style={{ animationDelay: `${groupIndex * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.name} className="rounded-md border border-border/70 bg-muted/20 p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm md:text-base">{skill.name}</h3>
                    <Badge
                      variant={skill.proficiency === "Expert" ? "default" : "secondary"}
                      className={skill.proficiency === "Expert" ? "bg-tech-teal text-white hover:bg-tech-teal/90" : ""}
                    >
                      {skill.proficiency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.proof}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
