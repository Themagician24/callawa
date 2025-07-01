"use client"

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const MeetingsViews = () => {

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));





  return (
    <div>
      Data Table

      {/* TODO: DATA TABLE */}

    </div>
  )
}


export const MeetingsViewLoading = () => {
  return (
    <LoadingState
     title="Loading Meetings..."
      description="This can take few seconds..." 
    />
  )
}

export const MeetingsViewError = () => {
  return (
    <ErrorState
     title="Error loading Meetings"
      description="Something went wrong" 
    />
  )
}


export default MeetingsViews;
