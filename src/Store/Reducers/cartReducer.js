const INITIAL_VALUE = {

    productItems: [] ,
    totalPrice:0

};



export default function cartReducer(state = INITIAL_VALUE , action)
{
    switch(action.type)
    {
        case "ADD_TO_CART":
           
            return{
                ...state,
                productItems: [...state.productItems, action.payload],
            }

        case "DELETE_FROM_CART":
           
            return{
                ...state,
                productItems: state.productItems.filter(item => item.productId !== action.payload) ,
                
            }
        case "UPDATE_CART_ITEM_QUANTITY":
            const { productId, quantity } = action.payload;
            const updatedItems = state.productItems.map(item => {
                if (item.productId === productId) {
                    return { ...item, quantity };
                }
                return item;
            });
            return {
                ...state,
                productItems: updatedItems
            };

        case "UPDATE_TOTALPRICE":    
           
             return{
                ...state,
                totalPrice: action.payload 
                
            }
        default:
            return state
    }
}
