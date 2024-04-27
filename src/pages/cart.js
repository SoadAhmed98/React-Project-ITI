import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import { useDispatch, useSelector } from 'react-redux';
import { CalculateTotalAction, DeleteFromCartAction } from '../Store/Actions/cartAction';
import axios from 'axios';
import CartProduct from '../component/cartProduct';
import { Link } from 'react-router-dom';

function Cart(props) {
    const cartProducts = useSelector((state) => state.cart.productItems);
    const TotalPrice = useSelector((state) => state.cart.totalPrice);

    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    useEffect(() => {

        const fetchProducts=async ()=>{
            try {
               
                const products = cartProducts.map(product =>
                    axios.get(`https://dummyjson.com/products/${product.productId}`)
                );
                const responses = await Promise.all(products);
                const productsData = responses.map(res => res.data);
                setProducts(productsData);
            
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        
        }  

    fetchProducts();
    }, [cartProducts]);
    

    const deleteFromcart = (productId)=>{

       dispatch(DeleteFromCartAction(productId))
        
      }
      const CalculateTotalPrice = () => {
        const totalPrice = cartProducts.reduce((accumulator, currentItem) => {
            const itemTotalPrice = currentItem.quantity * currentItem.price;
            return accumulator + itemTotalPrice;
        }, 0);
        dispatch(CalculateTotalAction(totalPrice))
        // console.log(TotalPrice);
        return totalPrice; // Format total price to 2 decimal places
    };
    return (
        <>
            <Header/>
            <section className="shoping-cart spad">
                <div className="container">
                {cartProducts.length == 0 ?
              
                        <div class="alert alert-light text-center" role="alert">
                                You Don't Add Any Product To Your Cart 
                        </div>
                :
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Products</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {products.map(product => (
                                        <CartProduct key={product.id} image={product.images[0]} product_name={product.title} price={product.price} brand={product.brand} category={product.category}  id={product.id} stock={product.stock}/>
                                       
                                    ))
                                  
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
                <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                               <Link to="/" className="primary-btn cart-btn">CONTINUE SHOPPING</Link>
                            </div>
                        </div>
                       { cartProducts.length != 0  && (<div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>
                                    <li>Subtotal <span>${CalculateTotalPrice()}</span></li>
                                    <li>Total <span>${CalculateTotalPrice()}</span></li>
                                </ul>
                                <a href="#" className="primary-btn">PROCEED TO CHECKOUT</a>
                            </div>
                        </div>)
                        }
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Cart;