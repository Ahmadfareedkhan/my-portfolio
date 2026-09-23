import { capabilities, education, profile } from "@/data/profile";

/**
 * Replaces the old Skills and Education sections.
 *
 * No proficiency ratings: a self-assigned "Expert" badge is a resume artefact
 * that buyers discount, and the previous copy drew attention to it by saying so.
 * Tools are listed as plain text; the work above is the evidence.
 */
export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="shell">
        <div className="section-head">
          <h2 className="label">About</h2>
          <span className="label">{profile.location}</span>
        </div>

        <div className="grid gap-16 pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="max-w-measure text-statement font-medium tracking-tight">
              I work with teams who have an AI idea that needs to survive contact
              with real data, real budgets and real users.
            </p>
            <div className="mt-8 max-w-measure space-y-5 text-body text-muted-foreground">
              <p>
                That usually means one of three things: a retrieval or agent system
                that has to be accurate enough to trust, a pipeline that has to run
                at a scale where cost decisions matter, or a prototype that works on
                a laptop and needs to work in production.
              </p>
              <p>
                I have done this for Pearson and PwC through TenX, and for a handful
                of startups building their first AI features. I write the evaluation
                harness before I write the pitch.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <h3 className="label">Working with</h3>
            <dl className="mt-6">
              {capabilities.map((group) => (
                <div key={group.group} className="border-t border-rule py-5">
                  <dt className="text-meta text-muted-foreground">{group.group}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed">
                    {group.items.join("  ·  ")}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="label mt-12">Education</h3>
            <div className="mt-6 border-t border-rule py-5">
              <p className="text-[0.9375rem]">{education.degree}</p>
              <p className="mt-1 text-meta text-muted-foreground">{education.institution}</p>
            </div>
            <ul>
              {education.certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-baseline justify-between gap-4 border-t border-rule py-4"
                >
                  <span className="text-meta">
                    {cert.name}
                    <span className="block text-muted-foreground">{cert.issuer}</span>
                  </span>
                  <span className="tabular shrink-0 font-mono text-meta text-muted-foreground">
                    {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
