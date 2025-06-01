"use server";
import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await db.select().from(orders);
    if (!result.length) {
        return NextResponse.json({ error: "No Orders found" }, { status: 404 });
    }
    // Map dates to ISO strings for all orders
    const ordersWithDates = result.map(order => ({
        ...order,
        createdAt: order.createdAt ? order.createdAt.toISOString() : null,
        updatedAt: order.updatedAt ? order.updatedAt.toISOString() : null,
    }));
    return NextResponse.json(ordersWithDates);
}