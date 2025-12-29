import Link from "next/link";

export default function Careers() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">S</span>
          <span className="text-2xl font-semibold">ShopMart Careers</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-black">Join Our Team</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            At ShopMart, we are always looking for passionate and talented
            individuals to join our team. Our employees drive our innovation and
            help us deliver the best shopping experience to our customers.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            Current Openings
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-2">
            <li>
              <strong>Frontend Developer</strong> – Work on our e-commerce
              platform, improve user experience, and implement new features.
            </li>
            <li>
              <strong>Customer Service Representative</strong> – Assist our
              customers with inquiries, returns, and orders.
            </li>
            <li>
              <strong>Marketing Specialist</strong> – Plan and execute marketing
              campaigns to grow our brand and reach.
            </li>
            <li>
              <strong>Warehouse Associate</strong> – Manage inventory, prepare
              shipments, and ensure timely delivery.
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">How to Apply</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Interested candidates can submit their resume and cover letter to{" "}
            <Link
              href="mailto:careers@shopmart.com"
              className="text-black font-semibold hover:underline"
            >
              careers@shopmart.com
            </Link>
            .
          </p>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Please include the position you are applying for in the subject line
            of your email.
          </p>
        </div>
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">
            Why Work With Us
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
            <li>Innovative and collaborative work environment</li>
            <li>Opportunities for career growth and development</li>
            <li>Flexible work hours and remote work options</li>
            <li>Competitive salary and benefits</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
