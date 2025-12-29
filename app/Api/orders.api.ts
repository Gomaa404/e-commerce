const ORDERS_URL = "https://ecommerce.routemisr.com/api/v1/orders";

const withAuthHeader = (token?: string) => (token ? { token } : undefined);

export interface OrderProduct {
    count: number;
    price: number;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        category: { name: string };
        brand: { name: string };
    };
}

export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
}

export interface Order {
    _id: string;
    user: string;
    cartItems: OrderProduct[];
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    shippingAddress: ShippingAddress;
    createdAt: string;
    updatedAt: string;
}

export async function getUserOrders(userId: string, token?: string): Promise<Order[]> {
    const res = await fetch(`${ORDERS_URL}/user/${userId}`, {
        headers: withAuthHeader(token),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load orders");
    }

    const data = await res.json();
    return data ?? [];
}

export async function getSpecificOrder(orderId: string, token?: string): Promise<Order | null> {
    const res = await fetch(`${ORDERS_URL}/${orderId}`, {
        headers: withAuthHeader(token),
        cache: "no-store",
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to load order");
    }

    const data = await res.json();
    return data?.data ?? null;
}

export async function createCashOrder(
    cartId: string,
    shippingAddress: ShippingAddress,
    token?: string
) {
    const res = await fetch(`${ORDERS_URL}/${cartId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...withAuthHeader(token),
        },
        body: JSON.stringify({ shippingAddress }),
        cache: "no-store",
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to create order");
    }

    const data = await res.json();
    return data;
}

export async function createCheckoutSession(
    cartId: string,
    shippingAddress: ShippingAddress,
    token?: string
) {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

    const res = await fetch(
        `${ORDERS_URL}/checkout-session/${cartId}?url=${baseUrl}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...withAuthHeader(token),
            },
            body: JSON.stringify({ shippingAddress }),
            cache: "no-store",
        }
    );

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to create checkout session");
    }

    const data = await res.json();
    return data;
}
