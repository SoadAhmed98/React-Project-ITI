export const AddToCartAction = (productItem) => {
    return {
        type: "ADD_TO_CART",
        payload: productItem
    };
};


export const DeleteFromCartAction = (productItem) => {
    return {
        type: "DELETE_FROM_CART",
        payload: productItem
    };
};
export const UpdateCartItemQuantityaction = (productItem)=>{
    return {
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: productItem
    };
}
export const CalculateTotalAction = (price)=>{
    return {
        type: "UPDATE_TOTALPRICE",
        payload: price
    };
}