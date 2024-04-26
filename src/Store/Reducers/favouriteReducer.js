const INITIAL_VALUE = {

    productItems: [] 

};



export default function favouriteReducer(state = INITIAL_VALUE , action)
{
    switch(action.type)
    {
        case "ADD_FAVOURITE":
            return{
                ...state,
                productItems: [...state.productItems, action.payload]
            }

        case "DELETE_FAVOURITE":
            return{
                ...state,
                productItems: state.productItems.filter(item => item !== action.payload) 


            }
        default:
            return state
    }
}
