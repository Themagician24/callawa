"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export const HomeView = () => {
  const trpc = useTRPC();
  // Replace 'hello' with the correct procedure name from your tRPC router, e.g. 'greeting' or another valid endpoint
    const { data } = useQuery(trpc.Hi.queryOptions({ text: "TheMagician" }));

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-white px-6 py-8 font-sans overflow-hidden">

      {/* === Glow Backgrounds === */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-[#0A0A0A] to-gray-900" />
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00FFAB]/25 rounded-full blur-[140px] -z-10" />
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] opacity-[0.04] bg-cover" />

      {/* === Greeting top left === */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 px-4 py-2 rounded-lg border border-[#00FFAB]/30 bg-white/5 text-[#00FFAB] shadow-sm backdrop-blur-sm text-sm md:text-base max-w-[80%]"
      >
        <span className="font-semibold">🤖 Callawa:</span> {data?.Hi ?? "Hi!"}
      </motion.div>

      {/* === Main Title Center === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center flex-1 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#00FFAB] via-green-400 to-[#00FFAB] bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-[0_0_20px_#00FFAB80]">
          Your Smart Call Assistant
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl font-light">
          Manage and automate all your call appointments with Callawa’s powerful AI.
        </p>
      </motion.div>

      {/* === Typewriter Bottom === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pb-10 text-center"
      >
        <p className="text-[#00FFAB] text-sm md:text-base font-mono drop-shadow-[0_0_5px_#00FFAB80]">
          <Typewriter
            words={[
              "Call scheduling made intelligent.",
              "Automated appointment management.",
              "Never miss a meeting again.",
              "Callawa keeps your time in sync."
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
    </div>
  );
};
