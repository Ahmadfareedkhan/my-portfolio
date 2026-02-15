
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      title: "Associate Data Scientist",
      company: "TenX",
      period: "June 2025 - Present",
      location: "Lahore, Pakistan - Hybrid",
      achievements: [
        "Challenge: job postings were difficult to classify consistently at scale. Built: transformer-based classification pipelines for Pearson job taxonomy mapping. Impact: improved categorization quality and reduced manual review overhead.",
        "Challenge: tariff classification was slow and human-dependent for PwC workflows. Built: an AI agentic system using LangChain + OpenAI for automated classification. Impact: reduced manual effort by ~50% and accelerated processing."
      ]
    },
    {
      title: "Machine Learning Engineer",
      company: "Zortik Technologies",
      period: "April 2025 - May 2025",
      location: "Kelowna, Canada - Remote",
      achievements: [
        "Challenge: developers needed faster, context-aware coding support. Built: a code assistant agent for repository-level analysis and guided suggestions. Impact: improved developer productivity and response relevance.",
        "Challenge: brittle chain orchestration made extensions hard. Built: modular LCEL pipelines for maintainable agent orchestration. Impact: easier scaling and cleaner integration of new capabilities.",
        "Challenge: retrieval quality was limiting answer accuracy. Built: BM25 + RAG retrieval stack for contextual snippet and documentation fetching. Impact: more precise code assistance and fewer irrelevant responses."
      ]
    },
    {
      title: "AI Developer",
      company: "Octaloop Technologies",
      period: "June 2024 - March 2025",
      location: "Lahore, Pakistan - On-site",
      achievements: [
        "Challenge: creators needed faster thumbnail production. Built: Thumbly, an AI-driven thumbnail generation service with low-friction user input. Impact: significantly reduced creative turnaround time.",
        "Challenge: legal teams needed quicker access to reliable legal context. Built: AI Lawyer with voice interaction, semantic search, and document intelligence for UK law. Impact: improved answer speed and legal workflow efficiency.",
        "Challenge: media highlight generation was infrastructure-heavy. Built: AI pipelines for YouTube/Twitch highlight extraction and optimization. Impact: reduced server cost by ~30% without losing output quality."
      ]
    },
    {
      title: "Associate AI Engineer",
      company: "Zikra Infotech LLC",
      period: "May 2024 - March 2025",
      location: "Plano, Texas, United States - Remote",
      achievements: [
        "Challenge: fragmented communication tools hurt operational efficiency. Built: Z360, an AI-enabled SaaS platform combining chat, calling, and voice agents. Impact: improved workflow centralization for business teams.",
        "Challenge: conversational agents needed better quality at lower cost. Built: Pipecat-based improvements for voice agent accuracy and orchestration. Impact: reduced operational costs by 50-60%."
      ]
    },
    {
      title: "Machine Learning Engineer & Python Developer",
      company: "Falcon IT Consulting",
      period: "December 2023 - May 2024",
      location: "Lahore, Pakistan",
      achievements: [
        "Challenge: e-commerce sizing mismatch increased returns and friction. Built: AI body measurement and footwear sizing with OpenCV + MediaPipe. Impact: improved sizing confidence for end users.",
        "Challenge: proposal writing consumed team bandwidth. Built: NLP chatbot for proposal generation automation. Impact: reduced preparation cost and improved client response quality."
      ]
    },
    {
      title: "Machine Learning Intern",
      company: "DevFusion",
      period: "August 2023 - December 2023",
      location: "Lahore, Pakistan",
      achievements: [
        "Challenge: attendance systems were vulnerable to spoofing attacks. Built: anti-spoofing face recognition attendance solution using OpenCV, YOLOv8, and CUDA acceleration. Impact: stronger verification reliability.",
        "Challenge: customer support needed faster, smarter responses. Built: TensorFlow NLP chatbot for a cosmetics business. Impact: increased engagement by 30% and improved response accuracy by 25%."
      ]
    }
  ];

  return (
    <section id="experience" className="py-16">
      <h2 className="section-heading">Professional Experience</h2>
      <p className="mb-8 text-sm md:text-base text-muted-foreground max-w-3xl">
        3+ years delivering AI systems across product, automation, and operations. Each role focuses on
        solving a business problem, building production-ready solutions, and driving measurable impact.
      </p>

      <div className="relative pl-6 border-l-2 border-tech-teal/30">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`mb-10 timeline-dot animate-slide-in`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <Badge className="bg-tech-teal text-white">{exp.company}</Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {exp.period} | {exp.location}
            </p>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <ul className="list-disc list-outside ml-5 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
