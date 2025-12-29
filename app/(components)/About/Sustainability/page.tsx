import Link from "next/link";

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">
            S
          </span>
          <span className="text-2xl font-semibold">
            ShopMart Sustainability
          </span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">
            Sustainability at ShopMart
          </h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            At ShopMart, sustainability is at the core of our business. We are
            committed to minimizing our environmental impact and promoting
            social responsibility across all aspects of our operations.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">
            Environmental Responsibility
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Reducing packaging waste by using eco-friendly materials</li>
            <li>Minimizing carbon footprint through optimized logistics</li>
            <li>Encouraging recycling and sustainable product options</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">
            Social Responsibility
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Supporting local communities and charitable initiatives</li>
            <li>Ensuring fair labor practices throughout our supply chain</li>
            <li>Providing safe and inclusive workplace for all employees</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">
            Sustainable Products
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We are committed to offering products that are environmentally
            friendly and responsibly sourced. Look for our eco-friendly badge
            when shopping for sustainable options.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            For any questions regarding our sustainability initiatives, please
            contact our sustainability team at{" "}
            <Link
              href="mailto:sustainability@shopmart.com"
              className="text-black font-semibold hover:underline"
            >
              sustainability@shopmart.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
