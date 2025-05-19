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

    try {
        
        return (
            <Table>
			<TableHeader>
				<TableRow>
					<TableHead>Id</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Identifier</TableHead>
					<TableHead>Created at</TableHead>
					<TableHead>Updated at</TableHead>
                    <TableHead>Remove</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
                {response.map((order) => (
                <TableRow key={order.id}>
                    <TableCell>{ order.id }</TableCell>
                    <TableCell>{ order.value }</TableCell>
                    <TableCell>{ order.identifier }</TableCell>
                    <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        {new Date(order.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        {/* <Button onClick={handleRemoveOrder} variant="outline" size="sm">
                            Delete
                        </Button> */}
                        {/* <RemoveOrderButton orderId={order.id} /> */}
                    </TableCell>
                </TableRow>
                ))}
			</TableBody>
		</Table>
        )
        console.log("response", response);
        // return response
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return (
			<div className="flex justify-center p-4">
				<span className="text-red-500">Error:</span>
			</div>
		);
    }
}