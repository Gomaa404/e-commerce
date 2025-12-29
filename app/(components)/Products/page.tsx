import ProductCard from "@/app/_components/productCard/page";
import { GetAllProducts } from "@/app/Api/allProduct.Api";
import { IProduct } from "@/types/product.interface";
export default async function Products() {
  const data = await GetAllProducts();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product:IProduct ) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}