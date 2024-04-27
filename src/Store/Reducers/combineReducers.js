import { combineReducers } from "redux";
import favouriteReducer from "./favouriteReducer";
import cartReducer from "./cartReducer";


export default combineReducers({
    favourite: favouriteReducer,
    cart:cartReducer
})