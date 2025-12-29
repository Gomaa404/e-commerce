import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-black to-gray-800 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-md">
                <span className="text-xl font-bold">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent tracking-tight">
                ShopMart
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Your one-stop destination for the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>

          <ul className="text-sm text-gray-600 space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink text-black">
                <i className="fa-solid fa-location-dot text-sm"></i>
              </div>
              <span className="mt-1.5">123 Shop Street, October City, DC 12345</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink text-black">
                <i className="fa-solid fa-phone text-sm"></i>
              </div>
              <span>(+20) 01093333333</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink text-black">
                <i className="fa-regular fa-envelope text-sm"></i>
              </div>
              <span>support@shopmart.com</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">SHOP</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/Categories" className="hover:text-black transition">Electronics</Link>
            </li>
            <li>
              <Link href="/Categories" className="hover:text-black transition">Fashion</Link>
            </li>
            <li>
              <Link href="/Categories" className="hover:text-black transition">Home & Garden</Link>
            </li>
            <li>
              <Link href="/Categories" className="hover:text-black transition">Sports</Link>
            </li>
            <li>
              <Link href="/Categories" className="hover:text-black transition">Deals</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">CUSTOMER SERVICE</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/Customer/Contact" className="hover:text-black transition">Contact Us</Link>
            </li>
            <li>
              <Link href="/Customer/Help" className="hover:text-black transition">Help Center</Link>
            </li>
            <li>
              <Link href="/Customer/Track" className="hover:text-black transition">Track Your Order</Link>
            </li>
            <li>
              <Link href="/POLICIES/ReturnsExchanges" className="hover:text-black transition">Returns & Exchanges</Link>
            </li>
            <li>
              <Link href="/Customer/SizeGuide" className="hover:text-black transition">Size Guide</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">ABOUT</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/About/AboutShopMart" className="hover:text-black transition">About ShopMart</Link>
            </li>
            <li>
              <Link href="/About/Careers" className="hover:text-black transition">Careers</Link>
            </li>
            <li>
              <Link href="/About/Press" className="hover:text-black transition">Press</Link>
            </li>
            <li>
              <Link href="/About/InvestorRelations" className="hover:text-black transition">Investor Relations</Link>
            </li>
            <li>
              <Link href="/About/Sustainability" className="hover:text-black transition">Sustainability</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">POLICIES</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/POLICIES/PrivacyPolicy" className="hover:text-black transition">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/POLICIES/PrivacyPolicy" className="hover:text-black transition">Terms of Service</Link>
            </li>
            <li>
              <Link href="/POLICIES/CookiePolicy" className="hover:text-black transition">Cookie Policy</Link>
            </li>
            <li>
              <Link href="/POLICIES/ShippingPolicy" className="hover:text-black transition">Shipping Policy</Link>
            </li>
            <li>
              <Link href="/POLICIES/ReturnsExchanges" className="hover:text-black transition">Refund Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 p-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  );
}