import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteFromCartAction, UpdateCartItemQuantityaction } from '../Store/Actions/cartAction';

function CartProduct(props) {
    const productItems = useSelector(state => state.cart.productItems);
    const dispatch = useDispatch();

    // Find the cart item with matching productId
    const cartItem = productItems.find(item => item.productId === props.id);
    // console.log(cartItem);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
    const [totalPrice, setTotalPrice] = useState(quantity * props.price);

    const removeFromcart = (productId) => {
        dispatch(DeleteFromCartAction(productId));
    };

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        
        if (newQuantity >= 1 && newQuantity <= props.stock) {
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * props.price);

            // Dispatch an action to update the quantity of the item in the cart
            if (cartItem) {
                dispatch(UpdateCartItemQuantityaction({ productId: props.id, quantity: newQuantity }));
            }
        } else if (newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity > props.stock) {
            setQuantity(props.stock);
        }
    };
  
    useEffect(() => {
        setTotalPrice(quantity * props.price);
    }, [quantity, props.price]);
    return (
        <>
           <tr>
               <td className="shoping__cart__item">
                    <Link to={`/productDetails/${props.id}`}>
                            <img src={props.image} style={{width:"100px",height:"120px"}} alt={props.product_name + "image"}/>
                            <h5>{props.product_name}</h5>
                    </Link> 
                </td>   
                <td className="shoping__cart__price">
                    ${props.price} 
                </td>
                <td className="shoping__cart__quantity">
                    <div className="quantity">
                        <div className="pro-qty">
                        <span className="dec qtybtn"  onClick={() => handleQuantityChange(-1)}>-</span>
                            <input type="text" value={`${props.vlaue ? props.vlaue :quantity}`} readOnly/>
                            <span className="inc qtybtn"  onClick={() => handleQuantityChange(1)}>+</span>
                        </div>
                    </div>
                </td>
                <td className="shoping__cart__total">
                    
                    ${totalPrice}
                </td>
                <td className="shoping__cart__item__close">
                    <span className="icon_close" onClick={() => removeFromcart(props.id)}></span>
                </td>
            </tr> 
        </>
    );
}

export default CartProduct;