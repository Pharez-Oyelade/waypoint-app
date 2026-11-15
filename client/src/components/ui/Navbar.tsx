import { Globe2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm shadow-xs border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="bg-brand text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl rotate-3 hover:rotate-0 transition-transform shadow-md shadow-primary/20">
            <Globe2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
            Waypoint
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 font-medium text-sm lg:text-base">
          <a
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
          >
            How it works
          </a>
          <a
            href="#destinations"
            className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
          >
            Destinations
          </a>
          <a
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
          >
            Stories
          </a>
        </nav>

        <button className="bg-brand text-white text-xs sm:text-sm font-semibold px-4 py-2 sm:px-5.5 sm:py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 shadow-sm shadow-primary/20">
          Start Planning
        </button>
      </div>
    </header>
  );
}
