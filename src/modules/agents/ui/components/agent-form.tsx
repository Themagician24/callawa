import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { agentsInsertSchema } from "@/modules/agents/schema";
import { AgentGetOne } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

interface AgentFormProps {

  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;

}

export const AgentForm = ({

  onSuccess,
  onCancel,
  initialValues,
} : AgentFormProps) => {
  const trpc = useTRPC();
  // const router = useRouter();
  const queryClient = useQueryClient();


  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
     await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions(),
        );
        if (initialValues?.id) {
        await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.();

      },
      onError: (error) => {
        toast.error(error.message);

        // TODO: Check if error code is "FORBIDDEN", redirect to "/Upgrade"
      },
        
      
    }),
  );


  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
      identifier: initialValues?.identifier || "",
    },
    resolver: zodResolver(agentsInsertSchema),
  });


  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;


  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if(isEdit) {
      console.log("TODO: update agent");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="w-full max-w-xl mx-auto"
>
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-2xl border border-gold-500/30  p-8 shadow-lg shadow-gold-500/10 transition-all duration-300 backdrop-blur-sm"
    >
      {/* Avatar animé avec effets améliorés */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute size-28 rounded-full border border-gold-500/20 opacity-20"
        />
        <GeneratedAvatar
          seed={form.watch("name") || "Agent"}
          variant="bottsNeutral"
          className="size-25 relative z-10 rounded-full border-2 border-gold-500/50 shadow-lg shadow-gold-500/20 transition-all hover:shadow-gold-500/30"
        />
        <p className="text-sm text-gold-400/80">Avatar</p>
      </motion.div>

      {/* Champ Name */}
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-gold-400">
              Agent Name
            </FormLabel>
            <FormControl>
              <motion.div whileHover={{ scale: 1.005 }}>
                <Input
                  {...field}
                  placeholder="ex: My Agent"
                  className="bg-black/50 text-white border-gold-500/30 focus:border-gold-500/50 focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black placeholder:text-gray-400"
                />
              </motion.div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Champ Identifier */}
      <FormField
        name="identifier"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-gold-400">
              Identifier
            </FormLabel>
            <FormControl>
              <motion.div whileHover={{ scale: 1.005 }}>
                <Input
                  {...field}
                  placeholder="ex: agent-001"
                  className="bg-black/50 text-white border-gold-500/30 focus:border-gold-500/50 focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black placeholder:text-gray-400"
                />
              </motion.div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Champ Instructions */}
      <FormField
        name="instructions"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-gold-400">
              Instructions
            </FormLabel>
            <FormControl>
              <motion.div whileHover={{ scale: 1.005 }}>
                <Textarea
                  {...field}
                  placeholder="e.g. You are a helpful assistant. Answer clearly and concisely. Prefer simple language for complex math explanations."
                  className="min-h-[120px] resize-y rounded-lg bg-black/50 text-white border-gold-500/30 focus:border-gold-500/50 focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black placeholder:text-gray-400 p-3"
                />
              </motion.div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Actions - Boutons avec effets améliorés */}
      <div className="flex justify-between items-center pt-4">
        {onCancel && (
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => onCancel()}
              className="text-sm font-medium transition-all bg-red-400 border-red-500/30 hover:border-red-500/50 text-white shadow-lg "
            >
              Cancel
            </Button>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 font-medium transition-all bg-gradient-to-r from-gold-600 to-gold-500 text-black hover:from-gold-500 hover:to-gold-400 shadow-lg shadow-gold-500/20"
          >
            {isPending ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                ⌛
              </motion.span>
            ) : isEdit ? (
              "Update Agent"
            ) : (
              "Create Agent"
            )}
          </Button>
        </motion.div>
      </div>
    </form>
  </Form>
</motion.div>


  )
}