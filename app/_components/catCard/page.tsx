import { ICat } from "@/app/interface/cat.interface";
import Link from "next/link";
export default function CatCard({ cat }: { cat: ICat }) {
  return (
    <div>
      <div className="group relative rounded-2xl overflow-hidden border bg-white hover:shadow-lg transition">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-52 md:h-72 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <h2 className="text-white text-lg font-semibold mb-3">{cat.name}</h2>
          <Link href={`/Categories/${cat._id}`}>
            <button className="px-5 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition">
              View Category
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
