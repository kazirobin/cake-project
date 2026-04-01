import { Skeleton } from "@/components/ui/skeleton";

const AllProductsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Filters Card Skeleton */}
      <div className="bg-card rounded-lg border">
        <div className="px-6 pt-6 pb-4">
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full sm:w-50" />
          </div>
        </div>
      </div>

      {/* Products Table Card Skeleton */}
      <div className="bg-card rounded-lg border">
        <div className="px-6 pt-6">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <div className="px-6 pt-4 pb-6">
          {/* Table Rows */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <Skeleton className="h-9 w-9 rounded" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="ml-auto h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsSkeleton;
