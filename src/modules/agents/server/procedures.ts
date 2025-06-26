import { DEFAULT_PAGE, 
  DEFAULT_PAGE_SIZE, 
  Max_PAGE_SIZE,
   MIN_PAGE_SIZE }

    from '@/constants';


import { db } from '@/db';
import { agents } from '@/db/schema';
import { agentsInsertSchema, agentsUpdateSchema } from '@/modules/agents/schema';
import { createTRPCRouter , protectedProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';
import { z } from 'zod';




export const agentsRouter = createTRPCRouter({

 // routes/agent.ts
update: protectedProcedure
  .input(agentsUpdateSchema)
  .mutation(async ({ input, ctx }) => {
    const [updatedAgent] = await db
      .update(agents)
      .set({
        name: input.name,
        instructions: input.instructions,
        identifier: input.identifier,
        // tous les champs sauf id
      })
      .where(
        and(
          eq(agents.id, input.id),
          eq(agents.userId, ctx.auth.user.id),
        )
      )
      .returning();

    if (!updatedAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found",
      });
    }

    return updatedAgent;
  }),

  remove: protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {

    const [removedAgent] = await db
    .delete(agents)
    .where(
      and(
        eq(agents.id, input.id),
        eq(agents.userId, ctx.auth.user.id),
      ),
    )
    .returning();

    if (!removedAgent) {
      throw new TRPCError({ code: "NOT_FOUND",
         message: "Agent not found" 
        }
      );
    }

   
  }),

  //  TODO: Changer getOne to use ProtectedProcedure

  getOne: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {

  const [existingAgent] = await db
    .select({
      // TODO: Changer la valeur de meetingCount en valeur actuelle;
      meetingCount: sql<number>`5`,
      ...getTableColumns(agents),
    })
    .from(agents)
    .where(
      and(
        eq(agents.id, input.id),
        eq(agents.userId, ctx.auth.user.id),
      )
    );

    if (!existingAgent) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
    }

    //  await new Promise((resolve) => setTimeout(resolve, 5000));
    //  throw new TRPCError({code: "BAD_REQUEST"});

    return existingAgent;
  }),


  //  TODO: Changer getMany to use ProtectedProcedure

  getMany: protectedProcedure

  .input(z.object({
      page: z
      .number()
      .min(1)
      .default(DEFAULT_PAGE),

      pageSize: 
      z
      .number()
      .min(MIN_PAGE_SIZE)
      .max(Max_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE),


      search: z
      .string()
      .nullish(),
  })
)



  .query(async ({ ctx, input  }) => {
    const { search, page, pageSize } = input;
    const data = await db
    .select({
      ...getTableColumns(agents),
      // TODO: Changer la valeur de meetingCount en valeur actuelle;
      meetingCount: sql<number>`5`,

    })
    .from(agents)
    .where(
      and(
      eq(agents.userId, ctx.auth.user.id),
      search ? ilike(agents.name, `%${search}%`) : undefined,
    )
  )
      .orderBy(desc(agents.createdAt), desc(agents.id) )
      .limit(pageSize)
      .offset((page - 1) * pageSize);

     const total = await db
     .select({ count: count() })
     .from(agents)
     .where(
       and(
         eq(agents.userId, ctx.auth.user.id),
         search ? ilike(agents.name, `%${search}%`) : undefined,
       )
     )
     
     const totalPages = Math.ceil(total[0].count / pageSize);


     return {
      items: data,
      total: total[0].count, 
      totalPages
     }


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