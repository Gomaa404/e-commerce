export default function ChangePasswordLoading() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    );
}
