"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { toast } from "sonner"
interface DeleteUserProps {
	userId: string;
}

export default function deleterUser({ userId }: DeleteUserProps) {
	const router = useRouter();

    const handleDeleteUser = async () => {
        try {
            await authClient.admin.removeUser({
                userId: userId,
            });
            router.push("/admin");
            toast(
                "User deleted successfully"
            );
            router.refresh();
        }
        catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

	return (
		<Button onClick={handleDeleteUser} variant="outline" size="sm">
			Delete
		</Button>
	);
}