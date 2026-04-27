import { profile } from '@/lib/profile';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

// Next.js config for static generation
export const dynamicParams = false;

// Generate static routes for all projects
export function generateStaticParams() {
  return profile.projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic SEO metadata based on the project
export function generateMetadata({ params }: Props) {
  const project = profile.projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }
  
  const description = Array.isArray(project.summary)
    ? project.summary.map(s => s.replace(/\*\*/g, '')).join(' ')
    : project.summary;
    
  return {
    title: `${project.name} - Case Study | ${profile.name}`,
    description: description.substring(0, 160) + '...',
    openGraph: {
      title: `${project.name} | Case Study`,
      description: description.substring(0, 160) + '...',
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = profile.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative z-10 min-h-screen bg-[#030704] text-[#d6ffe0]">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-12 lg:px-20 lg:py-32">
        {/* Navigation */}
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm text-[#4bb964] transition-colors hover:text-[#5ca66a] mb-12"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span className="terminal-prompt">$ cd ../</span>
        </Link>

        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-[#8b949e]">
            <span className="terminal-prompt border border-[#4bb964]/35 bg-[#0c1b10]/70 px-3 py-1 rounded-full">
              #{project.year}
            </span>
            <div className="flex gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="border border-[#4bb964]/20 bg-[#0d1f12]/50 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <h1 className="content-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f1fff3]">
            {project.name}
          </h1>
        </header>

        {/* Hero Image */}
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#4bb964]/20 bg-[#0c1610]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        {/* Content */}
        <div className="mt-16 space-y-12">
          {Array.isArray(project.summary) ? (
             <div className="grid gap-8 sm:grid-cols-1">
               {project.summary.map((para, i) => {
                 // Basic parser for **bold** text
                 const parts = para.split(/(\*\*.*?\*\*)/g);
                 const formattedPara = parts.map((part, j) => {
                   if (part.startsWith('**') && part.endsWith('**')) {
                     return <strong key={j} className="text-[#f1fff3] font-semibold block mb-2 text-lg">{part.slice(2, -2)}</strong>;
                   }
                   return part;
                 });
                 
                 return (
                   <section key={i} className="glass rounded-3xl p-6 md:p-8">
                     <p className="text-[#c1f5ce] leading-relaxed text-base sm:text-lg">
                       {formattedPara}
                     </p>
                   </section>
                 );
               })}
             </div>
          ) : (
            <section className="glass rounded-3xl p-6 md:p-8 text-[#c1f5ce] leading-relaxed text-lg">
              <p>{project.summary}</p>
            </section>
          )}
          
          <div className="pt-8">
            <a 
              href={project.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#4bb964]/50 bg-[#0c1b10]/90 px-8 py-4 text-sm font-medium tracking-widest text-[#d5ffe0] transition-all hover:bg-[#14321b] hover:scale-105"
            >
              View Live Project ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
