import { z } from "zod";

export const meetingsInsertSchema = z.object(
  {
    name: z.string().min(2, "Name is required").max(50, "Name is too long"),
    agentId: z.string().min(2, "Agent is required").max(50, "AgentId is too long"),
  
   identifier: z.string().min(2, "Identifier is required").max(50, "Identifier is too long"),

  }
);


export const meetingsUpdateSchema = meetingsInsertSchema.extend({ 
  id: z.string().min(2, "Id is required").max(50, "Id is too long"),
  
 });