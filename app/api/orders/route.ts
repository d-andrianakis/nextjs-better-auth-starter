// pages/api/hello.ts
'use server';

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await db.select().from(orders);

  return NextResponse.json(response);
}
