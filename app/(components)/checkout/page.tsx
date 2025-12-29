"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCart, CartData } from "@/app/Api/cart.api";
import { createCashOrder, createCheckoutSession } from "@/app/Api/orders.api";

const checkoutSchema = z.object({
    details: z.string().min(10, "Please provide a detailed address"),
    city: z.string().min(2, "City is required"),
    phone: z.string().min(10, "Please provide a valid phone number"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [cart, setCart] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

    const getStoredToken = () => {
        if (typeof window === "undefined") return undefined;
        return (
            localStorage.getItem("token") ??
            localStorage.getItem("userToken") ??
            undefined
        );
    };

    const token = session?.user?.token ?? getStoredToken();

    const form = useForm<CheckoutFormData>({
        defaultValues: {
            details: "",
            city: "",
            phone: "",
        },
        resolver: zodResolver(checkoutSchema),
    });

    useEffect(() => {
        const fetchCart = async () => {
            if (status === "loading") return;

            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const data = await getCart(token);
                if (!data || data.products.length === 0) {
                    router.push("/Cart");
                    return;
                }
                setCart(data);
            } catch {
                router.push("/Cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [token, status, router]);

    const handleSubmit = async (values: CheckoutFormData) => {
        if (!cart || !token) return;

        setSubmitting(true);

        try {
            if (paymentMethod === "cash") {
                await createCashOrder(cart._id, values, token);
                toast.success("Order placed successfully!");
                router.push("/orders");
            } else {
                const result = await createCheckoutSession(cart._id, values, token);
                if (result?.session?.url) {
                    window.location.href = result.session.url;
                } else {
                    throw new Error("Failed to create checkout session");
                }
            }
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Failed to place order"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 w-48 bg-gray-200 rounded" />
                    <div className="bg-white rounded-2xl border p-6 space-y-4">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-12 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-12 w-full bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (!cart) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10 text-center">
                <p>Your cart is empty.</p>
                <Link href="/Products" className="btn mt-4 bg-black text-white rounded-full">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address Details</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Street, building, apartment..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Cairo, Alexandria..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="01xxxxxxxxx"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Payment Method */}
                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold mb-3">Payment Method</h3>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("cash")}
                                            className={`flex-1 p-4 rounded-xl border-2 transition ${paymentMethod === "cash"
                                                    ? "border-black bg-gray-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <i className="fa-solid fa-money-bill-wave text-xl mb-2" />
                                            <p className="font-medium">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500">
                                                Pay when you receive
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("online")}
                                            className={`flex-1 p-4 rounded-xl border-2 transition ${paymentMethod === "online"
                                                    ? "border-black bg-gray-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <i className="fa-solid fa-credit-card text-xl mb-2" />
                                            <p className="font-medium">Online Payment</p>
                                            <p className="text-xs text-gray-500">Visa, Mastercard</p>
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full mt-6"
                                >
                                    {submitting ? (
                                        <span className="loading loading-spinner loading-sm" />
                                    ) : paymentMethod === "cash" ? (
                                        "Place Order"
                                    ) : (
                                        "Proceed to Payment"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit sticky top-24">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.products.map((item) => (
                            <div key={item._id} className="flex gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium line-clamp-1">
                                        {item.product.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.count} × EGP {item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-4 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span>EGP {cart.totalCartPrice}.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total</span>
                            <span>EGP {cart.totalCartPrice}.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
