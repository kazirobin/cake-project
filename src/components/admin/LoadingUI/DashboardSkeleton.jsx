import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12 w-12 rounded-md" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Key Metrics Skeleton */}
      <div>
        <Skeleton className="mb-4 h-6 w-28" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="from-primary/5 to-card rounded-lg border bg-linear-to-t p-6 shadow-xs"
            >
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="mt-4 space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Sections Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg border">
            <div className="px-6 pt-6">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="mt-2 h-4 w-36" />
            </div>
            <div className="px-6 pt-4 pb-6">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
