import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientName: text("client_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  billingAddress: text("billing_address").notNull(),
  testAdCallDate: timestamp("test_ad_call_date"),
  reviewsOrdered: integer("reviews_ordered").default(0),
  amountPaidOnCall: decimal("amount_paid_on_call", { precision: 10, scale: 2 }).default("0.00"),
  nextMonthAgreedPayment: decimal("next_month_agreed_payment", { precision: 10, scale: 2 }).default("0.00"),
  dateOfNextContact: timestamp("date_of_next_contact"),
  dateCommissionsDue: timestamp("date_commissions_due"),
  notes: text("notes"),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
}).extend({
  amountPaidOnCall: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  nextMonthAgreedPayment: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;