/**
 * Single source of truth for project content.
 *
 * `featured: true` puts a project in the numbered index on the home page.
 * Everything else appears in the plain "Also built" list. Guidance is 4-6
 * featured - past that the signal dilutes.
 *
 * A project with a `study` renders a case study page at /work/<slug>.
 *
 * WRITING RULES
 * - `summary` and `study.plain` must be readable by a non-technical buyer.
 *   Technical vocabulary belongs in `study.sections` and `stack`, where a
 *   reader who wants it will look for it.
 * - Terms like "agentic", "RAG" and "MCP" are used only where they are
 *   literally true of the system. Applying them to work that does not do it
 *   would undo the credibility the rest of the page is built on.
 * - CLIENT ANONYMITY: no client or employer names, no internal URLs, no
 *   contract values, no named individuals. Several of these were delivered
 *   under NDA or as employer work. Describe the industry, never the company.
 *   Exception: Pearson and PwC (the TenX engagements) are named, with the
 *   owner's approval (2026-09-23). Every other client stays anonymous.
 * - Metrics must be real and defensible in a client call. Leave `metrics`
 *   empty rather than inventing a number, and never state an accuracy figure
 *   that has not been measured against a ground truth.
 */

export type Metric = {
  value: string;
  label: string;
  /** Optional prior value, for before/after framing. */
  from?: string;
};

export type StudySection = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  /** One sentence, no jargon. What a non-technical client would tell a colleague. */
  plain: string;
  /**
   * The search-result snippet. 120-160 characters: shorter wastes the slot,
   * longer gets truncated mid-sentence. This is written to earn a click, which
   * is a different job from `plain`, so do not reuse one for the other.
   * `npm run audit` fails the build if this drifts outside the range.
   */
  metaDescription: string;
  /** Shown under the title on the case study page. */
  role: string;
  sections: StudySection[];
  image?: { src: string; alt: string; caption: string };
  /** Key for an authored SVG diagram, where there is no UI worth showing. */
  diagram?: "two-stage-ranking" | "mcp-connector" | "realtime-voice";
  /** Stated plainly where a system's limits matter. Honesty is the point. */
  caveat?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Industry and engagement type, not a company name - except the approved
   *  named clients listed in the writing rules above. */
  client?: string;
  year: string;
  summary: string;
  metrics: Metric[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  featured: boolean;
  study?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "jadoc-v3",
    title: "Job Ad Classification at Scale",
    client: "Pearson, via TenX",
    year: "2026",
    summary:
      "Six hundred million job adverts, sorted into standard occupations. The first working version would have cost $48,000 every time it ran.",
    metrics: [
      // The full 600M run was completed (confirmed by the owner, 2026-09-23).
      // The "from" figures are what the first version would have taken.
      { value: "600M", label: "job ads processed" },
      { value: "65.13%", from: "12.48%", label: "top-1 accuracy" },
      { value: "$12K", from: "$48K", label: "compute cost per full run" },
      { value: "4.7 days", from: "23 days", label: "full-corpus runtime" }
    ],
    stack: ["Databricks", "PySpark", "SageMaker", "MLflow", "FAISS", "FP16"],
    featured: true,
    study: {
      plain:
        "Employers describe the same job in a hundred different ways. This system reads any job advert and decides which standard occupation it actually is — across four countries and six hundred million adverts.",
      metaDescription:
        "How 600 million job adverts get sorted into standard occupations, and how a two-stage ranking pipeline cut the cost of a full run from $48K to $12K.",
      role: "Sole ML engineer, end to end",
      sections: [
        {
          heading: "The problem",
          body: [
            "Job adverts are written by humans, so the same role appears as \"Senior Dev\", \"Software Engineer II\" and \"Full-Stack Ninja\". To make labour-market data comparable, every advert has to map to one standardised occupation code.",
            "Doing that at six hundred million adverts is where it gets hard. The obvious approach — compare each advert against every occupation — was both too inaccurate to use and too expensive to run."
          ]
        },
        {
          heading: "What I built",
          body: [
            "A two-stage ranking pipeline. A fast bi-encoder narrows millions of possibilities down to a shortlist, then a slower, more careful cross-encoder re-ranks that shortlist to pick the winner. This is the standard retrieval-then-rerank pattern, and it is what makes the accuracy affordable.",
            "The accuracy gain came mostly from hard-negative mining: training the model on more than 2.5 million pairs of examples that look similar but are genuinely different occupations. Easy examples teach a model very little.",
            "Cost came down through FP16 inference and partitioning the workload so autoscaling GPU workers stayed busy instead of idling."
          ]
        },
        {
          heading: "The outcome",
          body: [
            "Top-1 accuracy went from 12.48% to 65.13%; end-to-end pipeline accuracy from 10.47% to 62.24%.",
            "The cost of a full 600M run fell from a projected $48,000 to roughly $12,000, and runtime from about 23 days to about 4.7 days.",
            "Validated in production on 20.9 million records in around 12 hours, then run across the full corpus of 600 million adverts."
          ]
        }
      ],
      diagram: "two-stage-ranking"
    }
  },

  {
    slug: "conversation-analysis",
    title: "Conversation Analysis for Parents",
    client: "Child psychologist, private contract",
    year: "2026",
    summary:
      "A parent records a difficult conversation with their teenager and gets back what actually happened, why it mattered, and one thing to try next.",
    metrics: [
      { value: "1 hour", label: "recordings supported" },
      { value: "68", label: "automated tests" }
    ],
    stack: ["Next.js", "FastAPI", "OpenAI", "Speaker diarisation", "AWS", "CI/CD"],
    featured: true,
    study: {
      plain:
        "A psychologist wanted parents to understand their own conversations with their teenagers. You record a conversation; the app separates who said what, finds the moments that mattered, and suggests one thing to try — always quoting the actual recording.",
      metaDescription:
        "An app that records a parent-teen conversation, separates who said what, and returns feedback grounded in the actual recording rather than generic advice.",
      role: "Sole engineer, design through deployment",
      sections: [
        {
          heading: "The problem",
          body: [
            "Parents leave a difficult conversation knowing it went badly but not why. Generic parenting advice does not help, because it was not written about their conversation.",
            "The guiding rule for the whole product came from that: never produce advice that could have been written without hearing the recording."
          ]
        },
        {
          heading: "Why the first version had to be rebuilt",
          body: [
            "The first build used a specialist speech API plus keyword rules to spot communication patterns. It tested fine on sample audio.",
            "Then it was run on a real, calm conversation. The transcription hallucinated profanity that was never spoken. The keyword rules flagged the word \"whatever\" as emotional withdrawal. The generated insights described a conflict the recording did not contain.",
            "That is the failure mode that matters in this product. A tool that invents conflict between a parent and their child is worse than no tool. Transcription moved to a different model and pattern detection moved from keyword rules to a language model working over the real transcript, with every claim tied back to a quote."
          ]
        },
        {
          heading: "Making long recordings survive the real world",
          body: [
            "Support went from short clips to full hour-long conversations. That broke an assumption nobody had tested: the upload request stayed open for the entire job, and a 42-minute analysis outlived both the browser's patience and the proxy's timeout. The work completed on the server and was saved correctly — but the page reported failure.",
            "The fix was to stop treating analysis as a request. Uploads now hand off to background processing with real progress, transcription runs in parallel across segments, each segment retries independently, and a failed view can retry without re-uploading the audio. A duplicate guard stops the same recording being paid for twice."
          ]
        }
      ],
      image: {
        src: "/work/attune-app.webp",
        alt: "The recording screen: a microphone button, a file drop zone, and a list of past conversations",
        caption: "Recording and upload. Up to one hour, processed in the background."
      },
      caveat:
        "Built for one practitioner under a private contract. Screenshots are from a local build with no recordings loaded — no real conversation data is shown anywhere."
    }
  },

  {
    slug: "procurement-intelligence",
    title: "Procurement Intelligence Agent",
    client: "Industrial water-treatment group",
    year: "2026",
    summary:
      "Buyers ask \"what did we last pay for this, and to whom?\" in plain language, and get the actual purchase orders back in about three seconds.",
    metrics: [
      { value: "117,085", label: "purchase-order lines indexed" },
      { value: "1.35M", label: "document chunks searchable" },
      { value: "2.5-3.5s", label: "typical answer time" }
    ],
    stack: ["MCP", "AWS Lambda", "OpenSearch", "SAP data lake", "EventBridge", "CloudWatch"],
    featured: true,
    study: {
      plain:
        "A procurement team had years of purchase history locked inside SAP, reachable only by people who knew how to query it. Now anyone can ask a normal question in their AI assistant and get real purchase orders back, with suppliers, currencies and dates.",
      metaDescription:
        "An agentic MCP connector that lets buyers ask for purchase history in plain language and get real purchase orders back in about three seconds.",
      role: "Engineer on the platform team",
      sections: [
        {
          heading: "The problem",
          body: [
            "Pricing history is the most useful thing a procurement team owns and the hardest thing for them to reach. Answering \"what did we pay for this last time?\" meant asking someone to run a report.",
            "The goal was to let the buyers ask directly, in the AI assistant they already use, without giving them a new tool to learn."
          ]
        },
        {
          heading: "What I built",
          body: [
            "An agentic connector built on MCP — the open standard that lets an AI assistant call real tools. The assistant does not guess at prices; it calls a search tool that queries a live index of purchase orders and returns actual records, which the buyer can check.",
            "Two tools do the work: one searches purchase prices with filters for supplier, material group, currency and date, and one reports how much coverage the data actually has for a given question. Asking for a specific purchase order number switches the call to an exact lookup instead of a relevance search, so you get all of that order's lines rather than a sample.",
            "A nightly loader keeps the index current against the company's data lake, rebuilding changed months and resuming where it left off if it runs out of time. Failures raise an alarm rather than going quiet."
          ]
        },
        {
          heading: "Why it needed to be honest about its data",
          body: [
            "Procurement data is messy in specific ways: fifteen currencies, future-dated orders, cancelled lines that are not marked as cancelled, and material codes that only make sense with a lookup table.",
            "A system that hides that returns confident, wrong answers. The coverage tool exists precisely so a buyer can ask how much history actually backs a number before they rely on it."
          ]
        }
      ],
      diagram: "mcp-connector",
      caveat:
        "Internal enterprise tooling. No screenshots, endpoints or supplier data are shown."
    }
  },

  {
    slug: "plan-takeoff",
    title: "Reading Construction Drawings",
    client: "Fence contractor, via AWS partner",
    year: "2026",
    summary:
      "Estimators price bids by reading plan sheets by hand. This reads the same sheets and lists every fence run, gate and height, with the sheet each came from.",
    metrics: [
      { value: "25 sheets", label: "per plan set" },
      { value: "$1-6", label: "model cost per plan" }
    ],
    stack: ["Claude on AWS Bedrock", "Computer vision", "PDF tiling", "React", "FastAPI"],
    featured: true,
    study: {
      plain:
        "A fence contractor's estimators read construction drawings by hand to price a bid — slow, and easy to miss something. This reads the drawings and produces a structured takeoff they can check against their own.",
      metaDescription:
        "Reading construction drawings with AI: every fence run, gate and height listed with the sheet it came from, so an estimator can verify rather than trust.",
      role: "Engineer, delivered through an AWS partner",
      sections: [
        {
          heading: "The problem",
          body: [
            "Pricing a fencing bid means finding every fence run on a plan set, working out its type, height and length, and adding it up. Estimators do this manually in specialist software.",
            "The client was clear about what mattered: are the measurements right, and can the different fence types and heights be told apart. Speed was not the point — not missing anything was."
          ]
        },
        {
          heading: "What I built",
          body: [
            "A pipeline that takes a plan set PDF and reads it sheet by sheet. Plan sheets are far too large and dense to read in one pass, so each sheet is split into overlapping tiles and read tile by tile, then stitched back together with real sheet numbers preserved.",
            "Every row in the output carries the sheet it was read from, so an estimator can verify a number rather than trust it. Estimators can also pick which sheets to read, and leave a note that guides the model without overriding the drawing.",
            "Cost is measured and shown per plan, because a tool that silently spends money on every upload does not survive contact with a business."
          ]
        },
        {
          heading: "What it does not do",
          body: [
            "It measures length only where a dimension is actually printed on the drawing, or where a CAD convention makes it derivable. Everything else is reported as \"not dimensioned\" rather than estimated.",
            "That is a deliberate choice. A confident wrong number in a bid costs real money; an explicit gap sends the estimator to check one run."
          ]
        }
      ],
      image: {
        src: "/work/takeoff-app.webp",
        alt: "The upload screen: a plan set drop zone, an optional note field, and guidance on preparing files",
        caption: "Upload and guidance. The client wordmark is masked."
      },
      caveat:
        "A deployed trial, not a finished product. There is no ground-truth dataset yet, so the output is repeatable but not independently verified as accurate — it is used to cross-check manual takeoffs, not replace them."
    }
  },

  {
    slug: "tariff-classification",
    title: "Automated Tariff Classification",
    client: "PwC, via TenX",
    year: "2026",
    summary:
      "Classifying goods for customs was manual, slow, and impossible to staff at the rate the work arrived.",
    metrics: [{ value: "50%", label: "less manual effort" }],
    stack: ["LangChain", "OpenAI", "Agentic workflows"],
    featured: true,
    study: {
      plain:
        "Every item crossing a border needs a tariff code. Getting it wrong is expensive. This reads the product information and proposes a code with its reasoning, so a specialist reviews instead of starting from scratch.",
      metaDescription:
        "An agentic pipeline that proposes customs tariff codes along with its reasoning, cutting manual classification effort by roughly half for a specialist team.",
      role: "Associate data scientist",
      sections: [
        {
          heading: "The problem",
          body: [
            "Tariff classification is judgement work over a large, hierarchical code list. It does not parallelise by hiring, because the expertise takes years to build.",
            "The aim was never to remove the specialist. It was to stop them starting from a blank page on every item."
          ]
        },
        {
          heading: "What I built",
          body: [
            "An agentic pipeline: rather than one prompt returning an answer, the system works in steps — narrowing the category, gathering what it needs, proposing a classification, and checking that proposal against validation logic before surfacing it.",
            "That structure matters because the reasoning is the deliverable. A specialist needs to see why a code was proposed to accept or reject it quickly."
          ]
        },
        {
          heading: "The outcome",
          body: [
            "Manual effort on the workflow fell by around half, and turnaround improved correspondingly.",
            "Consistency improved too — the same item now gets the same treatment regardless of who is reviewing it."
          ]
        }
      ]
    }
  },

  // --- Not featured: rendered as a plain list. ---
  {
    slug: "voice-companion",
    title: "Real-Time Voice Companion",
    client: "Independent founder, private contract",
    year: "2026",
    summary:
      "A companion you talk to rather than type at, built on a realtime speech model.",
    metrics: [],
    stack: ["OpenAI Realtime", "Next.js", "Semantic VAD", "Netlify"],
    href: "https://angel-prototype.netlify.app",
    hrefLabel: "Live demo",
    featured: false,
    study: {
      plain:
        "Press one button and talk. It listens, thinks and answers out loud, with no typing and no menus.",
      metaDescription:
        "A realtime voice companion on the OpenAI Realtime API, and why the fix for self-interruption turned out to be a simpler interface rather than a better setting.",
      role: "Sole engineer",
      sections: [
        {
          heading: "The interesting problem",
          body: [
            "Realtime voice is easy to demo and hard to make comfortable. The hardest issue here was self-interruption: the app's own voice coming out of a phone speaker was picked up by its own microphone, and the system treated that as the user interrupting.",
            "A cough in the room could stop it mid-sentence."
          ]
        },
        {
          heading: "What actually fixed it",
          body: [
            "Several detection settings were tried — different voice-activity modes, sensitivity thresholds, and far-field noise reduction. Each reduced the problem; none removed it, because the microphone stays open while the model speaks and no server-side setting fully solves that.",
            "The reliable fix was a mute control the user holds. Not clever, but it works every time, which the clever options did not.",
            "That is worth stating plainly: the honest answer was a simpler interface, not a better parameter."
          ]
        }
      ],
      image: {
        src: "/work/angel-app.webp",
        alt: "The voice companion interface: a short explanation and a single Talk button",
        caption: "The whole interface. Voice-first means there is almost nothing to look at."
      },
      diagram: "realtime-voice"
    }
  },
  {
    slug: "voice-sales-agent",
    title: "Real-Time Voice Sales Agent",
    client: "Software studio",
    year: "2025",
    summary:
      "A voice agent that holds a live sales conversation, retrieves product knowledge mid-sentence, and books the follow-up itself.",
    metrics: [],
    stack: ["LiveKit", "LangGraph", "GPT-4o", "Deepgram", "Cartesia", "Cohere Rerank"],
    // The LiveKit sandbox demo returned 410 Gone on 2026-09-23 and was removed.
    featured: false
  },
  {
    slug: "second-brain-crm",
    title: "Multi-Agent CRM",
    client: "Product build",
    year: "2025",
    summary:
      "Specialised sales and operations agents sharing one retrieval layer, driven entirely from Slack so nobody has to learn a new tool.",
    metrics: [],
    stack: ["LangChain", "Supabase", "pgvector", "RAG", "Slack API"],
    href: "https://www.thesecondbrain.io/",
    hrefLabel: "Visit site",
    featured: false
  },
  {
    slug: "thumbly",
    title: "Thumbly",
    client: "Software house",
    year: "2024",
    summary:
      "An AI thumbnail generator that watches the video, ranks the moments worth showing, and composes a thumbnail from them.",
    metrics: [],
    stack: ["Computer Vision", "FLUX", "Deepgram", "YouTube API"],
    href: "https://thumbly.ai/",
    hrefLabel: "Visit site",
    featured: false
  },
  {
    slug: "ai-lawyer",
    title: "AI Lawyer",
    client: "Software house",
    year: "2024",
    summary:
      "Legal assistant with voice interaction and semantic search over case documents.",
    metrics: [],
    stack: ["OpenAI", "Semantic search", "Voice"],
    href: "https://ailawyer.pro/",
    hrefLabel: "Visit site",
    featured: false
  },
  {
    slug: "anti-spoofing",
    title: "Anti-Spoofing Attendance",
    client: "Software studio",
    year: "2023",
    summary:
      "Face recognition attendance with liveness detection, integrated into a mobile workflow.",
    metrics: [],
    stack: ["YOLOv8", "OpenCV", "CUDA", "Flutter"],
    href: "https://github.com/Ahmadfareedkhan/Anti-Spoofing-Face-Recogntion-System",
    hrefLabel: "Source",
    featured: false
  },
  {
    slug: "stock-data-platform",
    title: "Stock Exchange Data Platform",
    year: "2024",
    summary:
      "Resilient ingestion with retry and validation, dual SQLite/PostgreSQL storage, and dashboards over the top.",
    metrics: [],
    stack: ["Selenium", "Streamlit", "Plotly", "PostgreSQL"],
    featured: false
  },
  {
    slug: "nutrition-ai",
    title: "Nutrition AI",
    client: "Open-source contribution",
    year: "2024",
    summary: "Voice-enabled nutrition assistant with an STT/TTS round trip.",
    metrics: [],
    stack: ["OpenAI", "Gradio", "Hugging Face"],
    href: "https://www.nutritionai.app/",
    hrefLabel: "Visit site",
    featured: false
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const studyProjects = projects.filter((p) => p.study);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
