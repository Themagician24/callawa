'use client';

import { ErrorState } from '@/components/error-state';



const  ErrorPage = () => {
  return (
    <ErrorState
     title="Error" 
     description="Something went wrong" />
  )
}

export default ErrorPage;