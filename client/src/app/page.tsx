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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const destinations = [
  {
    label: "Tokyo, Japan",
    value: "tokyo",
  },
  {
    label: "Paris, France",
    value: "paris",
  },
  {
    label: "New York, USA",
    value: "new-york",
  },
  {
    label: "Sydney, Australia",
    value: "sydney",
  },
  {
    label: "Rio de Janeiro, Brazil",
    value: "rio-de-janeiro",
  },
  {
    label: "Rome, Italy",
    value: "rome",
  },
  {
    label: "Bali, Indonesia",
    value: "bali",
  },
];

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
      <section className="relative flex min-h-svh lg:h-svh flex-col items-center justify-between px-4 pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-12 lg:pb-14">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto">
          {/* Text block */}
          <div className="text-center flex flex-col items-center shrink-0">
            <h1 className="text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold font-sans tracking-tight leading-[1.08]">
              Plan together. <br /> Travel further.
            </h1>

            <p className="text-base sm:text-lg max-w-[580px] mx-auto mt-4 text-slate-600 dark:text-slate-300 leading-relaxed px-2 sm:px-0">
              Waypoint turns messy group chats into one shared itinerary with AI
              that suggests routes and budget for everyone.
            </p>

            <div className="flex w-full max-w-xs flex-col items-center justify-center gap-3 mx-auto mt-6 sm:max-w-none sm:flex-row sm:gap-3.5 sm:mt-7">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto h-12 px-7 sm:px-8 text-sm sm:text-base font-semibold shadow-md shadow-primary/25 rounded-full"
              >
                Start planning
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-7 sm:px-8 text-sm sm:text-base font-semibold rounded-full"
              >
                Watch how it works
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full flex items-center justify-center mt-6 sm:mt-7 lg:mt-6 px-0 sm:px-2">
            <div className="relative w-[114%] -mx-[7%] sm:w-full sm:mx-auto max-w-[500px] sm:max-w-2xl lg:max-w-5xl flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent rounded-full blur-2xl -z-10 scale-95" />
              <Image
                src="/images/waypoint.png"
                alt="Waypoint travel companion"
                width={2312}
                height={894}
                className="w-full h-auto max-h-[35svh] sm:max-h-[40svh] lg:max-h-[46svh] object-contain drop-shadow-md"
                priority
              />
            </div>
          </div>

          {/* Options Selection Bar */}
          <div className="relative z-20 w-full max-w-[1040px] mx-auto -mt-6 sm:-mt-8 lg:-mt-10 px-2 sm:px-4">
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl md:rounded-full shadow-2xl shadow-slate-200/70 dark:shadow-slate-950/70 p-3 md:pl-6 md:pr-3 md:py-2 md:h-[84px] flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-1">
              {/* Destination */}
              <div className="flex-1 min-w-0">
                <Popover
                  open={destinationOpen}
                  onOpenChange={setDestinationOpen}
                >
                  <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <MapPin className="w-4 h-4" />
                      <span>Destination</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                      {destinations.find((d) => d.value === destination)
                        ?.label || "Where to?"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    sideOffset={8}
                    className="w-[210px] p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-20 flex flex-col gap-0.5"
                  >
                    {destinations.map((dest) => (
                      <button
                        key={dest.value}
                        type="button"
                        onClick={() => {
                          setDestination(dest.value);
                          setDestinationOpen(false);
                        }}
                        className={cn(
                          "w-full text-left text-sm py-2 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                          destination === dest.value
                            ? "bg-slate-100 dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300",
                        )}
                      >
                        <span>{dest.label}</span>
                        {destination === dest.value && (
                          <Check className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700/80 shrink-0" />

              {/* Dates - shadcn Range Picker */}
              <div className="flex-1 min-w-0">
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Dates</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                      {dateRange?.from
                        ? dateRange.to &&
                          dateRange.from.getTime() !== dateRange.to.getTime()
                          ? `${format(dateRange.from, "MMM d")} - ${format(
                              dateRange.to,
                              "MMM d",
                            )}`
                          : `${format(dateRange.from, "MMM d")} - Select return`
                        : "Add dates"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl z-20"
                    align="center"
                    sideOffset={14}
                  >
                    <Calendar
                      mode="range"
                      min={1}
                      defaultMonth={dateRange?.from || new Date()}
                      selected={dateRange}
                      onSelect={(range) => {
                        setDateRange(range);
                        // Only close when both start and return dates are selected and are not the same single date
                        if (
                          range?.from &&
                          range?.to &&
                          range.from.getTime() !== range.to.getTime()
                        ) {
                          setDatePickerOpen(false);
                        }
                      }}
                      numberOfMonths={2}
                      className="rounded-2xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700/80 shrink-0" />

              {/* Travelers */}
              <div className="flex-1 min-w-0">
                <Popover open={travelersOpen} onOpenChange={setTravelersOpen}>
                  <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <Users className="w-4 h-4" />
                      <span>Travelers</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                      {totalGuests > 0
                        ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                        : "Add guests"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl z-20 flex flex-col gap-4"
                    align="center"
                    sideOffset={14}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Adults
                        </p>
                        <p className="text-xs text-slate-500">
                          Ages 13 or above
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          disabled={adults <= 1}
                          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                          disabled={adults >= 10}
                          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Children
                        </p>
                        <p className="text-xs text-slate-500">Ages 0 - 12</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          disabled={children <= 0}
                          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setChildren(Math.min(10, children + 1))
                          }
                          disabled={children >= 10}
                          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700/80 shrink-0" />

              {/* Budget */}
              <div className="flex-1 min-w-0">
                <Popover open={budgetOpen} onOpenChange={setBudgetOpen}>
                  <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <Banknote className="w-4 h-4" />
                      <span>Budget</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                      {budget
                        ? budget === "economy"
                          ? "Economy (< $500)"
                          : budget === "moderate"
                            ? "Moderate ($500 - $1.5k)"
                            : budget === "premium"
                              ? "Comfort ($1.5k - $3k)"
                              : budget === "luxury"
                                ? "Luxury ($3k+)"
                                : budget
                        : "Per person"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    sideOffset={8}
                    className="w-[230px] p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-20 flex flex-col gap-0.5"
                  >
                    {[
                      { value: "economy", label: "Economy (< $500)" },
                      { value: "moderate", label: "Moderate ($500 - $1,500)" },
                      { value: "premium", label: "Comfort ($1,500 - $3,000)" },
                      { value: "luxury", label: "Luxury ($3,000+)" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setBudget(item.value);
                          setBudgetOpen(false);
                        }}
                        className={cn(
                          "w-full text-left text-sm py-2 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                          budget === item.value
                            ? "bg-slate-100 dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300",
                        )}
                      >
                        <span>{item.label}</span>
                        {budget === item.value && (
                          <Check className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full md:w-auto rounded-full bg-primary text-white font-semibold text-sm md:text-base px-8 h-[52px] shadow-lg cursor-pointer shrink-0 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center"
              >
                Plan my trip
              </button>
            </div>
          </div>
        </div>
      </section>

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

      {/* Core Features */}
      <section
        id="features"
        className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 text-slate-900 dark:text-white">
                Your entire trip in one pocket
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                We've combined everything you need into a single, beautiful app.
                No more juggling between maps, booking emails, and notes.
              </p>

              <ul className="space-y-6">
                {[
                  {
                    title: "Smart Maps",
                    desc: "We automatically route your path to minimize transit time.",
                  },
                  {
                    title: "Live Updates",
                    desc: "Get notified of flight delays, weather shifts, or reservation changes instantly.",
                  },
                  {
                    title: "Collaborative Planning",
                    desc: "Invite friends to vote on activities, split costs, and share photos.",
                  },
                ].map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 shadow-sm border border-accent/20">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-slate-800 dark:text-slate-200">
                        {feature.title}
                      </h4>
                      <p className="text-slate-500">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 rounded-[3rem] shadow-2xl p-4 overflow-hidden aspect-[4/5] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col">
                  {/* Fake App UI */}
                  <div className="h-14 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-border flex items-center justify-center shadow-sm z-10">
                    <div className="font-bold text-lg text-slate-800 dark:text-white">
                      Tokyo Itinerary
                    </div>
                  </div>
                  <div className="p-4 space-y-4 flex-1 overflow-hidden relative">
                    {/* Fake Map Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id="grid"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 20 0 L 0 0 0 20"
                              fill="none"
                              stroke="currentColor"
                              className="text-primary"
                              strokeWidth="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    <div className="h-28 bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 flex gap-4 relative z-10 hover:scale-[1.02] transition-transform border border-border/50">
                      <div className="w-20 h-full bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-500">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 w-3/4 rounded-full" />
                        <div className="h-3 bg-slate-100 dark:bg-slate-600 w-1/2 rounded-full" />
                      </div>
                    </div>
                    <div className="h-28 bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 flex gap-4 relative z-10 hover:scale-[1.02] transition-transform border border-border/50">
                      <div className="w-20 h-full bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center text-rose-500">
                        <Navigation className="w-8 h-8" />
                      </div>
                      <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 w-5/6 rounded-full" />
                        <div className="h-3 bg-slate-100 dark:bg-slate-600 w-1/3 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
