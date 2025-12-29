const WISHLIST_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

const withAuthHeader = (token?: string) => (token ? { token } : undefined);

export async function getWishlist(token?: string) {
  const res = await fetch(WISHLIST_URL, {
    headers: withAuthHeader(token),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load favorites");

  const data = await res.json();
  return data?.data ?? [];
}

export async function addWishlistItem(productId: string, token?: string) {
  const res = await fetch(WISHLIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withAuthHeader(token),
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to add favorite item");

  const data = await res.json();
  return data?.data ?? [];
}

export async function deleteWishlistItem(id: string, token?: string) {
  const res = await fetch(`${WISHLIST_URL}/${id}`, {
    method: "DELETE",
    headers: withAuthHeader(token),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to delete favorite item");

  const data = await res.json();
  return data?.data ?? [];
}
