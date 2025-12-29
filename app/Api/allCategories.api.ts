
export async function GetAllCategories() {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
    const { data } = await response.json();
    return data;
}