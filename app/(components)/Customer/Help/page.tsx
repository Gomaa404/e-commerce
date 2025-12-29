import Link from "next/link";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">
            S
          </span>
          <span className="text-2xl font-semibold">Help Center</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">
            Welcome to the Help Center
          </h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Here you can find answers to common questions about orders,
            shipping, returns, payments, and your account. Browse the sections
            below to find the information you need or contact our support team
            for assistance.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Help Topics</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>
              <strong>Orders & Tracking:</strong> Learn how to track your orders
              and manage your purchases.{" "}
              <Link
                href="/Customer/Track"
                className="text-black font-semibold hover:underline"
              >
                Track Your Order
              </Link>
            </li>
            <li>
              <strong>Returns & Exchanges:</strong> Understand our return policy
              and how to exchange items.{" "}
              <Link
                href="/POLICIES/ReturnsExchanges"
                className="text-black font-semibold hover:underline"
              >
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <strong>Shipping Information:</strong> Details about shipping
              methods, delivery times, and costs.{" "}
              <Link
                href="/POLICIES/ShippingPolicy"
                className="text-black font-semibold hover:underline"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <strong>Payment & Billing:</strong> Information on payment
              methods, invoices, and refunds.
            </li>
            <li>
              <strong>Account Management:</strong> Help with creating, logging
              in, or updating your account.
            </li>
            <li>
              <strong>Contact Support:</strong> If you can’t find an answer,
              reach our support team directly.{" "}
              <Link
                href="/Customer/Contact"
                className="text-black font-semibold hover:underline"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Need More Help?</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Our support team is here to help. You can email us at{" "}
            <Link
              href="mailto:support@shopmart.com"
              className="text-black font-semibold hover:underline"
            >
              support@shopmart.com
            </Link>{" "}
            or call us at (+20) 01093333333.
          </p>
        </div>
      </div>
    </div>
  );
}
