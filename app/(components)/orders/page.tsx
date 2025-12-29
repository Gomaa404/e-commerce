"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getUserOrders, Order } from "@/app/Api/orders.api";
import { jwtDecode } from "jwt-decode";

export default function Orders() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getStoredToken = () => {
        if (typeof window === "undefined") return undefined;
        return (
            localStorage.getItem("token") ??
            localStorage.getItem("userToken") ??
            undefined
        );
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (status === "loading") return;

            const token = session?.user?.token ?? getStoredToken();

            if (!token) {
                setError("Please log in to view your orders.");
                setLoading(false);
                return;
            }

            try {
                // Decode token to get user ID
                const decoded: { id: string } = jwtDecode(token);
                const userId = decoded.id;

                const data = await getUserOrders(userId, token);
                setOrders(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load orders"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [session?.user?.token, status]);

    if (loading || status === "loading") {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="h-8 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border p-6 animate-pulse"
                        >
                            <div className="space-y-3">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-48 bg-gray-200 rounded" />
                                <div className="h-3 w-24 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                            <i className="fa-solid fa-circle-exclamation text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-lg font-semibold text-gray-900">
                                Your Orders
                            </h1>
                            <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {error.toLowerCase().includes("log in") && (
                                    <Link
                                        href="/login"
                                        className="btn btn-sm rounded-full bg-black text-white hover:bg-gray-900"
                                    >
                                        Go to login
                                    </Link>
                                )}
                                <Link
                                    href="/Products"
                                    className="btn btn-sm btn-outline rounded-full"
                                >
                                    Browse products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                        <i className="fa-solid fa-box text-2xl text-gray-400" />
                    </div>
                    <h1 className="mt-4 text-xl font-semibold text-gray-900">
                        No orders yet
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        You haven&apos;t placed any orders yet. Start shopping!
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/Products"
                            className="btn rounded-full bg-black text-white hover:bg-gray-900"
                        >
                            Browse products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Order #{order._id.slice(-8).toUpperCase()}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Placed on {formatDate(order.createdAt)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${order.isPaid
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {order.isPaid ? "Paid" : "Pending Payment"}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${order.isDelivered
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {order.isDelivered ? "Delivered" : "In Progress"}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {order.cartItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100"
                                >
                                    <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="text-sm text-gray-600">
                                <i className="fa-solid fa-location-dot mr-1" />
                                {order.shippingAddress?.city || "Unknown City"}
                            </div>
                            <div className="font-bold">
                                EGP {order.totalOrderPrice}.00
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
