"use client";

import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "@/modules/meetings/types";
import { CommandSelect } from "@/components/command-select";
import { useState } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { motion } from "framer-motion";


interface MeetingsFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({ onSuccess, onCancel, initialValues }: MeetingsFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [agentSearch, setAgentSearch] = useState("");

  // Query agents
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  // Setup RHF
  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    defaultValues: {
      name: initialValues?.name || "",
      agentId: initialValues?.agentId || "",
    },
    resolver: zodResolver(meetingsInsertSchema),
  });

  // Mutations
  const createMeeting = useMutation({
    ...trpc.meetings.create.mutationOptions(),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
      toast.success("Meeting created successfully!");
      onSuccess?.(data.id);
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMeeting = useMutation({
    ...trpc.meetings.update.mutationOptions(),
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
      if (initialValues?.id) {
        await queryClient.invalidateQueries(
          trpc.meetings.getOne.queryOptions({ id: initialValues.id })
        );
      }
      toast.success("Meeting updated successfully!");
      onSuccess?.();
    },
    onError: (err) => toast.error(err.message),
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

 
  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 p-8 rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-md shadow-lg shadow-amber-500/10"
      >
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-amber-300 uppercase text-xs font-medium tracking-wider">
                Meeting Name
              </FormLabel>
              <FormControl>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <Input
                    {...field}
                    placeholder="Enter meeting name"
                    className="bg-zinc-800 border-zinc-700 text-white focus:border-amber-400 focus:ring-amber-400/50"
                  />
                </motion.div>
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />

        {/* Agent selection */}
        <FormField
          control={form.control}
          name="agentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-amber-300 uppercase text-xs font-medium tracking-wider">
                Select Agent
              </FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="agentId"
                  render={({ field }) => (
                    <CommandSelect
                      options={agentsList.map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-x-3">
                            <GeneratedAvatar 
                              seed={agent.id}
                              variant="bottsNeutral"
                              className="size-6 border border-amber-400/30"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{agent.name}</span>
                              <span className="text-xs text-zinc-400">{agent.identifier}</span>
                            </div>
                          </div>
                        ),
                      }))}
                      onSelect={(value) => field.onChange(value)}
                      onSearch={setAgentSearch}
                      value={field.value}
                      
                      placeholder="Search for an agent..."
                      
                    />
                  )}
                />
              </FormControl>
              <FormMessage className="text-rose-400" />
            </FormItem>
          )}
        />

        {/* Action buttons */}
        <div className="flex justify-between pt-4">
          {onCancel && (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="button"
                onClick={onCancel}
                disabled={isPending}
                variant="outline"
                className="border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 hover:text-amber-300 transition-colors"
              >
                Cancel
              </Button>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                  Processing...
                </span>
              ) : isEdit ? (
                "Update Meeting"
              ) : (
                "Create Meeting"
              )}
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </Form>
  );
};