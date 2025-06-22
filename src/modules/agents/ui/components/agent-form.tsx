"use client";

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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { SparklesIcon } from "lucide-react";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
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
    if (isEdit) {
      console.log("TODO: update agent");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl mx-auto relative"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 animate-pulse rounded-2xl opacity-90 backdrop-blur-lg" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-10 flex flex-col gap-6 rounded-2xl border border-yellow-400/20 p-8 shadow-[0_0_60px_-10px_rgba(255,215,0,0.2)] transition-all duration-300 bg-zinc-950/70 backdrop-blur-md"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute size-28 rounded-full border border-yellow-400/20 blur-xl opacity-30"
            />
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-yellow-300/20 blur-md animate-ping" />
              <GeneratedAvatar
                seed={form.watch("name") || "Agent"}
                variant="bottsNeutral"
                className="size-24 relative z-10 rounded-full border-2 border-yellow-300 shadow-[0_0_30px_-5px_gold]"
              />
            </div>
            <p className="text-xs font-medium text-yellow-300 tracking-widest flex items-center gap-1 uppercase">
              <SparklesIcon className="h-4 w-4" />
              Agent Neural ID
            </p>
          </motion.div>

          {["name", "identifier", "instructions"].map((fieldName) => (
            <FormField
              key={fieldName}
              name={fieldName as keyof z.infer<typeof agentsInsertSchema>}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase text-yellow-200 tracking-wide font-semibold">
                    {fieldName === "name"
                      ? "Agent Name"
                      : fieldName === "identifier"
                      ? "Identifiant"
                      : "Instructions"}
                  </FormLabel>
                  <FormControl>
                    <motion.div whileHover={{ scale: 1.015 }}>
                      {fieldName === "instructions" ? (
                        <Textarea
                          {...field}
                          placeholder="ex: You are a helpful assistant that can answer any question."
                          className="min-h-[120px] bg-zinc-900/40 border border-yellow-400/20 text-yellow-100 placeholder:text-zinc-400/70 rounded-md p-3 focus:ring-2 focus:ring-yellow-400/40 focus:ring-offset-1"
                        />
                      ) : (
                        <Input
                          {...field}
                          placeholder={`ex: ${fieldName === "name" ? "Agent X" : "agent-2045"}`}
                          className="bg-zinc-900/40 border border-yellow-400/20 text-yellow-100 placeholder:text-zinc-400/70 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400/40 focus:ring-offset-1"
                        />
                      )}
                    </motion.div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-between items-center pt-4">
            {onCancel && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isPending}
                  onClick={onCancel}
                  className="border border-yellow-300/20 text-yellow-300 hover:bg-zinc-800/50 hover:text-white"
                >
                  Cancel
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                disabled={isPending}
                className="px-6 py-2 font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-[0_0_20px_gold]"
              >
                {isPending ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center gap-2"
                  >
                    <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-300 drop-shadow-[0_0_8px_gold]"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-10 animate-ping"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray="60 40"
                        strokeLinecap="round"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 50 50"
                          to="360 50 50"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="50"
                        cy="50"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="20 10"
                        opacity="0.4"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="360 50 50"
                          to="0 50 50"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </motion.svg>
                    <span className="uppercase text-sm font-bold tracking-wider text-yellow-200">
                      Neural Sync...
                    </span>
                  </motion.span>
                ) : isEdit ? "Update" : "Create"}
              </Button>
            </motion.div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
