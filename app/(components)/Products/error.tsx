"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full  rounded-2xl  p-8 text-center">
        <div className="text-7xl font-bold text-gray-900 mb-4">
          Oops!
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
