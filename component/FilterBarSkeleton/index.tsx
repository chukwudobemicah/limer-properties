import React from "react";

export default function FilterBarSkeleton() {
  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-white/40 p-6 sm:p-8 animate-pulse">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center bg-gray-100 rounded-full p-1 w-full lg:w-auto">
              <div className="h-9 w-24 bg-gray-200 rounded-full" />
              <div className="h-9 w-24 bg-gray-200 rounded-full ml-2" />
              <div className="h-9 w-28 bg-gray-200 rounded-full ml-2" />
            </div>
            <div className="h-4 w-36 bg-gray-200 rounded-lg self-end lg:self-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))] gap-3">
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>

          <div className="flex justify-end">
            <div className="h-12 w-32 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
