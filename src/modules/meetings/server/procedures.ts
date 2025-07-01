import { DEFAULT_PAGE, 
  DEFAULT_PAGE_SIZE, 
  Max_PAGE_SIZE,
   MIN_PAGE_SIZE }

    from '@/constants';


import { db } from '@/db';
import { meetings } from '@/db/schema';
import { meetingsInsertSchema, meetingsUpdateSchema } from '@/modules/meetings/schemas';

import { createTRPCRouter , protectedProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { and, count, desc, eq, getTableColumns, ilike } from 'drizzle-orm';
import { z } from 'zod';




export const meetingsRouter = createTRPCRouter({

   // routes/agent.ts
  update: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(
            eq(meetings.id, input.id),
            eq(meetings.userId, ctx.auth.user.id),
          )
        )
        .returning();
  
      if (!updatedMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }
  
      return updatedMeeting;
    }),

   create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const  [ createdMeeting ] =  await db
      .insert(meetings)
      .values({
        ...input,
        userId: ctx.auth.user.id,
       
      })
      .returning();

      // TODO: Create Stream Call, Upsert Stream Users
  
      return createdMeeting;
    
    }),

 

  //  TODO: Changer getOne to use ProtectedProcedure

  getOne: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {

  const [existingMeeting] = await db
    .select({
      // TODO: Changer la valeur de meetingCount en valeur actuelle;
      
      ...getTableColumns(meetings),
    })
    .from(meetings)
    .where(
      and(
        eq(meetings.id, input.id),
        eq(meetings.userId, ctx.auth.user.id),
      )
    );

    if (!existingMeeting) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" });
    }

    //  await new Promise((resolve) => setTimeout(resolve, 5000));
    //  throw new TRPCError({code: "BAD_REQUEST"});

    return existingMeeting;
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
      ...getTableColumns(meetings),
      // TODO: Changer la valeur de meetingCount en valeur actuelle;
    

    })
    .from(meetings)
    .where(
      and(
      eq(meetings.userId, ctx.auth.user.id),
      search ? ilike(meetings.name, `%${search}%`) : undefined,
    )
  )
      .orderBy(desc(meetings.createdAt), desc(meetings.id) )
      .limit(pageSize)
      .offset((page - 1) * pageSize);

     const total = await db
     .select({ count: count() })
     .from(meetings)
     .where(
       and(
         eq(meetings.userId, ctx.auth.user.id),
         search ? ilike(meetings.name, `%${search}%`) : undefined,
       )
     )
     
     const totalPages = Math.ceil(total[0].count / pageSize);


     return {
      items: data,
      total: total[0].count, 
      totalPages
     };


    
  
  }), 
}); 