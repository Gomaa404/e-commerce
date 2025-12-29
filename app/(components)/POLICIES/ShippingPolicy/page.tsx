import Link from "next/link";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
          Shipping Policy
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Order Processing
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            All orders are processed within 1-3 business days. Orders are not
            shipped or delivered on weekends or holidays.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Shipping Methods & Delivery Times
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Standard Shipping: 5-7 business days</li>
            <li>Express Shipping: 2-3 business days</li>
            <li>
              Overnight Shipping: 1 business day (available for select
              locations)
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Shipping Costs
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Shipping costs are calculated at checkout based on weight,
            dimensions, and shipping method. Free standard shipping is available
            for orders over a specified amount.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Order Tracking
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Once your order is shipped, you will receive a tracking number via
            email. You can track your order status through our{" "}
            <Link
              href="/Customer/Track"
              className="text-black font-semibold hover:underline"
            >
              tracking page
            </Link>
            .
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Contact Us</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            If you have any questions about our shipping policy, delivery times,
            or costs, please{" "}
            <Link
              href="/Customer/Contact"
              className="text-black font-semibold hover:underline"
            >
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
