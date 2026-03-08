import { SectionCards } from "@/components/section-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Key Metrics</h2>
        <SectionCards />
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">No recent orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Your best-selling cakes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No sales data available
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
