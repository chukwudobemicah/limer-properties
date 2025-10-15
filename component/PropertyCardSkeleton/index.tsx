import React from "react";

export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />

        {/* Location Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Property Details Skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-12 bg-gray-200 rounded" />
          <div className="h-10 w-12 bg-gray-200 rounded" />
          <div className="h-10 w-16 bg-gray-200 rounded" />
        </div>

        {/* Price Skeleton */}
        <div className="pt-4 border-t border-gray-200 mb-4">
          <div className="h-8 bg-gray-200 rounded w-32" />
        </div>

        {/* Buttons Skeleton */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 bg-gray-200 rounded-full" />
          <div className="h-10 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
