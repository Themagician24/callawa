"use client";

import { Button } from "@/components/ui/button";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";
import { PlusIcon, CalendarIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      
      {/* Header principal avec animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="py-6 px-4 md:px-8 bg-gradient-to-r from-white to-indigo-50 rounded-xl shadow-sm
                   border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100/50 border border-indigo-200">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <h5 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight select-none">
            My Meetings
          </h5>
        </div>

        {/* Bouton avec effets sophistiqués */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="group relative overflow-hidden flex items-center gap-2 
                       bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400
                       text-white font-medium shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-90" />
            <span>New Meeting</span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Section filtres avec animation d'entrée */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 py-4 px-1 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
            <FilterIcon className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Filters</span>
          </div>
          
          {/* TODO: Implémenter les filtres ici */}
          <div className="flex-1 flex items-center gap-2">
            {/* Placeholder pour les filtres */}
            <div className="h-8 bg-indigo-100/50 rounded-md animate-pulse w-24" />
            <div className="h-8 bg-indigo-100/50 rounded-md animate-pulse w-32" />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};