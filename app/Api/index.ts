// All Product APIs
export { GetAllProducts } from "./allProduct.Api";
export { default as GetProductDetails } from "./productDetails.api";

// Category APIs  
export { GetAllCategories } from "./allCategories.api";
export { default as GetCatDetails } from "./catDetails.api";

// Subcategory APIs
export {
    GetAllSubcategories,
    GetSubcategoriesOnCategory,
} from "./subcategories.api";

// Brand APIs
export { GetAllBrands } from "./allBrand.api";
export { default as GetBrandDetails } from "./brandDetails.api";

// Cart APIs
export {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
    type CartData,
    type CartProduct,
} from "./cart.api";

// Wishlist APIs
export {
    getWishlist,
    addWishlistItem,
    deleteWishlistItem,
} from "./wishlist.api";

// Auth APIs
export {
    forgotPassword,
    verifyResetCode,
    resetPassword,
} from "./forgotPassword.api";

// Order APIs
export {
    getUserOrders,
    getSpecificOrder,
    createCashOrder,
    createCheckoutSession,
    type Order,
    type OrderProduct,
    type ShippingAddress,
} from "./orders.api";

// Address APIs
export {
    getAddresses,
    addAddress,
    removeAddress,
    getSpecificAddress,
    type Address,
} from "./addresses.api";
