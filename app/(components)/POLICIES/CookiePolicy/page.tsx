import Link from "next/link";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
          Cookie Policy
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Introduction
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            This Cookie Policy explains how ShopMart uses cookies and similar
            technologies on our website. By using our site, you consent to the
            use of cookies as described in this policy.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            What Are Cookies?
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Cookies are small text files stored on your device by your web
            browser. They help us improve your browsing experience, remember
            preferences, and analyze site traffic.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Types of Cookies We Use
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>
              <strong>Essential Cookies:</strong> Required for the basic
              functioning of the site.
            </li>
            <li>
              <strong>Performance Cookies:</strong> Help us understand how
              visitors interact with the site.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences and
              enhance user experience.
            </li>
            <li>
              <strong>Targeting/Advertising Cookies:</strong> Used to provide
              relevant advertisements.
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Managing Cookies
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            You can manage or disable cookies through your browser settings.
            Note that disabling some cookies may affect the functionality of the
            website.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Contact Us</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            If you have any questions about our Cookie Policy, please{" "}
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
