import BrandCard from "@/app/_components/brandCard/page";
import { GetAllBrands } from "@/app/Api/allBrand.api";
import { IBrand } from "@/app/interface/brand.interface";
export default async function Brands() {
  const data = await GetAllBrands();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-bold mb-10 text-center">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data.map((brand:IBrand) => (
          <BrandCard brand={brand} key={brand._id}/>
        ))}
      </div>
    </div>
  );
}
