import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { AddToFavouriteaction, DeleteFromFavouriteaction } from '../Store/Actions/favouriteAction';
import { AddToCartAction, CalculateTotalAction, DeleteFromCartAction } from '../Store/Actions/cartAction';

function Product_card(props) {
    const navigate=useNavigate ();
    const [user, setUser] = useState([]);

    const auth=()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        if (user == null) {
            navigate('/login')
           }
    }
    const favouriteProducts = useSelector((state) => state.favourite.productItems);
    const productItems = useSelector((state) =>{ return state.cart.productItems});
    const cartProductIds = productItems.map((item) => item.productId);
    // console.log(cartProductIds);
    const dispatch = useDispatch()
    //favourite
    const AddToFavourite = (productId)=>{
      dispatch(AddToFavouriteaction(productId))
    }
   const addToFav = ()=>{
    auth(); 
    AddToFavourite(props.id); 
   }
   const removeFromFav= (productId)=>{
    dispatch(DeleteFromFavouriteaction(productId))
   }
   //cart
   
   const AddToCart = ({productId,price,quantity})=>{
    dispatch(AddToCartAction({productId,price,quantity}))
  }
    const addtocart = ()=>{
        // console.log(props.id, props.quantity, props.price); // Check specific properties

    auth(); 
    AddToCart({ productId: props.id, quantity: props.quantity, price: props.price}); 
    }
    const removeFromCart= (productId)=>{
    dispatch(DeleteFromCartAction(productId))
    }
    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                    <div className="featured__item">
                       
                        <div className="featured__item__pic set-bg" style={{ backgroundImage:`url(${`${props.image}`})`}}>
                           
                                <Link to={`/productDetails/${props.id}`} className='product__details'>
                                </Link>
                            
                            <ul className="featured__item__pic__hover">
                                {favouriteProducts.includes(props.id) ? (
                                    <li onClick={() => removeFromFav(props.id)} style={{backgroundColor:"white",borderColor:"white"}}><i className="fa fa-heart" style={{ color: "red"}}></i></li>
                                ) : (
                                    <li onClick={addToFav}><i className="fa fa-heart"></i></li>
                                )}
                                {cartProductIds.includes(props.id) ? (
                                    <li onClick={() => removeFromCart(props.id)} style={{backgroundColor:"white",borderColor:"white"}}><i className="fa fa-shopping-cart" style={{ color: "red"}}></i></li>
                                ) : (
                                    <li onClick={addtocart}><i className="fa fa-shopping-cart"></i></li>
                                )}
                            </ul>
                           
                        </div>
                        
                        <div className="featured__item__text">
                            <h6><a href="#">{props.product_name}</a></h6>
                            <h5> ${props.price} </h5>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default Product_card;