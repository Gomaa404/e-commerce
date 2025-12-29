const ADDRESSES_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

const withAuthHeader = (token?: string) => (token ? { token } : undefined);

export interface Address {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export async function getAddresses(token?: string): Promise<Address[]> {
    const res = await fetch(ADDRESSES_URL, {
        headers: withAuthHeader(token),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load addresses");
    }

    const data = await res.json();
    return data?.data ?? [];
}

export async function addAddress(
    address: Omit<Address, "_id">,
    token?: string
): Promise<Address[]> {
    const res = await fetch(ADDRESSES_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...withAuthHeader(token),
        },
        body: JSON.stringify(address),
        cache: "no-store",
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to add address");
    }

    const data = await res.json();
    return data?.data ?? [];
}

export async function removeAddress(
    addressId: string,
    token?: string
): Promise<Address[]> {
    const res = await fetch(`${ADDRESSES_URL}/${addressId}`, {
        method: "DELETE",
        headers: withAuthHeader(token),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to remove address");
    }

    const data = await res.json();
    return data?.data ?? [];
}

export async function getSpecificAddress(
    addressId: string,
    token?: string
): Promise<Address | null> {
    const res = await fetch(`${ADDRESSES_URL}/${addressId}`, {
        headers: withAuthHeader(token),
        cache: "no-store",
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to load address");
    }

    const data = await res.json();
    return data?.data ?? null;
}
