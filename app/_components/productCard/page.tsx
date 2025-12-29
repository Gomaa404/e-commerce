"use client";

import { IProduct } from "@/types/product.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, type MouseEvent } from "react";
import { addWishlistItem } from "@/app/Api/wishlist.api";
import { addToCart } from "@/app/Api/cart.api";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [adding, setAdding] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  const favoritesKey = "favoriteIds";

  const getFavoriteIds = () => {
    if (typeof window === "undefined") return [] as string[];
    try {
      const raw = localStorage.getItem(favoritesKey);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      return Array.isArray(parsed) ? (parsed.filter(Boolean) as string[]) : [];
    } catch {
      return [] as string[];
    }
  };

  const setFavoriteIds = (ids: string[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(favoritesKey, JSON.stringify(Array.from(new Set(ids))));
  };

  const token =
    session?.user?.token ??
    (typeof window !== "undefined"
      ? localStorage.getItem("token") ??
      localStorage.getItem("userToken") ??
      undefined
      : undefined);

  const requireAuthToken = () => {
    if (status !== "authenticated" || !token) {
      router.push("/login");
      return null;
    }
    return token;
  };

  useEffect(() => {
    const ids = getFavoriteIds();
    setIsFavorited(ids.includes(product._id));

    const onStorage = (e: StorageEvent) => {
      if (e.key !== favoritesKey && e.key !== null) return;
      const nextIds = getFavoriteIds();
      setIsFavorited(nextIds.includes(product._id));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [product._id]);

  const handleFavoriteClick = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isFavorited) return;
    setAddError(null);
    const authToken = requireAuthToken();
    if (!authToken) return;

    try {
      setAdding(true);
      await addWishlistItem(product._id, authToken);
      toast.success("Added to favorites");
      setIsFavorited(true);
      const ids = getFavoriteIds();
      setFavoriteIds([...ids, product._id]);
    } catch (err) {
      console.error("Failed to add favorite", err);
      setAddError("Failed to add favorite. Please try again.");
      toast.error("Failed to add favorite. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleAddToCart = async (
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    setAddError(null);
    const authToken = requireAuthToken();
    if (!authToken) return;

    try {
      setAddingToCart(true);
      await addToCart(product._id, authToken);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Failed to add to cart", err);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/Products/${product._id}`}>
        <div className="relative w-full aspect-5/6 overflow-hidden bg-gray-100">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand.name}
          </p>
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {product.title}
          </h2>
          <p className="text-xs text-gray-400 line-clamp-1">
            {product.category.name}
          </p>
          <div className="flex items-center gap-2">
            <ul className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-star text-[#FFD43B] text-xs"></i>
                  </li>
                ))}
            </ul>
            <span className="text-xs text-gray-500">
              ({product.ratingsQuantity})
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          EGP {product.price}.00
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-outline btn-sm rounded-full w-8 h-8 flex items-center justify-center p-0"
            aria-label="Add to cart"
            disabled={addingToCart}
          >
            {addingToCart ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <i className="fa-solid fa-cart-shopping text-sm"></i>
            )}
          </button>

          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`btn btn-outline btn-sm rounded-full w-8 h-8 flex items-center justify-center p-0 ${isFavorited ? "opacity-50 cursor-not-allowed" : ""
              }`}
            aria-label="Favorites"
            disabled={adding || isFavorited}
          >
            {adding ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <i
                className={`text-sm ${isFavorited ? "fa-solid fa-heart text-red-600" : "fa-regular fa-heart"
                  }`}
              ></i>
            )}
          </button>
        </div>
        {addError && (
          <div className="pt-2 text-xs text-red-600">{addError}</div>
        )}
      </div>
    </div>
  );
}
