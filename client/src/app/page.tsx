"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Navigation,
  Calendar as CalendarIcon,
  Globe2,
  Compass,
  Map,
  Star,
  ArrowRight,
  MapPinned,
  Users,
  Banknote,
  Minus,
  Plus,
  Check,
  Bot,
  Luggage,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function LandingPage() {
  // const { scrollYProgress } = useScroll();
  const [destination, setDestination] = useState<string>("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [budget, setBudget] = useState<string>("");
  const [budgetOpen, setBudgetOpen] = useState(false);

  const totalGuests = adults + children;

  return (
    <div className=" bg-background text-foreground overflow-hidden font-sans selection:bg-accent selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        destination={destination}
        setDestination={setDestination}
        destinationOpen={destinationOpen}
        setDestinationOpen={setDestinationOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
        travelersOpen={travelersOpen}
        setTravelersOpen={setTravelersOpen}
        budget={budget}
        setBudget={setBudget}
        budgetOpen={budgetOpen}
        setBudgetOpen={setBudgetOpen}
        totalGuests={totalGuests}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        datePickerOpen={datePickerOpen}
        setDatePickerOpen={setDatePickerOpen}
      />

      {/* value strip */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-12 py-13 grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-4 items-center">
          <div className="flex flex-col items-start sm:items-center">
            <MapPin className="w-10 h-10 text-brand" />
            <h3 className="text-2xl font-bold">Discover</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Find destinations everyone will love
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-center">
            <Users className="w-10 h-10 text-brand" />
            <h3 className="text-2xl font-bold">Decide</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Make group descisions together
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-center">
            <Bot className="w-10 h-10 text-brand" />
            <h3 className="text-2xl font-bold">Plan</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get AI-powered travel suggestions
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-center">
            <Luggage className="w-10 h-10 text-brand" />
            <h3 className="text-2xl font-bold">Travel</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Keep everything in one itinerary
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-black text-4xl mb-4 text-slate-900 dark:text-white">
              From daydream to boarding pass
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Three simple steps to unlock the perfect getaway without the
              planning headache.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 border-t-2 border-dashed border-border -translate-y-1/2 -z-10" />

            {[
              {
                icon: <MapPin />,
                title: "1. Pick your vibe",
                desc: "Beach bum, city explorer, or mountain trekker? Tell us what you love.",
                color: "text-blue-500",
                bg: "bg-blue-100 dark:bg-blue-900/30",
                borderColor: "border-blue-200 dark:border-blue-800",
              },
              {
                icon: <CalendarIcon />,
                title: "2. Magic happens",
                desc: "Our AI crafts an optimized, flexible itinerary with hidden gems included.",
                color: "text-rose-500",
                bg: "bg-rose-100 dark:bg-rose-900/30",
                borderColor: "border-rose-200 dark:border-rose-800",
              },
              {
                icon: <Navigation />,
                title: "3. Go explore",
                desc: "Follow your interactive map on the go. Offline support included.",
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
                className={`bg-background border-2 ${step.borderColor} p-8 rounded-3xl text-center shadow-lg relative group hover:-translate-y-2 transition-transform duration-300`}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${step.bg} ${step.color} group-hover:scale-110 group-hover:rotate-6 transition-all`}
                >
                  {React.cloneElement(
                    step.icon as React.ReactElement<{ className?: string }>,
                    { className: "w-8 h-8" },
                  )}
                </div>
                <h3 className="font-bold text-2xl mb-3 text-slate-800 dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Destinations Inspiration */}
      <section id="destinations" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-heading font-black text-4xl mb-4 text-slate-900 dark:text-white">
                Trending right now
              </h2>
              <p className="text-lg text-slate-500">
                Discover where the Waypoint community is heading.
              </p>
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
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-xl bg-slate-200 dark:bg-slate-800 transform hover:-translate-y-2 transition-all duration-300 ring-4 ring-transparent hover:ring-primary/30"
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

      {/* Social Proof */}
      <section className="py-24 bg-primary/5 dark:bg-primary/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-heading font-black text-4xl mb-16 text-slate-900 dark:text-white">
            Loved by 100,000+ travelers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Solo Backpacker",
                quote:
                  "Waypoint completely changed how I travel. I don't have to worry about missing the train or losing my hotel address anymore. Everything is just beautifully organized.",
                img: "https://i.pravatar.cc/150?u=sarah",
              },
              {
                name: "David Miller",
                role: "Family Vacationer",
                quote:
                  "Planning a trip for a family of 5 used to be a nightmare. Now it's actually fun. The AI suggestions found incredible kid-friendly spots we never would have discovered.",
                img: "https://i.pravatar.cc/150?u=david",
              },
              {
                name: "Elena Torres",
                role: "Digital Nomad",
                quote:
                  "The offline maps feature and collaborative planning saved me and my friends during our remote trip through Vietnam. Absolute must-have app on my phone.",
                img: "https://i.pravatar.cc/150?u=elena",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-border text-left relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA & Footer */}
      <footer className="bg-slate-900 text-white mt-12 overflow-hidden relative border-t-8 border-primary">
        {/* Playful background shapes for the footer */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10%" cy="20%" r="50" fill="#3B82F6" />
            <circle cx="90%" cy="80%" r="100" fill="#F43F5E" />
            <rect
              x="80%"
              y="10%"
              width="60"
              height="60"
              transform="rotate(45)"
              fill="#10B981"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">
            <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 text-white">
              Ready for your next adventure?
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Join thousands of travelers who have upgraded their travel
              experience. Download today and start planning your perfect trip.
            </p>
            <button className="bg-accent text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 hover:-translate-y-1 transition-all shadow-[0_0_40px_rgba(244,63,94,0.4)] cursor-pointer flex items-center justify-center gap-3 mx-auto">
              <span>Get Waypoint Free</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-12 border-t border-slate-800">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary text-white p-2 rounded-xl">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="font-heading font-bold text-2xl tracking-tight text-white">
                  Waypoint
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Making the world smaller, one perfectly planned trip at a time.
                The intelligent companion for modern explorers.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Download App
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Release Notes
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors block"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center border-t border-slate-800 pt-8">
            <p>
              © {new Date().getFullYear()} Waypoint Inc. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {/* Social links placeholder */}
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary transition-colors cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary transition-colors cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
