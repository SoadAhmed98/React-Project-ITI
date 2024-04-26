export const AddToFavouriteaction = (productItem) => {
    return {
        type: "ADD_FAVOURITE",
        payload: productItem
    };
};


export const DeleteFromFavouriteaction = (productItem) => {
    return {
        type: "DELETE_FAVOURITE",
        payload: productItem
    };
};