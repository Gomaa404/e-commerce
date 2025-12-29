"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import GetProductDetails from "@/app/Api/productDetails.api";
import { addWishlistItem } from "@/app/Api/wishlist.api";
import { addToCart } from "@/app/Api/cart.api";
import { IProduct } from "@/types/product.interface";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { status, data: session } = useSession();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const id = params?.id as string;

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
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await GetProductDetails(id);
        setProduct(data);
        // Check if product is in favorites
        const ids = getFavoriteIds();
        setIsFavorited(ids.includes(data._id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleFavoriteClick = async () => {
    if (isFavorited || !product) return;
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
      toast.error("Failed to add favorite. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const authToken = requireAuthToken();
    if (!authToken) return;

    try {
      setAddingToCart(true);
      await addToCart(product._id, authToken);
      toast.success("Added to cart");
      router.push("/Cart");
    } catch (err) {
      console.error("Failed to add to cart", err);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse w-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-4/5 bg-gray-200" />
            <div className="p-6 space-y-4">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-40 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-200 rounded" />
              <div className="h-10 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <i className="fa-solid fa-circle-exclamation text-2xl text-red-600" />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <button
            onClick={() => router.push("/Products")}
            className="mt-6 btn rounded-full bg-black text-white hover:bg-gray-900"
          >
            Browse products
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.imageCover, ...(product.images || [])];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white border border-black rounded-2xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-4/5 overflow-hidden bg-gray-100">
              <img
                src={allImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
              />
            </div>
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${selectedImage === idx
                        ? "border-black"
                        : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-black">
                {product.brand?.name}
              </p>

              <h1 className="text-xl font-semibold text-black leading-snug">
                {product.title}
              </h1>

              <p className="text-xs text-black/70">{product.category?.name}</p>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-lg fa-star text-xs ${i < Math.round(product.ratingsAverage)
                            ? "text-[#FFD43B]"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                </div>
                <span className="text-xs text-black/70">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>

              <p className="text-sm text-black/80 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-black/60">
                <span>
                  <i className="fa-solid fa-box mr-1" />
                  {product.quantity} in stock
                </span>
                <span>•</span>
                <span>
                  <i className="fa-solid fa-fire mr-1" />
                  {product.sold} sold
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-black">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-black">
                  EGP {product.price}.00
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 px-5 py-3 text-sm bg-black text-white rounded-full hover:bg-gray-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {addingToCart ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleFavoriteClick}
                  disabled={adding || isFavorited}
                  className={`w-12 h-12 border border-black rounded-full flex items-center justify-center transition ${isFavorited
                      ? "bg-red-50 border-red-500"
                      : "hover:bg-black hover:text-white"
                    }`}
                  title={isFavorited ? "Added to favorites" : "Add to favorites"}
                >
                  {adding ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <i
                      className={`fa-${isFavorited ? "solid" : "regular"} fa-heart text-lg ${isFavorited ? "text-red-600" : ""
                        }`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
