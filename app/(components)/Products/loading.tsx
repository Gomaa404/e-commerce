export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] bg-white">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-gray-100" />
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-black animate-spin" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
      </div>
      <p className="mt-4 text-sm text-gray-500 font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}
