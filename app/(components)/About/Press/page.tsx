import Link from "next/link";

export default function Press() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">
            S
          </span>
          <span className="text-2xl font-semibold">ShopMart Press</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">Media & Press</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Welcome to the ShopMart Press page. Here, you can find the latest news, media coverage, and press releases about our company, products, and initiatives.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Press Releases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>
              <strong>ShopMart Launches New E-Commerce Platform</strong> – February 2025: Our new platform offers improved shopping experience, faster checkout, and personalized recommendations.
            </li>
            <li>
              <strong>ShopMart Partners with Local Tech Startups</strong> – January 2025: Supporting innovation by collaborating with emerging technology companies.
            </li>
            <li>
              <strong>ShopMart Achieves Sustainability Milestone</strong> – December 2024: Reduced packaging waste by 40% across all product lines.
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Media Inquiries</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            For media inquiries, interviews, or press materials, please contact our media team at{" "}
            <Link href="mailto:press@shopmart.com" className="text-black font-semibold hover:underline">
              press@shopmart.com
            </Link>.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Why Cover ShopMart</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Innovative products and services that set industry trends</li>
            <li>Commitment to sustainability and social responsibility</li>
            <li>Fast growth in e-commerce and retail innovation</li>
            <li>Trusted brand with millions of satisfied customers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}