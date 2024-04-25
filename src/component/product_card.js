import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

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

    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                    <div className="featured__item">
                       
                        <div className="featured__item__pic set-bg" style={{ backgroundImage:`url(${`${props.image}`})`}}>
                           
                                <Link to={`/productDetails/${props.id}`} className='product__details'>
                                </Link>
                            
                            <ul className="featured__item__pic__hover">
                                <li onClick={() => auth()}><i className="fa fa-heart"></i></li>
                                <li onClick={() => auth()}><i className="fa fa-shopping-cart"></i></li>
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