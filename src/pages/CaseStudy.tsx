import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Diagram } from "@/components/Diagram";
import { getProject, studyProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useDocumentHead, SITE_URL } from "@/hooks/use-document-head";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const study = project?.study;

  // Next study in the list, so a reader who finishes one has somewhere to go.
  const next = useMemo(() => {
    if (!project) return undefined;
    const i = studyProjects.findIndex((p) => p.slug === project.slug);
    return studyProjects[(i + 1) % studyProjects.length];
  }, [project]);

  const jsonLd = useMemo(
    () =>
      project && study
        ? {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/#work` },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: project.title,
                    item: `${SITE_URL}/work/${project.slug}`
                  }
                ]
              },
              {
            "@type": "CreativeWork",
            name: project.title,
            abstract: study.plain,
            dateCreated: project.year,
            url: `${SITE_URL}/work/${project.slug}`,
            author: { "@type": "Person", name: profile.name, url: SITE_URL },
            keywords: project.stack.join(", ")
              }
            ]
          }
        : undefined,
    [project, study]
  );

  useDocumentHead({
    title: project?.title ?? "Case study",
    description: study?.metaDescription ?? project?.summary ?? "",
    path: `/work/${slug ?? ""}`,
    image: study?.image?.src,
    jsonLd
  });

  // Unknown slug, or a project with no written study, belongs on the index.
  if (!project || !study) return <Navigate to="/#work" replace />;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <article>
          <header className="shell pt-32 md:pt-44">
            <p className="label">
              <a href="/#work" className="transition-colors hover:text-foreground">
                Work
              </a>
              <span className="mx-2 text-muted-foreground">/</span>
              {project.year}
            </p>

            <h1 className="mt-8 max-w-[18ch] text-balance text-display font-medium">
              {project.title}
            </h1>

            {/* The plain-language line leads. A non-technical buyer should be
                able to stop reading here and still know what this is. */}
            <p className="mt-10 max-w-measure text-lead text-muted-foreground">{study.plain}</p>

            <dl className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3">
              <div>
                <dt className="label">Role</dt>
                <dd className="mt-3 text-[0.9375rem]">{study.role}</dd>
              </div>
              {project.client && (
                <div>
                  <dt className="label">Client</dt>
                  <dd className="mt-3 text-[0.9375rem]">{project.client}</dd>
                </div>
              )}
              <div>
                <dt className="label">Built with</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed">
                  {project.stack.join("  ·  ")}
                </dd>
              </div>
            </dl>
          </header>

          {project.metrics.length > 0 && (
            <div className="mt-16 border-y border-rule md:mt-20">
              <div className="shell">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 md:grid-cols-4 md:py-12">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="tabular block text-numeral font-medium">{m.value}</span>
                        <span className="mt-3 block text-meta text-muted-foreground">{m.label}</span>
                        {m.from && (
                          <span className="tabular mt-1 block font-mono text-meta text-muted-foreground">
                            from {m.from}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {study.image && (
            <div className="shell mt-16 md:mt-20">
              <figure>
                <img
                  src={study.image.src}
                  alt={study.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full border border-rule"
                />
                <figcaption className="label mt-4">{study.image.caption}</figcaption>
              </figure>
            </div>
          )}

          <div className="shell mt-20 md:mt-28">
            <div className="grid gap-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8 md:col-start-3">
                {study.sections.map((section) => (
                  <section key={section.heading} className="mb-14 last:mb-0">
                    <h2 className="text-statement font-medium tracking-tight">{section.heading}</h2>
                    <div className="mt-6 max-w-measure space-y-5 text-body text-muted-foreground">
                      {section.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}

                {study.diagram && (
                  <div className="mt-16">
                    <Diagram flow={study.diagram} />
                  </div>
                )}

                {study.caveat && (
                  <aside className="mt-16 border-l-2 border-primary pl-6">
                    <p className="label">Scope and limits</p>
                    <p className="mt-3 max-w-measure text-meta text-muted-foreground">
                      {study.caveat}
                    </p>
                  </aside>
                )}

                {project.href && (
                  <p className="mt-14">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-2 text-[1.0625rem] font-medium text-primary"
                    >
                      {project.hrefLabel ?? "View"}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </article>

        {next && next.slug !== project.slug && (
          <nav className="shell mt-24 md:mt-32" aria-label="Next case study">
            <a href={`/work/${next.slug}`} className="group block border-t border-rule pt-8">
              <span className="label">Next</span>
              <span className="mt-4 block text-statement font-medium tracking-tight transition-colors group-hover:text-primary">
                {next.title}
              </span>
              <span className="mt-3 block max-w-measure text-meta text-muted-foreground">
                {next.summary}
              </span>
            </a>
          </nav>
        )}

        <div className="shell py-24 md:py-32">
          <a
            href="/#contact"
            className="group inline-flex items-baseline gap-2 text-statement font-medium tracking-tight text-primary"
          >
            Start a project
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CaseStudy;
