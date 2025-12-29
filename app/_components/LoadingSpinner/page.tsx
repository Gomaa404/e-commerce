"use client";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    text?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    size = "lg",
    text,
    fullScreen = true,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
    };

    const containerClass = fullScreen
        ? "flex flex-col justify-center items-center h-[calc(100vh-64px)] bg-white"
        : "flex flex-col justify-center items-center py-20";

    return (
        <div className={containerClass}>
            <div className="relative">
                <div
                    className={`${sizeClasses[size]} rounded-full border-4 border-gray-100`}
                />
                <div
                    className={`absolute top-0 left-0 ${sizeClasses[size]} rounded-full border-4 border-transparent border-t-black animate-spin`}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
            </div>
            {text && (
                <p className="mt-4 text-sm text-gray-500 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
            <div className="aspect-5/6 bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="flex gap-1">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-gray-200 rounded" />
                        ))}
                </div>
            </div>
            <div className="px-4 pb-4 flex items-center justify-between">
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden border bg-white animate-pulse">
            <div className="h-52 md:h-72 lg:h-96 bg-gray-200" />
        </div>
    );
}

export function CartItemSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 animate-pulse">
            <div className="w-28 h-28 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-3">
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        <div className="w-6 h-8 bg-gray-200 rounded" />
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    </div>
                    <div className="h-5 w-24 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}

export function AuthFormSkeleton() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-6" />
                <div className="space-y-4">
                    <div className="h-10 w-full bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded mt-6" />
                <div className="h-4 w-40 bg-gray-200 rounded mx-auto mt-5" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="h-12 w-48 bg-gray-200 rounded mx-auto mb-10 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <CategoryCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export function CartPageSkeleton() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="flex items-center justify-between">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <CartItemSkeleton key={i} />
                ))}
            </div>
            <div className="bg-white rounded-2xl border p-6 animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                    <div className="h-7 w-28 bg-gray-200 rounded" />
                </div>
                <div className="h-12 w-full bg-gray-200 rounded-full mt-4" />
            </div>
        </div>
    );
}
