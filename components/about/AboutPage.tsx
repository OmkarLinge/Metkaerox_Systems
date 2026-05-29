import AboutSection from "./AboutSection";
import MissionTimeline from "./MissionTimeline";
import TechnologySection from "./TechnologySection";
import SiteShell from "@/components/layout/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutSection />
      <MissionTimeline />
      <TechnologySection />
    </SiteShell>
  );
}
