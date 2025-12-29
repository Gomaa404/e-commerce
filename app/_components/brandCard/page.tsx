import { IBrand } from "@/app/interface/brand.interface";
import Link from "next/link";

export default function BrandCard({ brand }: { brand: IBrand }) {
  return (
    <div
      key={brand._id}
      className="group relative rounded-2xl overflow-hidden bg-white border hover:shadow-lg transition"
    >
      <img
        src={brand.image}
        alt={brand.name}
        className="w-full h-48 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <h2 className="text-white text-lg font-semibold mb-3">{brand.name}</h2>
        <Link href={`/brands/${brand._id}`}>
          <button className="px-5 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition">
            View Brand
          </button>
        </Link>
      </div>
    </div>
  );
}
