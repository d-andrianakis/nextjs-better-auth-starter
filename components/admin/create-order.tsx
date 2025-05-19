import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CreateOrder() {
  return (
    <Button asChild>
      <Link href="/orders">Create Order</Link>
    </Button>
  )
}
