import { featuredProjects, otherProjects, type Project } from "@/data/projects";

/**
 * The numbered index. Hierarchy comes from the type scale and the hairlines
 * between rows, not from cards - nine identical bordered boxes was the reason
 * the old page read as generated.
 *
 * A project with a written study makes the whole row a link to it. Projects
 * without one still show their summary and metrics here; they just have
 * nowhere further to go.
 */
function WorkRow({ project, index }: { project: Project; index: number }) {
  const href = project.study ? `/work/${project.slug}` : undefined;

  const body = (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-1">
        <span className="tabular label">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="md:col-span-8">
        <h3 className="text-statement font-medium tracking-tight transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-4 max-w-measure text-body text-muted-foreground">{project.summary}</p>

        {project.metrics.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {project.metrics.map((m) => (
              <li key={m.label} className="tabular font-mono text-meta">
                {m.from && <span className="text-muted-foreground">{m.from} &rarr; </span>}
                <span className="text-foreground">{m.value}</span>
                <span className="text-muted-foreground"> {m.label}</span>
              </li>
            ))}
          </ul>
        )}

        {href && (
          <span className="mt-7 inline-flex items-baseline gap-2 text-[0.9375rem] font-medium text-primary">
            Read the case study
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        )}
      </div>

      <div className="md:col-span-3 md:text-right">
        <p className="font-mono text-meta text-muted-foreground">
          {project.client && (
            <>
              {project.client}
              <br />
            </>
          )}
          {project.year}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
          {project.stack.map((tech) => (
            <li key={tech} className="text-meta text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <article className="group border-b border-rule">
      {href ? (
        <a href={href} className="block py-10 md:py-14">
          {body}
        </a>
      ) : (
        <div className="py-10 md:py-14">{body}</div>
      )}
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="shell">
        <div className="section-head">
          <h2 className="label">Selected work</h2>
          <span className="tabular label">
            01 &mdash; {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>

        {featuredProjects.map((project, i) => (
          <WorkRow key={project.slug} project={project} index={i} />
        ))}

        {otherProjects.length > 0 && (
          <div className="pt-14">
            <h3 className="label">Also built</h3>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {otherProjects.map((project) => (
                <li key={project.slug} className="flex items-baseline justify-between gap-4">
                  <span className="text-body">
                    {project.study ? (
                      <a href={`/work/${project.slug}`} className="link-underline">
                        {project.title}
                      </a>
                    ) : project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </span>
                  <span className="tabular shrink-0 font-mono text-meta text-muted-foreground">
                    {project.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
