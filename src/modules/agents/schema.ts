import { z } from "zod";

export const agentsInsertSchema = z.object(
  {
    name: z.string().min(2, "Name is required").max(50, "Name is too long"),
   instructions: z.string().min(2, "Instructions is required").max(1000, "Instructions is too long"),
   identifier: z.string().min(2, "Identifier is required").max(50, "Identifier is too long"),

  }
);


export const agentsUpdateSchema = agentsInsertSchema.extend({ 
  id: z.string().min(2, "Id is required").max(50, "Id is too long"),
  
 });