/** Identity, roles and capabilities. Kept out of components so copy edits
 *  never require touching layout. */

export const profile = {
  name: "Ahmad Fareed Khan",
  role: "AI Engineer",
  location: "Lahore, Pakistan, working remote",
  locationShort: "Lahore / Remote",
  email: "ahmadkhanfareed388@gmail.com",
  phone: "+92 332 070 2124",
  phoneHref: "tel:+923320702124",
  github: "https://github.com/Ahmadfareedkhan",
  linkedin: "https://www.linkedin.com/in/ahmad-ml-engineer-ai-expert",
  available: true,
  // Owner's stated figure. The listed roles start in 2023, so this is
  // surfaced next to the role list rather than as a standalone hero claim -
  // it reads as a summary of the evidence instead of an assertion above it.
  // Add pre-2023 freelance or academic entries to `roles` to close the gap.
  yearsExperience: "5+"
};

export type Role = {
  title: string;
  company: string;
  period: string;
  /** One line. The experience list is a scannable index, not a resume. */
  note: string;
};

export const roles: Role[] = [
  {
    title: "Associate Data Scientist",
    company: "TenX",
    period: "2025 —",
    note: "Occupation classification at 600M-record scale for Pearson; agentic tariff classification for PwC."
  },
  {
    title: "Machine Learning Engineer",
    company: "Zortik Technologies",
    period: "2025",
    note: "Repository-aware code assistant; modular LCEL orchestration and a BM25 + RAG retrieval stack."
  },
  {
    title: "AI Developer",
    company: "Octaloop Technologies",
    period: "2024 — 2025",
    note: "Thumbly and AI Lawyer; cut media-pipeline server cost by around 30% without losing output quality."
  },
  {
    title: "Associate AI Engineer",
    company: "Zikra Infotech",
    period: "2024 — 2025",
    note: "Z360 communications platform; Pipecat voice agents at 50 to 60% lower operating cost."
  },
  {
    title: "ML Engineer & Python Developer",
    company: "Falcon IT Consulting",
    period: "2023 — 2024",
    note: "Body-measurement sizing with OpenCV and MediaPipe; NLP proposal automation."
  },
  {
    title: "Machine Learning Intern",
    company: "DevFusion",
    period: "2023",
    note: "Anti-spoofing face recognition; TensorFlow support chatbot."
  }
];

/** Plain text, deliberately unranked. Self-rated proficiency badges are a
 *  resume convention that clients discount. */
export const capabilities = [
  {
    group: "Building",
    items: ["Python", "LangChain", "LangGraph", "FastAPI", "PyTorch", "Hugging Face"]
  },
  {
    group: "Retrieval & agents",
    items: ["RAG", "FAISS", "Qdrant", "pgvector", "Cohere Rerank", "Multi-agent orchestration"]
  },
  {
    group: "Scale & deployment",
    items: ["Databricks", "PySpark", "SageMaker", "MLflow", "AWS", "Docker"]
  },
  {
    group: "Vision & speech",
    items: ["OpenCV", "YOLO", "MediaPipe", "Deepgram", "Cartesia", "LiveKit"]
  }
];

export const education = {
  degree: "BSc Computer Science",
  institution: "Superior University, Lahore",
  certifications: [
    { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2025" },
    { name: "Machine Learning Specialization", issuer: "Stanford Online & DeepLearning.AI", year: "2024" },
    { name: "Introduction to Generative AI", issuer: "Google Cloud", year: "2024" }
  ]
};
