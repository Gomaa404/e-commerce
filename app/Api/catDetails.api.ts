export default async function GetCatDetails(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
  );
  const { data } = await response.json();
  return data;
}
