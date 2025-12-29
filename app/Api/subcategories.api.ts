export async function GetAllSubcategories() {
    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/subcategories"
    );
    const { data } = await response.json();
    return data;
}

export async function GetSubcategoriesOnCategory(categoryId: string) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
    const { data } = await response.json();
    return data;
}
