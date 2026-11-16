import { ArrowRight } from "lucide-react";

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <h2 className="font-heading max-w-[640px] font-bold leading-[56px] tracking-tight text-[48px] mb-4 text-slate-900 dark:text-white">
              Trending destinations to plan together
            </h2>
          </div>
          <button className="text-primary font-bold hover:text-primary/80 mt-4 md:mt-0 flex items-center gap-1 cursor-pointer group">
            View all destinations{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Kyoto, Japan",
              tag: "Cultural",
              color: "from-pink-500/90",
              img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Amalfi Coast, Italy",
              tag: "Romantic",
              color: "from-blue-500/90",
              img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Banff, Canada",
              tag: "Nature",
              color: "from-emerald-500/90",
              img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Santorini, Greece",
              tag: "Relaxing",
              color: "from-cyan-500/90",
              img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
          ].map((dest, i) => (
            <div
              key={i}
              className="group relative h-[380px] rounded-[28px] overflow-hidden cursor-pointer shadow-xl bg-slate-200 dark:bg-slate-800 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-t ${dest.color} via-transparent to-transparent opacity-80 z-10 transition-opacity group-hover:opacity-100`}
              />
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${dest.img})` }}
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider mb-2 border border-white/30">
                  {dest.tag}
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {dest.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
