"use client";

import { removeOrder } from "./removeOrderAction";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function RemoveOrderButton({ orderId, onRemoved }: { orderId: string, onRemoved?: () => void }) {
  const [isPending, startTransition] = useTransition();

  // const handleRemoveOrder = () => {
  //   startTransition(async () => {
  //     const result = await removeOrder(orderId);
  //     if (result.success && onRemoved) {
  //       onRemoved();
  //     }
  //   });
  // };

  // return (
  //   <button onClick={handleRemoveOrder} disabled={isPending}>
  //     {isPending ? "Removing..." : "Remove Order"}
  //   </button>
  // );

  const handleRemove = async () => {
    startTransition(async () => {
      const result = await removeOrder(orderId);
      if (result.success && onRemoved) {
        onRemoved();
      }
    });

    if (onRemoved) onRemoved();
  };

  return (
    <Button variant="destructive" onClick={handleRemove}>
      Remove
    </Button>
  );
}