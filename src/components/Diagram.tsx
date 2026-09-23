/**
 * Flow diagrams for systems with no UI worth screenshotting.
 *
 * Built from HTML rather than SVG on purpose: a fixed viewBox scaled to phone
 * width shrinks 13px labels to about 6px, whereas flex boxes reflow from a row
 * into a column and the text stays readable and selectable.
 */

type Step = {
  label: string;
  detail?: string;
  /** Marks the step the case study is actually about. */
  accent?: boolean;
};

type Flow = {
  title: string;
  steps: Step[];
  /** Notes printed under the flow, for things an arrow cannot say. */
  notes?: string[];
};

const FLOWS: Record<string, Flow> = {
  "two-stage-ranking": {
    title: "Two-stage ranking",
    steps: [
      { label: "600M job ads", detail: "AU · CA · UK · US" },
      { label: "Bi-encoder", detail: "fast shortlist from millions" },
      { label: "Cross-encoder", detail: "careful re-rank of the shortlist", accent: true },
      { label: "Occupation code", detail: "one standard classification" }
    ],
    notes: [
      "Trained on 2.5M+ hard-negative pairs — examples that look alike but are different occupations.",
      "FP16 inference and workload partitioning kept autoscaling GPU workers busy rather than idle."
    ]
  },

  "mcp-connector": {
    title: "How a question reaches the purchase orders",
    steps: [
      { label: "Buyer asks", detail: "plain language, in their assistant" },
      { label: "MCP tool call", detail: "search, or exact PO lookup", accent: true },
      { label: "Live index", detail: "117,085 purchase-order lines" },
      { label: "Real records back", detail: "supplier, currency, date" }
    ],
    notes: [
      "The assistant never guesses a price. It calls a tool that returns actual purchase orders, which the buyer can check.",
      "A nightly loader rebuilds changed months against the data lake and resumes if it runs out of time. Failures raise an alarm rather than going quiet."
    ]
  },

  "realtime-voice": {
    title: "The realtime voice loop",
    steps: [
      { label: "Microphone", detail: "stays open while the model speaks" },
      { label: "Voice detection", detail: "decides when you have finished" },
      { label: "Realtime model", detail: "listens and answers as audio" },
      { label: "Speaker", detail: "audible to the same microphone", accent: true }
    ],
    notes: [
      "The loop is the problem: the app's own voice, out of a phone speaker, re-enters its own microphone and reads as an interruption.",
      "Tuning detection modes, thresholds and far-field noise reduction each reduced it. None removed it. A user-held mute control did."
    ]
  }
};

export function Diagram({ flow }: { flow: string }) {
  const data = FLOWS[flow];
  if (!data) return null;

  return (
    <figure className="border-t border-rule pt-8">
      <figcaption className="label">{data.title}</figcaption>

      <ol className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {data.steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-3 md:flex-1 md:flex-col md:items-start md:gap-0">
            <div
              className={`flex-1 border-t-2 pt-4 md:w-full ${
                step.accent ? "border-primary" : "border-rule"
              }`}
            >
              <span className="tabular font-mono text-label text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={`mt-2 text-[0.9375rem] font-medium ${step.accent ? "text-primary" : ""}`}>
                {step.label}
              </p>
              {step.detail && (
                <p className="mt-1 text-meta text-muted-foreground">{step.detail}</p>
              )}
            </div>

            {/* Connector. Hidden from assistive tech: the ordered list already
                conveys the sequence, so this would just add noise. */}
            {i < data.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="shrink-0 self-center px-3 text-muted-foreground md:hidden"
              >
                &darr;
              </span>
            )}
          </li>
        ))}
      </ol>

      {data.notes && (
        <ul className="mt-8 space-y-3 border-t border-rule pt-6">
          {data.notes.map((note) => (
            <li key={note} className="max-w-measure text-meta text-muted-foreground">
              {note}
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
