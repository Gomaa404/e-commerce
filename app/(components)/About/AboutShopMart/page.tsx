import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">S</span>
          <span className="text-2xl font-semibold">ShopMart</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">About ShopMart</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            ShopMart is your one-stop destination for the latest technology, fashion, and lifestyle products. 
            We are committed to providing quality products with fast shipping and excellent customer service.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Our Mission</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            To make shopping for quality products easy, convenient, and enjoyable for everyone. 
            We believe that everyone deserves access to the latest and best products at competitive prices.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li><strong>Quality:</strong> We only sell products that meet our high standards</li>
            <li><strong>Customer Service:</strong> Your satisfaction is our priority</li>
            <li><strong>Innovation:</strong> We stay ahead of trends to bring you the latest products</li>
            <li><strong>Trust:</strong> We build lasting relationships with our customers</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Why Choose ShopMart?</h2>
          <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
            <li><strong>Fast Shipping:</strong> Quick and reliable delivery to your doorstep</li>
            <li><strong>Quality Guarantee:</strong> All products are carefully selected and tested</li>
            <li><strong>24/7 Support:</strong> Our customer service team is always here to help</li>
            <li><strong>Easy Returns:</strong> Hassle-free return policy for your peace of mind</li>
          </ul>
        </div>
        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
          <h2 className="text-xl font-semibold text-black">Contact Us</h2>
          <p>123 Shop Street, October City, DC 12345</p>
          <p>(+20) 01093333333</p>
          <p>
            <Link href="mailto:support@shopmart.com" className="text-black font-semibold hover:underline">
              support@shopmart.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}