import PageHeader from "@/components/common/PageHeader";
import { SectionCards } from "@/components/admin/dashboard-layout/section-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        icon={LayoutDashboard}
        title={"Dashboard"}
        description={"Welcome back! Here's your business overview."}
      />

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
