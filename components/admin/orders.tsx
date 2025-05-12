'use server';

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default async function OrdersTables() {

    try {
        const response = await db.select().from(orders);
        return (
            <Table>
			<TableHeader>
				<TableRow>
					<TableHead>Id</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Identifier</TableHead>
					<TableHead>Created at</TableHead>
					<TableHead>Updated at</TableHead>
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