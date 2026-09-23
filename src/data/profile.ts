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

export type Offering = {
  /** The kind of work, in the words a client would search for. */
  area: string;
  /** Shown at display size. A real result where one exists; otherwise the
   *  capability itself - never an invented number. */
  value: string;
  unit: string;
  /** One sentence for a non-technical buyer. */
  text: string;
  /** The project that backs this claim; its page is where the link goes. */
  slug: string;
};

/**
 * The band under the opening statement: one column per kind of work clients
 * hire for, so a buyer can see "he builds what I need" before scrolling.
 *
 * Every number must trace to the case study its `slug` points at. "Agentic" is
 * literally true of the tariff pipeline and the voice sales agent, "RAG" of the
 * procurement platform.
 */
export const offerings: Offering[] = [
  {
    area: "Agentic workflows",
    value: "50%",
    unit: "less manual effort",
    text: "An agent proposes customs tariff codes with its reasoning, so specialists review instead of starting from scratch.",
    slug: "tariff-classification"
  },
  {
    area: "RAG on your data",
    // Warm-query figures from the platform's own notes: hybrid search ~0.5-1s
    // plus reranking ~1-2.5s over the 1.35M-chunk index; purchase-order search
    // 2.5-3.5s. The first query after idle is slower (the cluster scales to zero).
    value: "<3.5s",
    unit: "to search 1.35M document chunks",
    text: "Staff ask in plain English and get answers grounded in the company's own documents and purchase records, not guesses.",
    slug: "procurement-intelligence"
  },
  {
    area: "Voice agents",
    // The model's figure, not one measured on these projects, so the text
    // credits it to OpenAI. Independent tests put gpt-realtime at ~0.8s from
    // end of speech to start of reply (Apr 2026); OpenAI then cut p95 latency
    // by 25%+ (Jul 2026). OpenAI publishes no absolute number. Checked 2026-09-23.
    value: "<1s",
    unit: "until it starts answering",
    text: "You speak, it answers out loud: OpenAI's realtime voice model typically replies in under a second. One agent runs live sales calls and books the follow-up itself.",
    slug: "voice-companion"
  },
  {
    area: "Documents & vision",
    value: "$1–6",
    unit: "model cost per plan set",
    text: "Reads construction drawings and lists every fence run, gate and height, with the sheet each came from.",
    slug: "plan-takeoff"
  },
  {
    area: "Data at scale",
    value: "4×",
    unit: "cheaper per full run, projected",
    text: "Built to sort 600 million job ads into standard occupations; a full run's projected cost fell from $48K to $12K.",
    slug: "jadoc-v3"
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
