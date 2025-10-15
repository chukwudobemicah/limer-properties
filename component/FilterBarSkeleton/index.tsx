import React from "react";

export default function FilterBarSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-10 relative z-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filter 1 Skeleton */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>

        {/* Filter 2 Skeleton */}
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>

        {/* Search Button Skeleton */}
        <div className="flex items-end">
          <div className="w-full h-12 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
