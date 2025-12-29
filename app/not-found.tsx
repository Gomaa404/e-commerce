
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-6 text-center">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full animate-fadeIn">
        <h1 className="text-9xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg shadow  transition"
        >
          Go Back Home
        </Link>
      </div>

    </div>
  );
}