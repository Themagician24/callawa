"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "TheMagician" }));

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#05060e] text-white px-4 py-20 overflow-hidden">

      {/* --- Background Layers --- */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0f172a] via-[#05060e] to-black" />
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] opacity-[0.03] bg-cover" />

      {/* --- Glow Effect --- */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      {/* --- Title & Tagline --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-xl">
          Meet Callawa AI
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-400 font-light">
          Your AI scheduling assistant for smarter, stress-free call meetings.
        </p>
      </motion.div>

      {/* --- Typewriter Messages --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-10"
      >
        <p className="text-cyan-300 text-base md:text-lg font-mono text-center">
          <Typewriter
            words={[
              "Seamless call scheduling. Powered by AI.",
              "Call confirmations, reminders, and follow-ups.",
              "Avoid conflicts. Let AI handle timezones.",
              "Built for teams, freelancers & enterprises."
            ]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1800}
          />
        </p>
      </motion.div>

      {/* --- AI Greeting (if present) --- */}
      {data?.greeting && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-14 px-6 py-5 border border-cyan-600/30 bg-white/5 rounded-xl backdrop-blur-lg text-gray-300 max-w-lg text-center shadow-md"
        >
          <span className="text-cyan-400 font-medium"> 🤖 Callawa AI  :</span> {data.greeting}
        </motion.div>
      )}

      {/* --- Footer Info --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-16 text-[11px] text-gray-500 uppercase tracking-wider"
      >
        Smart Scheduling Engine · Real-time Calendar Sync · AI Assistance
      </motion.div>
    </div>
  );
};
