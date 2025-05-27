'use server';

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
    const parameters = await params;
    const orderId = parameters.id;

    const result = await db.select().from(orders).where(eq(orders.id, orderId));
    if (!result.length) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
    const parameters = await params;
    const orderId = parameters.id;
    const data = await req.json();

    // Adjust the fields as needed to match your orders schema
    const { identifier, value, createdAt, updatedAt } = data;

    try {
        const [updatedOrder] = await db.update(orders)
        .set({
            identifier,
            value,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
        })
        .where(eq(orders.id, orderId))
        .returning();

        if (!updatedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}