import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export const useConfirm = (
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => setPromise(null);
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <AnimatePresence>
      {promise && (
        <ResponsiveDialog
          title={title}
          description={description}
          open={promise !== null}
          onOpenChange={handleClose}
        >
          {/* Animation d'entrée/sortie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full pt-6"
          >
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              {/* Bouton Annuler - Style moderne avec effet */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="group relative overflow-hidden w-full sm:w-auto border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl shadow-sm hover:shadow-rose-500/20 transition-all"
                  onClick={handleCancel}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <XCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>Cancel</span>
                  </span>
                  <span className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-all duration-300" />
                </Button>
              </motion.div>

              {/* Bouton Confirmer - Style premium avec dégradé */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  type="button"
                  className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
                  onClick={handleConfirm}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <CheckCircle2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>Confirm</span>
                  </span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                </Button>
              </motion.div>
            </div>

            {/* Effet visuel décoratif */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl -z-10"
            />
          </motion.div>
        </ResponsiveDialog>
      )}
    </AnimatePresence>
  );

  return [ConfirmationDialog, confirm];
};