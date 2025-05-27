// pages/api/hello.ts
'use server';

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const data = await req.json();
  // Adjust the fields as needed to match your orders schema
  const { id, identifier, value , createdAt, updatedAt } = data;

  try {
    const [newOrder] = await db.insert(orders).values({
      id: id,
      identifier: identifier,
      value,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    return NextResponse.json({ success: true, order: newOrder });

    // redirect('/admin');
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}