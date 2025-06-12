import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your drizzle schema
 
 
export const auth = betterAuth({

     emailAndPassword: {
            enabled: true, // Enable email and password authentication
            // You can add more configuration options here if needed
        },
     database: drizzleAdapter(db, {
       
        provider: "pg", 
        schema: {
            ...schema,
        }
    }),
})