'use server';

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// import RemoveOrder from "./removeOrder";
import { Button } from "@/components/ui/button";


import OrdersTableClient from "./ordersTableClient";

export default async function OrdersTablesServer() {

    const response = await db.select().from(orders);

    return <OrdersTableClient orders={response} />;
}