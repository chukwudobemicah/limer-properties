import React from "react";

export default function PropertyDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Skeleton */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-96 md:h-[500px] bg-gray-200" />

              {/* Thumbnails Skeleton */}
              <div className="p-4 flex gap-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-200 rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Property Details Skeleton */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-6" />

              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="w-24">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-5 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            </div>

            {/* Features Skeleton */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="h-5 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-10 bg-gray-200 rounded w-40" />
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-5 bg-gray-200 rounded w-24" />
              </div>

              <div className="space-y-4 mb-6">
                <div className="h-12 bg-gray-200 rounded-lg" />
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="h-5 bg-gray-200 rounded w-24 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
