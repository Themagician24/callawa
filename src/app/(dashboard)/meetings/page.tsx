import MeetingsViews, { MeetingsViewError, MeetingsViewLoading } from '@/modules/meetings/ui/views/meetings-views'
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

function page() {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc
    .meetings
    .getMany.queryOptions({}));






  return (

    <HydrationBoundary state={dehydrate(queryClient)}> 

       <Suspense fallback={<MeetingsViewLoading />}>

       <ErrorBoundary fallback={<MeetingsViewError />}>

           <MeetingsViews />

    </ErrorBoundary>

    </Suspense>

    </HydrationBoundary>

  )
}

export default page