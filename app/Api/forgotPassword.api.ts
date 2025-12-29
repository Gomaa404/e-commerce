const AUTH_URL = "https://ecommerce.routemisr.com/api/v1/auth";

export async function forgotPassword(email: string) {
    const res = await fetch(`${AUTH_URL}/forgotPasswords`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        // Include status code in error message for better handling
        const errorMsg = data?.message || "Failed to send reset email";
        throw new Error(`${res.status}:${errorMsg}`);
    }

    return data;
}

export async function verifyResetCode(resetCode: string) {
    const res = await fetch(`${AUTH_URL}/verifyResetCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data?.message || "Invalid reset code";
        throw new Error(`${res.status}:${errorMsg}`);
    }

    return data;
}

export async function resetPassword(email: string, newPassword: string) {
    const res = await fetch(`${AUTH_URL}/resetPassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data?.message || "Failed to reset password";
        throw new Error(`${res.status}:${errorMsg}`);
    }

    return data;
}
