export async function AddProductCart(params: {
  productId: string;
  token: string;
}) {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: params.token,
    },
    body: JSON.stringify({ productId: params.productId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to add product to cart");
  }

  return data;
}