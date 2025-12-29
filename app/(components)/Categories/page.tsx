import CatCard from "@/app/_components/catCard/page";
import { GetAllCategories } from "@/app/Api/allCategories.api";
import { ICat } from "@/app/interface/cat.interface";


export default async function Categories() {
  const data = await GetAllCategories();
  console.log(data);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-bold mb-10 text-center">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data.map((cat: ICat) => (
          <CatCard key={cat._id} cat={cat}/>
        ))}
      </div>
    </div>
  );
}
