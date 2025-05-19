"use server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { orders } from "@/db/schema";

export async function removeOrder(orderId: string) {
  try {
    await db.delete(orders).where(eq(orders.id, orderId));
    return { success: true };
  } catch (error) {
    console.error("Failed to remove order:", error);
    return { success: false, error: error.message };
  }
}