import { SiteHeader } from "@/components/SiteHeader";
import { Intro } from "@/components/Intro";
import { Work } from "@/components/Work";
import { Roles } from "@/components/Roles";
import { About } from "@/components/About";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { useDocumentHead, SITE_URL } from "@/hooks/use-document-head";
import { profile } from "@/data/profile";

const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: "AI & Machine Learning Engineer",
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "Large Language Models",
      "Agentic workflows",
      "Retrieval Augmented Generation",
      "Model Context Protocol",
      "Computer Vision",
      "MLOps"
    ]
  }
};

/**
 * Order is deliberate: work before employment history. A portfolio argues from
 * what was built; a resume argues from where you sat.
 */
const Index = () => {
  useDocumentHead({
    title: profile.name,
    description:
      "AI engineer building production LLM systems, agentic workflows and computer vision. 5+ years of applied AI delivery for startups and enterprise teams.",
    path: "/",
    jsonLd: HOME_JSONLD
  });

  return (
  <div className="min-h-screen">
    <SiteHeader />
    <main>
      <Intro />
      <Work />
      <Roles />
      <About />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
  );
};

export default Index;
