import { profile, roles } from "@/data/profile";

/**
 * Experience as a tabular index, not a card timeline. It sits below the work
 * because a portfolio leads with what was built; employment history is
 * supporting evidence, not the argument.
 */
export function Roles() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="shell">
        <div className="section-head">
          <h2 className="label">Experience</h2>
          <span className="label">
            {profile.yearsExperience} years &nbsp;/&nbsp; {roles.length} roles
          </span>
        </div>

        <ol>
          {roles.map((role) => (
            <li key={`${role.company}-${role.period}`} className="border-b border-rule py-8">
              <div className="grid gap-3 md:grid-cols-12 md:gap-8">
                <p className="tabular font-mono text-meta text-muted-foreground md:col-span-2">
                  {role.period}
                </p>
                <div className="md:col-span-7">
                  <h3 className="text-[1.0625rem] font-medium">{role.title}</h3>
                  <p className="mt-2 max-w-measure text-meta text-muted-foreground">{role.note}</p>
                </div>
                <p className="text-meta text-muted-foreground md:col-span-3 md:text-right">
                  {role.company}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
