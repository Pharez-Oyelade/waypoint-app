"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  Bot,
  CheckCircle2,
  MapPin,
  Wallet,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  BarChart2,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Users,
    title: "Easy Group Travel",
    desc: "Plan together with friends, share ideas, and vote on options.",
  },
  {
    icon: Bot,
    title: "AI Itinerary Builder",
    desc: "Instantly turn your plans into a detailed itinerary.",
  },
  {
    icon: CheckCircle2,
    title: "Vote & Decide",
    desc: "Let everyone vote, lock plans and get ready.",
  },
  {
    icon: MapPin,
    title: "Live Shared Map",
    desc: "Keep track, share your route and reservations in real time.",
  },
  {
    icon: Wallet,
    title: "Budget & Split",
    desc: "Track shared costs and settle up easily.",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Features() {
  // Animated conversation states
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");
  const [typedText3, setTypedText3] = useState("");
  const [showChiomaTyping, setShowChiomaTyping] = useState(false);
  const [showChiomaBubble, setShowChiomaBubble] = useState(false);
  const [showAiBubble, setShowAiBubble] = useState(false);
  const [showAiCard, setShowAiCard] = useState(false);
  const [showVotingCard, setShowVotingCard] = useState(false);
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);
  const [isTyping3, setIsTyping3] = useState(false);

  const msg1 = "Let's plan a trip to Bali 🌴";
  const msg2 = "Bro Ireeee, Sounds great!";
  const msg3 = "Here's a draft itinerary for your trip:";

  useEffect(() => {
    let isCancelled = false;

    async function runSequence() {
      while (!isCancelled) {
        // Reset all states
        setTypedText1("");
        setTypedText2("");
        setTypedText3("");
        setShowChiomaTyping(false);
        setShowChiomaBubble(false);
        setShowAiBubble(false);
        setShowAiCard(false);
        setShowVotingCard(false);
        setIsTyping1(true);
        setIsTyping2(false);
        setIsTyping3(false);

        await delay(400);
        if (isCancelled) break;

        // You message
        for (let i = 1; i <= msg1.length; i++) {
          if (isCancelled) return;
          setTypedText1(msg1.slice(0, i));
          await delay(35);
        }
        setIsTyping1(false);
        await delay(700);
        if (isCancelled) break;

        // Typing Indicator
        setShowChiomaTyping(true);
        await delay(900);
        if (isCancelled) break;
        setShowChiomaTyping(false);
        setShowChiomaBubble(true);
        setIsTyping2(true);

        // Chioma types message
        for (let i = 1; i <= msg2.length; i++) {
          if (isCancelled) return;
          setTypedText2(msg2.slice(0, i));
          await delay(45);
        }
        setIsTyping2(false);
        await delay(800);
        if (isCancelled) break;

        // Waypoint AI typing
        setShowAiBubble(true);
        setIsTyping3(true);
        for (let i = 1; i <= msg3.length; i++) {
          if (isCancelled) return;
          setTypedText3(msg3.slice(0, i));
          await delay(25);
        }
        setIsTyping3(false);
        await delay(400);
        if (isCancelled) break;

        // Reveal AI Itinerary Card
        setShowAiCard(true);
        await delay(900);
        if (isCancelled) break;

        // Reveal Voting Decision Card
        setShowVotingCard(true);

        // Pause for 10 seconds in the complete, settled reference state
        await delay(10000);
      }
    }

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section
      id="features"
      className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-slate-950 transition-colors"
    >
      {/* Background Dotted Flight Path & Plane */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Organic Backing Shape for Right Side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-gradient-to-br from-[#F3ECE2] via-[#EFE6D8]/80 to-[#E8DCB9]/40 dark:from-slate-900/60 dark:to-slate-800/40 rounded-full blur-3xl -z-10 translate-x-1/4 scale-110" />

        {/* Decorative Dotted Flight Curves SVG */}
        <svg
          className="absolute right-0 top-0 w-[900px] h-full opacity-70 dark:opacity-20"
          viewBox="0 0 900 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main flight path looping behind phone */}
          <path
            d="M 120 460 C 240 280 440 200 620 220 C 760 235 840 180 870 120"
            stroke="#D6C7B2"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <path
            d="M 280 620 C 450 680 680 640 840 440"
            stroke="#D6C7B2"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />

          {/* Flying Airplane at top right */}
          <g transform="translate(835, 125) rotate(-35)">
            <path
              d="M12 2L15 9L22 10.5L16.5 15.5L18 22L12 18.5L6 22L7.5 15.5L2 10.5L9 9L12 2Z"
              className="fill-[#4A5949] dark:fill-emerald-400/80"
            />
          </g>
        </svg>

        {/* Playful top-left dashes /// */}
        <div className="hidden lg:flex absolute right-[430px] top-[140px] items-center gap-1.5 -rotate-12 opacity-80">
          <div className="w-1 h-3.5 bg-[#A8744F] rounded-full -rotate-12" />
          <div className="w-1 h-5 bg-[#A8744F] rounded-full" />
          <div className="w-1 h-3.5 bg-[#A8744F] rounded-full rotate-12" />
        </div>

        {/* Playful sparkle rays on right */}
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-8 opacity-75">
          <div className="relative w-8 h-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#C4976E] rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#C4976E] rounded-full" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-[#C4976E] rounded-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-[#C4976E] rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Feature List */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Features Badge */}
            {/* <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#F3E9DC] dark:bg-amber-950/40 text-[#8C5835] dark:text-amber-300 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-xs">
              Features
            </div> */}

            {/* Heading with brand-accent italic text and wavy underline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Everything your <br />
              group needs, <br />
              <span className="font-serif italic font-normal text-brand-accent relative inline-block">
                in one place
                {/* Hand-drawn wavy underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-brand-accent overflow-visible"
                  viewBox="0 0 220 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 3 9 C 45 3 110 11 217 5"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed mt-6 mb-10">
              Plan, decide and travel together
            </p>

            {/* Features List */}
            <div className="space-y-6 w-full max-w-md">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FAF0E4] dark:bg-slate-800/90 flex items-center justify-center shrink-0 border border-[#F2E4D4] dark:border-slate-700/60 shadow-xs group-hover:scale-105 group-hover:bg-[#F5E6D5] transition-all">
                      <IconComponent className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 pb-12 lg:py-0">
            {/* Phone Container */}
            <div className="relative">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] h-6 bg-black/15 dark:bg-black/40 blur-xl rounded-[100%] pointer-events-none" />

              {/* Tilted Phone Chassis */}
              <div className="relative w-[310px] sm:w-[300px] rounded-[46px] p-[9px] bg-slate-950 border border-slate-700/50 shadow-[0_25px_40px_-15px_rgba(0,0,0,0.35)] transform rotate-[4.5deg] hover:rotate-[2deg] transition-transform duration-500">
                {/* Outer Volume & Power Buttons */}
                <div className="absolute -left-[7px] top-24 w-[3px] h-8 bg-slate-800 rounded-l-md" />
                <div className="absolute -left-[7px] top-36 w-[3px] h-10 bg-slate-800 rounded-l-md" />
                <div className="absolute -right-[7px] top-28 w-[3px] h-12 bg-slate-800 rounded-r-md" />

                {/* Inner Screen */}
                <div className="w-full bg-[#F8F9FA] dark:bg-slate-900 rounded-[38px] overflow-hidden flex flex-col h-[590px] border border-slate-200/60 dark:border-slate-800 relative">
                  {/* Dynamic Island */}
                  <div className="pt-2.5 pb-1 flex justify-center bg-white dark:bg-slate-900 shrink-0">
                    <div className="w-20 h-[23px] bg-black rounded-full flex items-center justify-end pr-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                    </div>
                  </div>

                  {/* Chat Top Nav Bar */}
                  <div className="px-3.5 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-xs">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900"
                        aria-label="Back"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=150&q=80"
                          alt="Trip Squad"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          Trip Squad ✈️
                        </span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">
                          4 members • Online
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      aria-label="Options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Chat Message Scroll Area */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2.5 flex flex-col justify-start no-scrollbar">
                    {/* Message 1 */}
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-200">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                          alt="You"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 border border-slate-100 dark:border-slate-700/60 shadow-xs max-w-[82%] text-left">
                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          You
                        </div>
                        <div className="text-xs text-slate-800 dark:text-slate-100 font-medium min-h-[1.125rem]">
                          {typedText1}
                          {isTyping1 && (
                            <span className="inline-block w-1 h-3 bg-brand-accent ml-0.5 animate-pulse" />
                          )}
                        </div>
                        <div className="text-[8px] text-slate-400 text-right mt-0.5">
                          9:24 AM
                        </div>
                      </div>
                    </div>

                    {/* Chioma Typing Indicator */}
                    <AnimatePresence>
                      {showChiomaTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-200">
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                              alt="Chioma"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 border border-slate-100 dark:border-slate-700/60 shadow-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message 2 */}
                    <AnimatePresence>
                      {showChiomaBubble && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-200">
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                              alt="Chioma"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 border border-slate-100 dark:border-slate-700/60 shadow-xs max-w-[82%] text-left">
                            <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                              Pleasant
                            </div>
                            <div className="text-xs text-slate-800 dark:text-slate-100 font-medium min-h-[1.125rem]">
                              {typedText2}
                              {isTyping2 && (
                                <span className="inline-block w-1 h-3 bg-brand-accent ml-0.5 animate-pulse" />
                              )}
                            </div>
                            <div className="text-[8px] text-slate-400 text-right mt-0.5">
                              9:26 AM
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message 3 */}
                    <AnimatePresence>
                      {showAiBubble && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-slate-800 rounded-2xl p-2.5 border border-blue-100 dark:border-slate-700/60 shadow-xs space-y-2 text-left"
                        >
                          {/* AI Header */}
                          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                            <Bot className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                            <span className="text-[11px] font-bold">
                              Waypoint AI
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-700 dark:text-slate-200 min-h-[1rem]">
                            {typedText3}
                            {isTyping3 && (
                              <span className="inline-block w-1 h-3 bg-blue-500 ml-0.5 animate-pulse" />
                            )}
                          </div>

                          {/* Itinerary Preview Card */}
                          {showAiCard && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/60 p-1.5 hover:border-slate-200 transition-colors"
                            >
                              <div className="h-20 w-full rounded-lg overflow-hidden relative">
                                <img
                                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80"
                                  alt="Bali Adventure"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex items-center justify-between px-1 pt-1.5">
                                <div>
                                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                                    Bali Adventure
                                  </div>
                                  <div className="text-[9px] text-slate-500 dark:text-slate-400">
                                    5 days • Apr 12 – 16, 2026
                                  </div>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs">
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message 4 */}
                    <AnimatePresence>
                      {showVotingCard && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35 }}
                          className="bg-white dark:bg-slate-800 rounded-2xl p-2.5 border border-slate-100 dark:border-slate-700/60 shadow-xs flex flex-col gap-2 text-left"
                        >
                          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
                            <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[11px] font-semibold">
                              3 of 4 voted for this trip
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Avatars Stack */}
                            <div className="flex items-center -space-x-1.5">
                              <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                                alt="Voter"
                                className="w-5 h-5 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                              />
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                                alt="Voter"
                                className="w-5 h-5 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                              />
                              <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                                alt="Voter"
                                className="w-5 h-5 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                              />
                              <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 ring-2 ring-white dark:ring-slate-800 text-[8px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                                +1
                              </div>
                            </div>

                            {/* View Results Button */}
                            <button
                              type="button"
                              className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs transition-colors"
                            >
                              View Results
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Message Input Bar */}
                  <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      aria-label="Add attachment"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 bg-slate-100/90 dark:bg-slate-800/80 rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                      Type a message...
                    </div>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center shadow-xs"
                      aria-label="Send message"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Bottom-Left ("Trip Details") */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-6 sm:-left-32 bottom-24 sm:bottom-28 z-30 w-[185px] sm:w-[200px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-800 text-left -rotate-[3deg]"
              >
                <div className="flex items-center gap-2 mb-3">
                  {/* Wavy Route Icon */}
                  <div className="w-5 h-5 flex items-center justify-center text-emerald-600">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="6" cy="19" r="3" />
                      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                      <circle cx="18" cy="5" r="3" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Trip Details
                  </span>
                </div>

                <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Flights booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#B8933A] flex items-center justify-center text-white shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Hotel confirmed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Activities added</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2: Top-Right ("Bali Getaway") */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -right-6 sm:-right-32 top-8 sm:top-12 z-30 w-[190px] sm:w-[210px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-slate-100 dark:border-slate-800 text-left rotate-[5.5deg]"
              >
                {/* Image with Checkmark Badge */}
                <div className="h-28 w-full rounded-xl overflow-hidden relative shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80"
                    alt="Bali Getaway"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center text-white shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Bali Getaway
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Apr 12 – 16, 2026
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-300 font-medium my-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-500" />4 people
                    </span>
                    <span className="flex items-center gap-1">
                      <Wallet className="w-3 h-3 text-slate-500" />
                      $820 pp
                    </span>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-brand hover:bg-[#16141d] text-white text-[11px] font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-colors"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
