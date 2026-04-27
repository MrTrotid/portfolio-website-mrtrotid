// Imports motion layer for scroll-based animations
import { MotionLayer } from "@/components/cinematic/motion-layer";
// Imports AboutSection component for the about section
import { AboutSection } from "@/components/sections/about-section";
// Imports AchievementsSection component to display achievements
import { AchievementsSection } from "@/components/sections/achievements-section";
// Imports ContactSection component for contact information
import { ContactSection } from "@/components/sections/contact-section";
// Imports ExperienceSection component for work experience
import { ExperienceSection } from "@/components/sections/experience-section";
// Imports CertificationsSection component for certifications
import { CertificationsSection } from "@/components/sections/certifications-section";
// Imports HeroSection component for the main hero area
import { HeroSection } from "@/components/sections/hero-section";
// Imports LeadershipSection component for leadership roles
import { LeadershipSection } from "@/components/sections/leadership-section";
// Imports ProjectsSection component for displaying projects
import { ProjectsSection } from "@/components/sections/projects-section";
// Imports SkillsSection component for skills display
import { SkillsSection } from "@/components/sections/skills-section";
// Imports WhatIDoSection component for listing what I do
import { WhatIDoSection } from "@/components/sections/what-i-do-section";
// Imports profile data containing all portfolio information
import { profile } from "@/lib/profile";

// Disables static revalidation for dynamic rendering
export const revalidate = false;

// Main Page component that composes all portfolio sections
const Page = () => {
  return (
    // Main container with relative positioning and z-index layering
    <main id="top" className="relative z-10">
      <MotionLayer />

      <HeroSection
        name={profile.name}
        alias={profile.alias}
        role={profile.role}
        links={profile.links}
      />

      {/* About section with intro and what I do */}
      <div id="about" className="space-y-2" data-panel>
        <section className="px-6 py-12 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start md:gap-8">
            {/* About introduction */}
            <AboutSection intro={profile.intro} />
            {/* What I do list */}
            <WhatIDoSection items={[...profile.whatIDo]} />
          </div>
        </section>
        {/* Skills section */}
        <SkillsSection skills={profile.skills} />
      </div>

      {/* Projects section with carousel */}
      <div id="projects" data-panel>
        <ProjectsSection
          projects={[...profile.projects]}
          projectsUrl={profile.links.projects}
        />
      </div>

      {/* Experience section with timeline */}
      <div id="experience" data-panel>
        <ExperienceSection items={[...profile.experience]} />
      </div>
      {/* Certifications section */}
      <div id="certifications" data-panel>
        <CertificationsSection 
          items={[...profile.certifications]} 
          certificationsUrl={profile.links.certifications}
        />
      </div>
      {/* Leadership section with organization cards */}
      <div data-panel>
        <LeadershipSection items={[...profile.leadership]} />
      </div>
      {/* Achievements section */}
      <div data-panel>
        <AchievementsSection items={[...profile.achievements]} />
      </div>

      {/* Contact section with orbit links */}
      <div id="contact" data-panel>
        <ContactSection links={profile.links} />
      </div>
    </main>
  );
};

export default Page;
