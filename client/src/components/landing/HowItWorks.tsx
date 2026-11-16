import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-4xl sm:text-5xl mb-4 text-slate-900 dark:text-white leading-[56px] tracking-tight">
            Three steps to a trip everyone is excited about
          </h2>
          {/* <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Three simple steps to unlock the perfect getaway without the
              planning headache.
            </p> */}
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 border-t-2 border-dashed border-border -translate-y-1/2 -z-10" />

          {[
            {
              image: "/images/start-trip.jpg",
              title: "Pick your vibe & invite friends",
              desc: "Beach bum, city explorer, or mountain trekker? Tell us what you love. Everyone joins in seconds.",
              color: "text-blue-500",
              bg: "bg-blue-100 dark:bg-blue-900/30",
              borderColor: "border-blue-200 dark:border-blue-800",
            },
            {
              image: "/images/ideas-vote.jpg",
              title: "Add ideas, vote and watch magic happen",
              desc: "Our AI crafts an optimized, flexible itinerary with hidden gems included.",
              color: "text-rose-500",
              bg: "bg-rose-100 dark:bg-rose-900/30",
              borderColor: "border-rose-200 dark:border-rose-800",
            },
            {
              image: "/images/trip-map.jpg",
              title: "Lock the plan and go explore",
              desc: "One itinerary, maps, tickets. Follow your interactive map on the go. Offline support included.",
              color: "text-emerald-500",
              bg: "bg-emerald-100 dark:bg-emerald-900/30",
              borderColor: "border-emerald-200 dark:border-emerald-800",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2 }}
              className={`bg-background p-[16px] rounded-[32px] shadow-lg relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-center items-start gap-[20px]`}
            >
              <div className={``}>
                <Image
                  src={step.image}
                  width={352}
                  height={200}
                  alt=""
                  className="rounded-[24px]"
                />
              </div>
              <div className="space-y-[10px]">
                <span className="text-sm text-brand-accent text-bold">
                  STEP {i + 1}
                </span>
                <h3 className="text-[20px] font-bold">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
