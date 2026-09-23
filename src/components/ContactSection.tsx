import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/data/profile";

const CONTACT_EMAIL = profile.email;
const FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const SUBMIT_TIMEOUT_MS = 15_000;

// Keeps the visitor's draft when delivery fails, so clicking the fallback
// opens a prefilled email instead of discarding what they wrote.
const buildMailtoHref = (name: string, message: string) => {
  const body = [
    "Hi Ahmad,",
    "",
    message || "I would like to discuss a project.",
    "",
    name ? `- ${name}` : ""
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    name ? `Portfolio Inquiry from ${name}` : "Portfolio Inquiry"
  )}&body=${encodeURIComponent(body)}`;
};

const field =
  "w-full border-0 border-b border-rule bg-transparent pb-3 pt-2 text-[1.0625rem] " +
  "placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0";

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didFailSubmit, setDidFailSubmit] = useState(false);
  // Honeypot: real users never see or fill this, bots usually do.
  const [botField, setBotField] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDidFailSubmit(false);

    // Silently drop honeypot hits: no toast, no request, no feedback to tune against.
    if (botField) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Inquiry from ${formData.name}`,
          // Must stay "false": the /ajax/ endpoint has no page on which to
          // render a captcha, so enabling it can reject valid submissions.
          // Spam is handled by the _honey honeypot field instead.
          _captcha: "false",
          _honey: botField
        }),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS)
      });

      if (!response.ok) {
        throw new Error(`Submission request failed with status ${response.status}`);
      }

      // A 200 does not mean delivered. FormSubmit answers 200 with
      // { success: "false" } for non-delivery cases - most importantly before
      // the recipient address has been activated - so reporting success from
      // response.ok alone would tell visitors their message arrived when it did not.
      const result = await response.json().catch(() => null);
      if (result && String(result.success) !== "true") {
        throw new Error(result.message || "Form service rejected the submission");
      }

      toast({
        title: "Message sent",
        description: "Thanks for reaching out. I will get back to you shortly."
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setDidFailSubmit(true);
      toast({
        title: "Submission failed",
        description: "Please try again, or use the direct email link.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t border-rule py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="label">Contact</h2>
            <p className="mt-8 max-w-[16ch] text-statement font-medium tracking-tight">
              Tell me what you are building.
            </p>
            <p className="mt-6 max-w-measure text-body text-muted-foreground">
              Useful things to include: what the system needs to do, what it runs on
              today, and what &ldquo;working&rdquo; would mean.
            </p>

            <dl className="mt-12 space-y-4">
              <div className="flex gap-6">
                <dt className="label w-16 shrink-0 pt-1">Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-[0.9375rem]">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="label w-16 shrink-0 pt-1">Phone</dt>
                <dd>
                  <a href={profile.phoneHref} className="link-underline text-[0.9375rem]">
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="label w-16 shrink-0 pt-1">Upwork</dt>
                <dd>
                  <a
                    href={profile.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[0.9375rem]"
                  >
                    Hire me on Upwork
                  </a>
                </dd>
              </div>
              <div className="flex gap-6">
                <dt className="label w-16 shrink-0 pt-1">Online</dt>
                <dd className="flex gap-5">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[0.9375rem]"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[0.9375rem]"
                  >
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-6 md:col-start-7">
            <div className="space-y-10">
              <div>
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className={`${field} mt-3`}
                  placeholder="Your name"
                  maxLength={120}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`${field} mt-3`}
                  placeholder="you@company.com"
                  maxLength={200}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="label">
                  Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`${field} mt-3 resize-none`}
                  placeholder="What are you building?"
                  maxLength={5000}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="_honey">Do not fill this field</label>
                <input
                  id="_honey"
                  name="_honey"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-baseline gap-2 text-[1.0625rem] font-medium text-primary disabled:opacity-50"
                >
                  {isSubmitting ? "Sending" : "Send message"}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>

                {didFailSubmit && (
                  <a
                    href={buildMailtoHref(formData.name, formData.message)}
                    className="link-underline text-[0.9375rem] text-muted-foreground"
                  >
                    Send via email instead
                  </a>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
