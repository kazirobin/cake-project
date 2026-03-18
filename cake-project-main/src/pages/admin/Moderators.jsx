import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Trash2, Shield, ShieldUser } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const Moderators = () => {
  const [searchValue, setSearchValue] = useState("");

  // Placeholder data - replace with actual API call
  const moderators = [];
  const isLoading = false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          icon={ShieldUser}
          title={"Moderators"}
          description={"Manage admin team members and their permissions"}
        />
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Moderator
        </Button>
      </div>

      {/* Search Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search moderators..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Moderators List Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Moderators</CardTitle>
          <CardDescription>
            {moderators.length > 0
              ? `Managing ${moderators.length} moderators`
              : "No moderators yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : moderators.length === 0 ? (
            <div className="py-12 text-center">
              <Shield className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
              <p className="text-muted-foreground mb-4">No moderators yet</p>
              <Button>Add Your First Moderator</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Moderators will be rendered here */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Moderators;
