import { HackerType } from '@/components/cinematic/hacker-type';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[#2f5d38]/65 bg-[#030704] px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="terminal-prompt text-xs text-[#8b949e]">
            <span className="text-[#8b949e]">$</span> <HackerType text={`echo "© ${currentYear} Baman Prasad Guragain"`} />
          </p>
          
          <a 
            href="#top" 
            className="text-xs text-[#8b949e] transition-colors hover:text-[#39ff14]"
          >
            ↑ Back to Top
          </a>
        </div>
        
        <p className="terminal-prompt mt-4 text-center text-[10px] text-[#4bb964]/50">
          <span className="text-[#8b949e]">$</span> <HackerType text="cd ~/ && have a great day" />
        </p>
      </div>
    </footer>
  );
};
