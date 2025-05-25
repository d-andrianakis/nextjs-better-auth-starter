"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useCallback, useState } from "react";
import RemoveOrderButton from "./removeOrder";

import Link from "next/link";

export default function OrdersTableClient({ orders: initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);

  const reloadOrders = useCallback(async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }, []);

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
          <TableHead>Edit</TableHead>
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
              <Button variant="outline" asChild>
                <Link href={`/orders/edit/${order.id}`}>Edit Order</Link>
              </Button>
            </TableCell>
            <TableCell>
              <RemoveOrderButton orderId={order.id} onRemoved={reloadOrders} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
