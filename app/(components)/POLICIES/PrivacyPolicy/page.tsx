import Link from "next/link";

export default function Policy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
          Terms & Conditions / Privacy Policy
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            1. Introduction
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Welcome to our website. By accessing or using our service, you agree
            to be bound by these terms and conditions. Please read them
            carefully before proceeding.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Users are expected to use the website responsibly and comply with
            all applicable laws. Any misuse may result in termination of access.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">3. Privacy</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We respect your privacy. All personal information collected is used
            solely for the purpose of providing the services and will not be
            shared without your consent.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            4. Modifications
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will
            be posted on this page, and continued use of the website constitutes
            acceptance of the updated terms.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            5. Contact Us
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            If you have any questions regarding these terms or our privacy
            policy, please{" "}
            <Link
              href="/Customer/Contact"
              className="text-black font-semibold hover:underline"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
