import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

    
import { getQueryClient, trpc } from '@/trpc/server';
import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { AgentsView, AgentsViewError, AgentsViewLoading } from '@/modules/agents/views/agent-views';
import AgentsListHeader from '@/modules/agents/ui/components/agents-list-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';






/**
 * Server-side rendered page with dehydrated React Query cache
 */
const Page = async () => {

  //Protection des donnees 

  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    redirect("/sign-in");
  }



  const queryClient = getQueryClient();

  // Pré-fetch les agents via le client TRPC server-side
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (

    <>

    <AgentsListHeader/>

    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={ <AgentsViewLoading/>} >
      <ErrorBoundary fallback={<AgentsViewError />} >
        <AgentsView />
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>

    </>
  );
};

export default Page;
