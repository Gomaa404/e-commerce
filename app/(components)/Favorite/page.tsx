"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getWishlist, deleteWishlistItem } from "@/app/Api/wishlist.api";
import { addToCart } from "@/app/Api/cart.api";

type WishItem = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  brand?: { name: string };
  category?: { name: string };
  ratingsAverage?: number;
  ratingsQuantity?: number;
};

export default function Favorite() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const getStoredToken = () => {
    if (typeof window === "undefined") return undefined;
    return (
      localStorage.getItem("token") ??
      localStorage.getItem("userToken") ??
      undefined
    );
  };

  const favoritesKey = "favoriteIds";

  const setFavoriteIds = (ids: string[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(favoritesKey, JSON.stringify(Array.from(new Set(ids))));
  };

  useEffect(() => {
    let isMounted = true;

    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);

      if (status === "loading") return;

      if (status === "unauthenticated") {
        if (isMounted) {
          setToken(undefined);
          setItems([]);
          setError("Please log in to view favorites.");
          setLoading(false);
          setInitialized(true);
        }
        return;
      }

      try {
        const storedToken =
          session?.user?.token ?? getStoredToken() ?? undefined;

        if (!storedToken) {
          if (isMounted) {
            setToken(undefined);
            setItems([]);
            setError("Please log in to view favorites.");
            setLoading(false);
            setInitialized(true);
          }
          return;
        }

        const data = await getWishlist(storedToken);
        if (isMounted) {
          setToken(storedToken);
          setItems(data);
          setFavoriteIds(data.map((x: WishItem) => x._id));
          setInitialized(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load favorites"
          );
          setInitialized(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWishlist();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.token, status]);

  const handleRemove = async (id: string) => {
    if (!token) {
      setError("Please log in to manage favorites.");
      return;
    }

    setRemovingId(id);

    try {
      await deleteWishlistItem(id, token);
      setItems((prev) => {
        const next = prev.filter((item) => item._id !== id);
        setFavoriteIds(next.map((x) => x._id));
        return next;
      });
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to remove favorite"
      );
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (id: string) => {
    if (!token) {
      toast.error("Please log in to add to cart");
      return;
    }

    setAddingToCartId(id);

    try {
      await addToCart(id, token);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to add to cart"
      );
    } finally {
      setAddingToCartId(null);
    }
  };

  // Loading state with spinner
  if (loading || status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] bg-white">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100" />
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-black animate-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium animate-pulse">
          Loading favorites...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
            <i className="fa-solid fa-heart-crack text-2xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-black">
            {error.includes("log in") ? "Sign In Required" : "Oops!"}
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            {error.toLowerCase().includes("log in") && (
              <Link
                href="/login"
                className="w-full h-12 bg-black text-white rounded-xl font-semibold flex items-center justify-center hover:bg-gray-900 transition"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/Products"
              className="w-full h-12 border border-gray-300 text-black rounded-xl font-semibold flex items-center justify-center hover:bg-gray-50 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!items.length && initialized) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <i className="fa-regular fa-heart text-3xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-black">
            No Favorites Yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start exploring products and save your favorites here for quick
            access later.
          </p>
          <Link
            href="/Products"
            className="w-full h-12 bg-black text-white rounded-xl font-semibold flex items-center justify-center hover:bg-gray-900 transition"
          >
            <i className="fa-solid fa-shopping-bag mr-2" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Favorites list
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Your Favorites</h1>
          <p className="text-gray-500 mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <Link
          href="/Products"
          className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition"
        >
          <i className="fa-solid fa-plus text-sm" />
          Add More
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            {/* Image */}
            <Link href={`/Products/${item._id}`}>
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(item._id);
                  }}
                  disabled={removingId === item._id}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  {removingId === item._id ? (
                    <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <i className="fa-solid fa-xmark" />
                  )}
                </button>
              </div>
            </Link>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {item.brand?.name || "Brand"}
              </p>
              <Link href={`/Products/${item._id}`}>
                <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-gray-600 transition">
                  {item.title}
                </h3>
              </Link>
              <p className="text-xs text-gray-400 mt-1">
                {item.category?.name || "Category"}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star text-xs ${i < Math.round(item.ratingsAverage || 4)
                            ? "text-amber-400"
                            : "text-gray-200"
                          }`}
                      />
                    ))}
                </div>
                <span className="text-xs text-gray-400">
                  ({item.ratingsQuantity || 0})
                </span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-black">
                  EGP {item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  disabled={addingToCartId === item._id}
                  className="h-10 px-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {addingToCartId === item._id ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-plus text-xs" />
                      Add
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
