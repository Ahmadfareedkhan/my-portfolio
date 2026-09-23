import { offerings, profile } from "@/data/profile";
import { getProject } from "@/data/projects";

/**
 * One statement, one supporting paragraph, one row of proof.
 *
 * The proof row is organised by the kind of work a client hires for, not by a
 * single engagement: a buyer looking for an agent or a voice assistant should
 * see it named before the first scroll. Each column still carries one real
 * result and links to the project that backs it.
 */
export function Intro() {
  return (
    <section id="top" className="pt-32 md:pt-44">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <p className="label">
            {profile.role} &nbsp;/&nbsp; {profile.locationShort}
          </p>

          <h1 className="mt-8 text-balance text-display font-medium animate-rise">
            I build AI systems that hold up in production.
          </h1>

          <p className="mt-10 max-w-measure text-lead text-muted-foreground animate-rise [animation-delay:80ms]">
            Most AI work dies between the demo and the deploy. I do the part after the
            demo: the evaluation, the cost ceiling, the failure modes, the thing that
            still works on the six hundred millionth record.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 animate-rise [animation-delay:160ms]">
            <a
              href="#contact"
              className="group inline-flex items-baseline gap-2 text-[1.0625rem] font-medium text-primary"
            >
              Start a project
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a href="#work" className="link-underline text-[1.0625rem] text-muted-foreground">
              See the work
            </a>
            {/* Most visitors arrive from Upwork or would rather contract through
                it, so hiring there is offered next to the direct route. */}
            <a
              href={profile.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[1.0625rem] text-muted-foreground"
            >
              Hire me on Upwork
              <span aria-hidden="true"> &#8599;</span>
            </a>
            {profile.available && (
              <span className="label flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Available for new work
              </span>
            )}
          </div>
        </div>

        {/* Portrait sits in the opening view because the trust signal has to fire
            before the first scroll - most visitors never reach the About section.
            Rectangular, not a circular avatar: the objection to the old treatment
            was the shape, not the position. Placed after the statement in source
            order so the headline still leads on phones. */}
        <figure className="md:col-span-4 md:col-start-9 md:pt-2">
          <img
            src="/lovable-uploads/portrait-560.jpg"
            srcSet="/lovable-uploads/portrait-560.jpg 560w, /lovable-uploads/portrait-1040.jpg 1040w"
            sizes="(min-width: 768px) 32vw, 66vw"
            alt={`${profile.name}, ${profile.role}`}
            width={560}
            height={700}
            // React 18 does not recognise the camelCase `fetchPriority` prop and
            // silently drops it; the lowercase DOM attribute passes through.
            {...{ fetchpriority: "high" }}
            decoding="async"
            className="portrait aspect-[4/5] w-2/3 object-cover object-top md:w-full"
          />
        </figure>

      </div>

      {/* Proof band. Full-bleed hairlines, values at display size, no boxes. */}
      <div className="mt-20 border-y border-rule md:mt-28">
        <div className="shell">
          <h2 className="label pt-6">What I build</h2>
          <ul className="grid gap-x-8 gap-y-12 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:py-12">
            {offerings.map((o) => {
              const project = getProject(o.slug);
              return (
                <li key={o.area} className="flex flex-col">
                  <h3 className="label">{o.area}</h3>
                  <p className="mt-6">
                    <span className="tabular block text-numeral font-medium">{o.value}</span>
                    <span className="mt-3 block text-meta text-muted-foreground">{o.unit}</span>
                  </p>
                  <p className="mt-5 text-meta text-muted-foreground">{o.text}</p>
                  {project?.study && (
                    // Inline, not flex: titles wrap in narrow columns, and a flex
                    // row pushes the arrow to the far edge instead of after the text.
                    <a
                      href={`/work/${project.slug}`}
                      className="group mt-auto pt-5 text-meta font-medium text-primary"
                    >
                      {project.title}
                      <span className="whitespace-nowrap">
                        &nbsp;
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
