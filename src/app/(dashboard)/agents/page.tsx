import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AgentsView, AgentsViewError } from '@/modules/agents/server/ui/views/agent-views';
import { getQueryClient, trpc } from '@/trpc/server';
import { Suspense } from 'react';
import { LoadingState } from '@/components/loading-state';
import { ErrorBoundary } from 'react-error-boundary';





/**
 * Server-side rendered page with dehydrated React Query cache
 */
const Page = async () => {
  const queryClient = getQueryClient();

  // Pré-fetch les agents via le client TRPC server-side
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading agents..."
            description="This can take few seconds..."
          />
        }
      >
        <ErrorBoundary fallback={<AgentsViewError />}>
        <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
