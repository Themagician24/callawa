import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

/**
 * Hook pour afficher un dialog de confirmation réutilisable
 * 
 * @param title - Le titre du dialogue
 * @param description - Le message affiché dans le dialogue
 * @returns [Component, confirmFunction] - Le composant du dialog + la fonction pour déclencher la confirmation
 */
export const useConfirm = (
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => setPromise(null);
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  // Composant stylisé du dialogue
  const ConfirmationDialog = () => (
    <ResponsiveDialog
      title={title}
      description={description}
      open={promise !== null}
      onOpenChange={handleClose}
    >
      <div className="w-full pt-5 flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-3">
        {/* Bouton Annuler */}
        <Button
          variant="outline"
          className="w-full sm:w-auto border-muted hover:bg-muted transition-all duration-200 ease-in-out rounded-xl shadow-sm"
          onClick={handleCancel}
        >
          ❌ Cancel
        </Button>

        {/* Bouton Confirmer */}
        <Button
          className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out rounded-xl shadow-md"
          onClick={handleConfirm}
        >
          ✅ Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};
