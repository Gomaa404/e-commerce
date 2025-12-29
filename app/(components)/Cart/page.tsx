"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  CartData,
  CartProduct,
} from "@/app/Api/cart.api";

export default function Cart() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [clearingCart, setClearingCart] = useState(false);

  const getStoredToken = () => {
    if (typeof window === "undefined") return undefined;
    return (
      localStorage.getItem("token") ??
      localStorage.getItem("userToken") ??
      undefined
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      setLoading(true);
      setError(null);

      if (status === "loading") return;

      if (status === "unauthenticated") {
        if (isMounted) {
          setToken(undefined);
          setCart(null);
          setError("Please log in to view your cart.");
          setLoading(false);
        }
        return;
      }

      try {
        const storedToken =
          session?.user?.token ?? getStoredToken() ?? undefined;

        if (!storedToken) {
          if (isMounted) {
            setToken(undefined);
            setCart(null);
            setError("Please log in to view your cart.");
            setLoading(false);
          }
          return;
        }

        const data = await getCart(storedToken);
        if (isMounted) {
          setToken(storedToken);
          setCart(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load cart"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.token, status]);

  const handleUpdateQuantity = async (productId: string, newCount: number) => {
    if (!token || newCount < 1) return;

    setUpdatingId(productId);

    try {
      const updatedCart = await updateCartItemQuantity(productId, newCount, token);
      setCart(updatedCart);
      toast.success("Cart updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update cart"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!token) return;

    setUpdatingId(productId);

    try {
      const updatedCart = await removeCartItem(productId, token);
      setCart(updatedCart);
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to remove item"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleClearCart = async () => {
    if (!token) return;

    setClearingCart(true);

    try {
      await clearCart(token);
      setCart(null);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to clear cart"
      );
    } finally {
      setClearingCart(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 animate-pulse"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
              <i className="fa-solid fa-circle-exclamation text-red-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">Your Cart</h1>
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

  if (!cart || cart.products.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <i className="fa-solid fa-cart-shopping text-2xl text-gray-400" />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse our products and add items to your cart.
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <div className="flex gap-3">
          <button
            onClick={handleClearCart}
            disabled={clearingCart}
            className="btn btn-sm btn-outline rounded-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            {clearingCart ? "Clearing..." : "Clear Cart"}
          </button>
          <Link
            href="/Products"
            className="btn btn-sm btn-outline rounded-full"
          >
            Continue shopping
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {cart.products.map((item: CartProduct) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row gap-4 transition-all duration-300 hover:shadow-md"
          >
            <Link href={`/Products/${item.product._id}`}>
              <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </Link>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link href={`/Products/${item.product._id}`}>
                  <h2 className="text-base font-semibold text-gray-900 line-clamp-1 hover:underline">
                    {item.product.title}
                  </h2>
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {item.product.brand?.name} • {item.product.category?.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star text-xs ${i < Math.round(item.product.ratingsAverage)
                          ? "text-[#FFD43B]"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.count - 1)
                    }
                    disabled={updatingId === item.product._id || item.count <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    <i className="fa-solid fa-minus text-xs" />
                  </button>
                  <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                    {item.count}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.count + 1)
                    }
                    disabled={updatingId === item.product._id}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    <i className="fa-solid fa-plus text-xs" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">
                    EGP {item.price * item.count}.00
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    disabled={updatingId === item.product._id}
                    className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                    title="Remove item"
                  >
                    <i className="fa-solid fa-trash text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            EGP {cart.totalCartPrice}.00
          </span>
        </div>
        <Link
          href="/checkout"
          className="w-full mt-4 btn bg-black text-white rounded-full hover:bg-gray-900 transition flex items-center justify-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
