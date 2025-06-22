import { db } from '@/db';
import { agents } from '@/db/schema';
import { agentsInsertSchema } from '@/modules/agents/schema';
import { createTRPCRouter , protectedProcedure } from '@/trpc/init';
import { eq } from 'drizzle-orm';
import { z } from 'zod';




export const agentsRouter = createTRPCRouter({

  //  TODO: Changer getOne to use ProtectedProcedure

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const [existingAgent] = await db
    .select()
    .from(agents)
    .where(eq(agents.id, input.id))

    //  await new Promise((resolve) => setTimeout(resolve, 5000));
    //  throw new TRPCError({code: "BAD_REQUEST"});

    return existingAgent;
  }),


  //  TODO: Changer getMany to use ProtectedProcedure

  getMany: protectedProcedure.query(async () => {
    const data = await db
    .select()
    .from(agents);
    return data;
  }),

  create: protectedProcedure
  .input(agentsInsertSchema)
  .mutation(async ({ input, ctx }) => {
    const  [ createAgent ] =  await db
    .insert(agents)
    .values({
      ...input,
      userId: ctx.auth.user.id,
      identifier: input.identifier 
    })
    .returning()

    return createAgent;
  
  })
  })  