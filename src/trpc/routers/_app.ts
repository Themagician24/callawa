

import { agentsRouter } from '@/modules/agents/server/procedures';
import {  createTRPCRouter } from '../init';
import { meetingsRouter } from '@/modules/meetings/server/procedures';



export const appRouter = createTRPCRouter({

  meetings: meetingsRouter,
  agents: agentsRouter,
  
 
});
// export type definition of API
export type AppRouter = typeof appRouter;