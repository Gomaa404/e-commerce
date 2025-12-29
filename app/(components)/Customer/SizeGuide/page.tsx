export default function SizeGuide() {
  const clothingSizes = [
    { size: "S", chest: "34-36", waist: "28-30", hip: "34-36" },
    { size: "M", chest: "38-40", waist: "32-34", hip: "38-40" },
    { size: "L", chest: "42-44", waist: "36-38", hip: "42-44" },
    { size: "XL", chest: "46-48", waist: "40-42", hip: "46-48" },
  ];
  const shoeSizes = [
    { us: "6", eu: "39", uk: "5.5" },
    { us: "7", eu: "40", uk: "6.5" },
    { us: "8", eu: "41", uk: "7.5" },
    { us: "9", eu: "42", uk: "8.5" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl w-full mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg space-y-8">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center rounded">S</span>
          <span className="text-2xl font-semibold">Size Guide</span>
        </div>
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-black">Find Your Perfect Fit</h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Use this guide to select the right size for clothing, shoes, and accessories. Measurements are approximate to help you choose the best fit.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Clothing Sizes</h2>
          <table className="table-auto w-full text-xs sm:text-sm md:text-base text-gray-700 border border-gray-300 rounded-lg wrap-break-words">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 sm:px-4 sm:py-2">Size</th>
                <th className="border px-2 py-1 sm:px-4 sm:py-2">Chest (inches)</th>
                <th className="border px-2 py-1 sm:px-4 sm:py-2">Waist (inches)</th>
                <th className="border px-2 py-1 sm:px-4 sm:py-2">Hip (inches)</th>
              </tr>
            </thead>
            <tbody>
              {clothingSizes.map((item) => (
                <tr key={item.size}>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.size}</td>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.chest}</td>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.waist}</td>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Shoe Sizes</h2>
          <table className="table-auto w-full text-xs sm:text-sm md:text-base text-gray-700 border border-gray-300 rounded-lg wrap-break-words">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 sm:px-4 sm:py-2">US</th>
                <th className="border px-2 py-1 sm:px-4 sm:py-2">EU</th>
                <th className="border px-2 py-1 sm:px-4 sm:py-2">UK</th>
              </tr>
            </thead>
            <tbody>
              {shoeSizes.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.us}</td>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.eu}</td>
                  <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.uk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-black">Tips for Accurate Fit</h2>
          <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm md:text-base space-y-1">
            <li>Measure yourself before selecting a size.</li>
            <li>Check product-specific sizing information on the product page.</li>
            <li>Consider fit preferences (slim, regular, loose).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}