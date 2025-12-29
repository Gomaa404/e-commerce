"use client";
import { useState } from "react";
import Link from "next/link";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber && email) {
      setStatus("Processing"); 
    } else {
      setStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">
            S
          </span>
          <span className="text-2xl font-semibold">Track Your Order</span>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Enter your order information below to track your order status.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-1">
              Order Number
            </label>
            <input
              type="text"
              placeholder="Enter your order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Track Order
          </button>
        </form>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Order Status</h2>
          {status ? (
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Your order is currently: <strong>{status}</strong>.
            </p>
          ) : (
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Enter your order number and email above to track your order
              status.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Need Help?</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            If you&apos;re having trouble tracking your order, please contact our
            customer service team:{" "}
            <Link
              href="/Customer/Contact"
              className="text-black font-semibold hover:underline"
            >
              Contact Support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
