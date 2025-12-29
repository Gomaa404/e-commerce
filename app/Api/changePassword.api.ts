const AUTH_URL = "https://ecommerce.routemisr.com/api/v1/users";

export interface ChangePasswordData {
    currentPassword: string;
    password: string;
    rePassword: string;
}

export async function changeMyPassword(
    data: ChangePasswordData,
    token: string
): Promise<{ message: string; token: string }> {
    const res = await fetch(`${AUTH_URL}/changeMyPassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
        throw new Error(responseData?.message || "Failed to change password");
    }

    return responseData;
}
