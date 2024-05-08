import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteFromFavouriteaction } from '../Store/Actions/favouriteAction';

function FavouriteProduct(props) {
    const dispatch = useDispatch()
    const removeFromFav= (productId)=>{
        dispatch(DeleteFromFavouriteaction(productId))
       }
    return (
        <>
          
                <tr>
              
                        <td className="shoping__cart__item">
                           <Link to={`/productDetails/${props.id}`}>
                            <img src={props.image} style={{width:"100px",height:"120px"}} alt={props.product_name + "image"}/>
                            <h5>{props.product_name} </h5>
                            </Link>
                        </td>
                       
                        <td className="shoping__cart__price">
                            ${props.price} 
                        </td>
                        <td className="shoping__cart__brand">
                             {props.brand} 
                        </td>
                        <td className="shoping__cart__category">
                            {props.category} 
                        </td>
                        <td className="shoping__cart__item__close">
                            <span className="icon_close" onClick={() => removeFromFav(props.id)}></span>
                        </td>
                    </tr>
        </>
    );
}

export default FavouriteProduct;