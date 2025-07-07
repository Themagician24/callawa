"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { useTRPC } from "@/trpc/client";
import { meetingsInsertSchema } from "@/modules/meetings/schema";
import { MeetingGetOne } from "@/modules/meetings/types";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentsSearch, setAgentsSearch] = useState("");

  // Fetch agents
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentsSearch,
    })
  );

  // Mutations
  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        onSuccess?.(data.id);
      },
      onError: (error) => toast.error(error.message),
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => toast.error(error.message),
    })
  );

  // Form
  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    defaultValues: {
      name: initialValues?.name || "",
      agentId: initialValues?.agentId || "",
    },
    resolver: zodResolver(meetingsInsertSchema),
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
    <>
     <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />

<div className="max-w-md mx-auto w-full">
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-lg border border-green-500/30 p-5 bg-zinc-900"
    >
      <h2 className="text-lg font-semibold text-green-300">
        {isEdit ? "Edit Meeting" : "Create Meeting"}
      </h2>

      {/* Meeting Name */}
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-white">Meeting Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Daily Standup"
                className="border-green-400/30 focus:ring-green-400 bg-zinc-800 text-white"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* Agent Selection */}
      <FormField
        name="agentId"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-white">Agent</FormLabel>
            <FormControl>
              <CommandSelect
                options={(
                  Array.isArray(agents.data)
                    ? agents.data
                    : agents.data?.items ?? []
                ).map((agent: { id: string; name: string }) => ({
                  id: agent.id,
                  value: agent.id,
                  children: (
                    <div className="flex items-center gap-2">
                      <GeneratedAvatar seed={agent.name} variant="bottsNeutral" className="w-2 h-2" />
                      <span className="text-dark font-semibold">{agent.name}</span>
                    </div>
                  ),
                }))}
                onSelect={field.onChange}
                onSearch={setAgentsSearch}
                value={field.value}
                placeholder="Select an agent"
              />
            </FormControl>
            <div className="text-xs text-white mt-1">
              Can&apos;t find your agent?{" "}
              <button
                type="button"
                onClick={() => setOpenNewAgentDialog(true)}
                className="underline hover:text-green-300"
              >
                Create one
              </button>
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            className="text-white hover:bg-zinc-800 border border-green-400/20"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="bg-green-400 text-black hover:bg-green-500"
        >
          {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  </Form>
</div>
    </>
  );  
};
