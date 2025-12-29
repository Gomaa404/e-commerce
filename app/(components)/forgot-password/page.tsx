"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    forgotPassword,
    verifyResetCode,
    resetPassword,
} from "@/app/Api/forgotPassword.api";

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

const codeSchema = z.object({
    resetCode: z.string().min(4, "Reset code must be at least 4 characters"),
});

const passwordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type Step = "email" | "code" | "password" | "success";

export default function ForgotPassword() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("email");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailForm = useForm({
        defaultValues: { email: "" },
        resolver: zodResolver(emailSchema),
    });

    const codeForm = useForm({
        defaultValues: { resetCode: "" },
        resolver: zodResolver(codeSchema),
    });

    const passwordForm = useForm({
        defaultValues: { newPassword: "", confirmPassword: "" },
        resolver: zodResolver(passwordSchema),
    });

    const handleSendEmail = async (values: { email: string }) => {
        setLoading(true);
        try {
            await forgotPassword(values.email);
            setEmail(values.email);
            toast.success("Reset code sent to your email");
            setStep("code");
        } catch (err) {
            console.error("Forgot password error:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to send reset email";

            // Check for status codes in error message (format: "statusCode:message")
            if (errorMessage.includes("500:") || errorMessage.includes("500") || errorMessage.includes("Internal Server Error")) {
                toast.error("Email not found. Please check your email or create an account first.");
            } else if (errorMessage.includes("404:") || errorMessage.includes("404") || errorMessage.includes("not found")) {
                toast.error("This email is not registered. Please sign up first.");
            } else if (errorMessage.includes("There was an error sending the email")) {
                toast.error("Email not found. Please check your email or create an account first.");
            } else {
                // Show the actual error message for any other errors
                const cleanMessage = errorMessage.includes(":")
                    ? errorMessage.split(":").slice(1).join(":").trim()
                    : errorMessage;
                toast.error(cleanMessage || "Failed to send reset email. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (values: { resetCode: string }) => {
        setLoading(true);
        try {
            await verifyResetCode(values.resetCode);
            toast.success("Code verified successfully");
            setStep("password");
        } catch (err) {
            console.error("Verify code error:", err);
            const errorMessage = err instanceof Error ? err.message : "Invalid reset code";

            // Clean status code from message
            const cleanMessage = errorMessage.includes(":")
                ? errorMessage.split(":").slice(1).join(":").trim()
                : errorMessage;

            if (cleanMessage.includes("expired")) {
                toast.error("Reset code has expired. Please request a new one.");
            } else if (cleanMessage.includes("invalid") || cleanMessage.includes("incorrect")) {
                toast.error("Invalid code. Please check and try again.");
            } else {
                toast.error(cleanMessage || "Invalid reset code. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            await forgotPassword(email);
            toast.success("New reset code sent to your email");
        } catch (err) {
            console.error("Resend code error:", err);
            toast.error("Failed to resend code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (values: {
        newPassword: string;
        confirmPassword: string;
    }) => {
        setLoading(true);
        try {
            await resetPassword(email, values.newPassword);
            toast.success("Password reset successfully");
            setStep("success");
        } catch (err) {
            console.error("Reset password error:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to reset password";

            // Clean status code from message
            const cleanMessage = errorMessage.includes(":")
                ? errorMessage.split(":").slice(1).join(":").trim()
                : errorMessage;

            toast.error(cleanMessage || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-6">
            {["email", "code", "password"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step === s || (step === "success" && i === 2)
                            ? "bg-black text-white scale-110"
                            : ["email", "code", "password"].indexOf(step) > i ||
                                step === "success"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}
                    >
                        {["email", "code", "password"].indexOf(step) > i ||
                            step === "success" ? (
                            <i className="fa-solid fa-check text-sm" />
                        ) : (
                            i + 1
                        )}
                    </div>
                    {i < 2 && (
                        <div
                            className={`w-8 h-1 rounded ${["email", "code", "password"].indexOf(step) > i ||
                                step === "success"
                                ? "bg-green-500"
                                : "bg-gray-100"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">S</span>
                    </div>
                </div>

                {step !== "success" && renderStepIndicator()}

                {step === "email" && (
                    <>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-black">
                            Forgot Password?
                        </h2>
                        <p className="text-center text-gray-500 mb-6">
                            Enter your email and we'll send you a reset code
                        </p>

                        <Form {...emailForm}>
                            <form
                                onSubmit={emailForm.handleSubmit(handleSendEmail)}
                                className="flex flex-col gap-4"
                            >
                                <FormField
                                    control={emailForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <i className="fa-regular fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        type="email"
                                                        placeholder="Email address"
                                                        className="pl-10"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 text-base font-semibold rounded-xl bg-black hover:bg-gray-900 transition-all duration-200"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Reset Code"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </>
                )}

                {step === "code" && (
                    <>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-black">
                            Verify Code
                        </h2>
                        <p className="text-center text-gray-500 mb-6">
                            Enter the code we sent to <strong className="text-black">{email}</strong>
                        </p>

                        <Form {...codeForm}>
                            <form
                                onSubmit={codeForm.handleSubmit(handleVerifyCode)}
                                className="flex flex-col gap-4"
                            >
                                <FormField
                                    control={codeForm.control}
                                    name="resetCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <i className="fa-solid fa-key absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        placeholder="Enter reset code"
                                                        className="pl-10 text-center tracking-widest font-mono"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 text-base font-semibold rounded-xl bg-black hover:bg-gray-900 transition-all duration-200"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Verifying...
                                        </span>
                                    ) : (
                                        "Verify Code"
                                    )}
                                </Button>
                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep("email")}
                                        className="text-sm text-gray-500 hover:text-black transition flex items-center gap-1"
                                    >
                                        <i className="fa-solid fa-arrow-left text-xs" />
                                        Back to email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendCode}
                                        disabled={loading}
                                        className="text-sm text-black hover:text-gray-700 transition font-semibold flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-rotate-right text-xs" />
                                        Resend code
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </>
                )}

                {step === "password" && (
                    <>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-black">
                            New Password
                        </h2>
                        <p className="text-center text-gray-500 mb-6">
                            Create a strong password for your account
                        </p>

                        <Form {...passwordForm}>
                            <form
                                onSubmit={passwordForm.handleSubmit(handleResetPassword)}
                                className="flex flex-col gap-4"
                            >
                                <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="New Password"
                                                        className="pl-10 pr-10"
                                                        {...field}
                                                    />
                                                    <span
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
                                                    >
                                                        <i
                                                            className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"
                                                                }`}
                                                        />
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm Password"
                                                        className="pl-10 pr-10"
                                                        {...field}
                                                    />
                                                    <span
                                                        onClick={() =>
                                                            setShowConfirmPassword(!showConfirmPassword)
                                                        }
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
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 text-base font-semibold rounded-xl bg-black hover:bg-gray-900 transition-all duration-200"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Resetting...
                                        </span>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </>
                )}

                {step === "success" && (
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                            <i className="fa-solid fa-check text-3xl text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-black">
                            Password Reset!
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Your password has been reset successfully. You can now sign in
                            with your new password.
                        </p>
                        <Button
                            onClick={() => router.push("/login")}
                            className="w-full h-12 text-base font-semibold rounded-xl bg-black hover:bg-gray-900 transition-all duration-200"
                        >
                            Sign In
                        </Button>
                    </div>
                )}

                {step !== "success" && (
                    <>
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        <p className="text-center text-gray-600">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="text-black font-semibold hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
