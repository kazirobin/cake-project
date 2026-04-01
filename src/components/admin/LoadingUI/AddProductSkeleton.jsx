import { Skeleton } from "@/components/ui/skeleton";

const AddProductSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12 w-12 rounded-md" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Form Card Skeleton */}
      <div className="bg-card rounded-lg border">
        {/* Card Header */}
        <div className="border-b px-6 py-4">
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="space-y-6 p-6">
          {/* Switch Skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-11 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>

          {/* 3-Column Grid: Title, Category, CakeType */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-36" />
              </div>
            ))}
          </div>

          {/* Description Textarea Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-3 w-52" />
          </div>

          {/* 2-Column Grid: Price, Stock */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </div>

          {/* Image Upload Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-28 w-full rounded-md" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* 2-Column Grid: Flavors, Weight */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-44" />
              </div>
            ))}
          </div>

          {/* Features Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-18" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-48" />
          </div>

          {/* 2-Column Grid: Specification Label/Value */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </div>

          {/* 2-Column Grid: Nutrition Label/Value */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-3 w-44" />
              </div>
            ))}
          </div>

          {/* Submit Button Skeleton */}
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export default AddProductSkeleton;
