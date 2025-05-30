"use server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { orders } from "@/db/schema";
import { NextResponse } from "next/server";

export async function getOrder( id: string ) {
    const orderId = id;

    const result = await db.select().from(orders).where(eq(orders.id, orderId));
    if (!result.length) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const order = result[0];
    return {
        ...order,
        createdAt: order.createdAt ? order.createdAt.toISOString() : null,
        updatedAt: order.updatedAt ? order.updatedAt.toISOString() : null,
    };
}