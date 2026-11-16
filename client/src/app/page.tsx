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
import HowItWorks from "@/components/landing/HowItWorks";
import Destinations from "@/components/landing/Destinations";

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
      <Navbar />
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

      <Features />
      <HowItWorks />
      <Destinations />

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
