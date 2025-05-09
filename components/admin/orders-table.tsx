"use server";

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";

export const getData = async () => {
  const data = await db.select().from(orders);
  return data;
};