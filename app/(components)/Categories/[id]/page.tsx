import ProductCard from "@/app/_components/productCard/page";
import GetCatDetails from "@/app/Api/catDetails.api";
import { IProduct } from "@/app/interface/product.interface";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: IProduct[] = await GetCatDetails(id);
  const categoryName = data.length > 0 ? data[0].category.name : "Category";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {categoryName} Products
      </h1>
      {data.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No products found for this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
