"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { toast } from "sonner"

export default function ImpersonatedBy({ session }) {
    const userId = session?.session.impersonatedBy;

    if (!userId) {
        return (
            <Button  variant="outline" size="sm">
                No impersonation
            </Button>
        )
    }

    const router = useRouter();
    
        const handleStopImpersonating = async () => {
            try {
                await authClient.admin.stopImpersonating();
                router.push("/admin");
                toast(
                    "You stopped impersonating"
                );
                router.refresh();
            } catch (error) {
                console.error("Failed to stop impersonating user:", error);
            }
        };

        

    return (
        <Button onClick={handleStopImpersonating} variant="outline" size="sm">
            Stop impersonating
        </Button>
    );
}