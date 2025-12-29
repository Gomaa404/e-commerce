import Link from "next/link";

export default function InvestorRelations() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">S</span>
          <span className="text-2xl font-semibold">
            ShopMart Investor Relations
          </span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">Investor Relations</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Welcome to ShopMart&apos;s Investor Relations page. Here you will find
            information regarding our financial performance, corporate
            governance, and investment opportunities.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            Financial Overview
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            ShopMart has experienced consistent growth over the past years,
            driven by innovation, strategic investments, and expansion into new
            markets. Detailed financial statements and annual reports are
            available upon request.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">
            Investment Opportunities
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Equity investment opportunities in expanding product lines</li>
            <li>Partnerships with technology and logistics startups</li>
            <li>Long-term growth potential in global e-commerce markets</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">
            Contact for Investors
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            For investor inquiries, please contact our investor relations team
            at{" "}
            <Link
              href="mailto:investors@shopmart.com"className="text-black font-semibold hover:underline">
              investors@shopmart.com</Link>.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Corporate Governance</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            ShopMart adheres to high standards of corporate governance and
            transparency to ensure the trust and confidence of our investors.
          </p>
        </div>
      </div>
    </div>
  );
}
