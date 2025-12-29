"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeMyPassword } from "@/app/Api/changePassword.api";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(6, "Password must be at least 6 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        rePassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords don't match",
        path: ["rePassword"],
    });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<ChangePasswordFormData>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        resolver: zodResolver(changePasswordSchema),
    });

    // Redirect if not logged in (client-side only)
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const handleChangePassword = async (values: ChangePasswordFormData) => {
        if (!session?.user?.token) {
            toast.error("You must be logged in to change your password");
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const result = await changeMyPassword(values, session.user.token);
            toast.success("Password changed successfully! Please login again.");

            // Sign out and redirect to login
            setTimeout(async () => {
                await signOut({ redirect: false });
                router.push("/login");
            }, 1500);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to change password";

            if (errorMessage.includes("incorrect") || errorMessage.includes("wrong")) {
                toast.error("Current password is incorrect. Please try again.");
            } else if (errorMessage.includes("same")) {
                toast.error("New password must be different from current password.");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking authentication
    if (status === "loading") {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">S</span>
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-black">
                    Change Password
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Update your account password
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleChangePassword)}
                        className="flex flex-col gap-4"
                    >
                        {/* Current Password */}
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <div className="relative">
                                            <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="Enter current password"
                                                className="pl-10 pr-10"
                                                {...field}
                                            />
                                            <span
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                                            >
                                                <i
                                                    className={`fa-regular ${showCurrentPassword ? "fa-eye" : "fa-eye-slash"
                                                        }`}
                                                />
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <div className="relative">
                                            <i className="fa-solid fa-key absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                className="pl-10 pr-10"
                                                {...field}
                                            />
                                            <span
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                                            >
                                                <i
                                                    className={`fa-regular ${showNewPassword ? "fa-eye" : "fa-eye-slash"
                                                        }`}
                                                />
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm New Password */}
                        <FormField
                            control={form.control}
                            name="rePassword"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <div className="relative">
                                            <i className="fa-solid fa-shield-halved absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                className="pl-10 pr-10"
                                                {...field}
                                            />
                                            <span
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                                            >
                                                <i
                                                    className={`fa-regular ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                                                        }`}
                                                />
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 text-base font-semibold rounded-xl bg-black hover:bg-gray-900 transition-all duration-200 mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Updating...
                                </span>
                            ) : (
                                "Update Password"
                            )}
                        </Button>

                        {/* Cancel Button */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="w-full h-12 text-base font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200"
                        >
                            Cancel
                        </Button>
                    </form>
                </Form>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex items-start gap-3">
                        <i className="fa-solid fa-circle-info text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">Security Tip</p>
                            <p className="text-blue-700">
                                After changing your password, you'll be logged out and need to sign in again with your new password.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
