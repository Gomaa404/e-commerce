import Link from "next/link";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
          Returns & Exchanges
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Return Policy
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We want you to be completely satisfied with your purchase. If you&apos;re
            not happy with your order, we&apos;ll make it right.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            30-Day Return Window
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            You have 30 days from the delivery date to return or exchange your
            items.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Return Conditions
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Items must be in original condition with all tags attached</li>
            <li>Items must be unworn, unwashed, and unused</li>
            <li>Original packaging should be included when possible</li>
            <li>
              Some items may be excluded from returns (see product page for
              details)
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            How to Return
          </h2>
          <ol className="list-decimal list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>
              <strong>Contact Us:</strong> Email us at{" "}
              <Link
                href="mailto:returns@shopmart.com"
                className="text-black font-semibold hover:underline"
              >
                returns@shopmart.com
              </Link>{" "}
              with your order number
            </li>
            <li>
              <strong>Get Return Label:</strong> We&apos;ll send you a prepaid return
              shipping label
            </li>
            <li>
              <strong>Ship Your Return:</strong> Package your items and drop off
              at any authorized location
            </li>
            <li>
              <strong>Receive Refund:</strong> We&apos;ll process your refund within
              5-7 business days
            </li>
          </ol>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Questions?</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            If you have any questions about returns or exchanges, please don&apos;t
            hesitate to contact us.
          </p>
          <p className="mt-2 text-gray-700 text-sm sm:text-base">
            <Link
              href="/Customer/Contact"
              className="text-black font-semibold hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
