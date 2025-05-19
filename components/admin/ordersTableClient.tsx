"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import RemoveOrderButton from "./removeOrderAction";

export default function OrdersTableClient({ orders }) {
  // You can use useState, useEffect, etc. here
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
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.value}</TableCell>
            <TableCell>{order.identifier}</TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(order.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <RemoveOrderButton orderId={order.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}