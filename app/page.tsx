"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [localUserName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    try {
      const user = JSON.parse(userData);
      return user?.name || user?.userName || user?.username || null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const displayName = session?.user?.name || localUserName;

  return (
    <div className="relative bg-white h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        {displayName && (
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-4 text-gray-700">
            Hi <span className="text-black">{displayName}</span>
          </h2>
        )}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent pb-2">
          {displayName ? `Welcome back to ShopMart` : `Welcome to ShopMart`}
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg mb-10">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/Products">
            <button className="px-7 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-white hover:text-black hover:outline-1 transition">
              Shop Now
            </button>
          </Link>
          <Link href="/Categories">
            <button className="px-7 py-3 rounded-full border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition">
              Browse Categories
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
