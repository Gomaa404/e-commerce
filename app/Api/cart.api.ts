const CART_URL = "https://ecommerce.routemisr.com/api/v1/cart";

const withAuthHeader = (token?: string) => (token ? { token } : undefined);

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
    brand: { name: string };
    ratingsAverage: number;
  };
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
}

export async function getCart(token?: string): Promise<CartData | null> {
  const res = await fetch(CART_URL, {
    headers: withAuthHeader(token),
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to load cart");
  }

  const data = await res.json();
  return data?.data ?? null;
}

export async function addToCart(productId: string, token?: string) {
  const res = await fetch(CART_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withAuthHeader(token),
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to add item to cart");

  const data = await res.json();
  return data;
}

export async function updateCartItemQuantity(
  productId: string,
  count: number,
  token?: string
) {
  const res = await fetch(`${CART_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...withAuthHeader(token),
    },
    body: JSON.stringify({ count }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to update cart item");

  const data = await res.json();
  return data?.data ?? null;
}

export async function removeCartItem(productId: string, token?: string) {
  const res = await fetch(`${CART_URL}/${productId}`, {
    method: "DELETE",
    headers: withAuthHeader(token),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to remove item from cart");

  const data = await res.json();
  return data?.data ?? null;
}

export async function clearCart(token?: string) {
  const res = await fetch(CART_URL, {
    method: "DELETE",
    headers: withAuthHeader(token),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to clear cart");

  const data = await res.json();
  return data;
}
