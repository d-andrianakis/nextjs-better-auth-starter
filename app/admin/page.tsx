import UsersTable from "@/components/admin/users-table";
// import OrdersTable from "@/components/admin/orders-table";
import OrdersTablesServer from "@/components/admin/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateOrder } from "@/components/admin/create-order";

export default async function AdminDashboard() {

	return (
		<main className="flex flex-col">
			<div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
				<div className="flex flex-col gap-2 mb-8">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					<p className="text-muted-foreground">
						Manage users and view system statistics
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Users</CardTitle>
					</CardHeader>
					<CardContent>
						<UsersTable />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Orders</CardTitle>
						<CreateOrder />
					</CardHeader>
					<CardContent>
						<OrdersTablesServer />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}