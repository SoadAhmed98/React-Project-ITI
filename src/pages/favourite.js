import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import { Link } from 'react-router-dom';
import FavouriteProduct from '../component/favouriteProduct';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { DeleteFromFavourite, DeleteFromFavouriteaction } from '../Store/Actions/favouriteAction';

function Favourite(props) {
    const favouriteProducts = useSelector((state) => state.favourite.productItems);

    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts=async ()=>{
            try {
               
                const products = favouriteProducts.map(id =>
                    axios.get(`https://dummyjson.com/products/${id}`)
                );
                // console.log(products);
                const responses = await Promise.all(products);
                // console.log(responses);
                const productsData = responses.map(res => res.data);
                // console.log(productsData);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        
        }  

    fetchProducts();
    }, [favouriteProducts]);


    const deleteFromFavourites = (productId)=>{

       dispatch(DeleteFromFavouriteaction(productId))
        
      }
    return (
        <>
            <Header/>
            <section className="shoping-cart spad">
                <div className="container">
                {favouriteProducts.length == 0 ?
              
                        <div className="alert alert-light text-center" role="alert">
                                You Don't Add Any Product To Your Favourite List
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
                                            <th>Brand</th>
                                            <th>Category</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {products.map(product => (
                                        <FavouriteProduct key={product.id} image={product.images[0]} product_name={product.title} price={product.price} brand={product.brand} category={product.category}  id={product.id}/>
                                    ))}
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
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Favourite;