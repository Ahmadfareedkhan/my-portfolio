import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.9375rem] font-medium">{profile.name}</p>
          <p className="mt-1 text-meta text-muted-foreground">
            {profile.role} &nbsp;/&nbsp; {profile.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={profile.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="label transition-colors hover:text-foreground"
          >
            Upwork
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="label transition-colors hover:text-foreground"
          >
            Email
          </a>
          <span className="tabular label">&copy; {year}</span>
        </div>
      </div>
    </footer>
  );
}
