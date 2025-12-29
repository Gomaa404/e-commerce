
export default  async function GetBrandDetails(id:string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
    const { data } = await response.json();
    return data;
}