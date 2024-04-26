import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';
import Product_card from '../component/product_card';
import Header from '../component/header';

function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [largeImage, setLargeImage] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  
  useEffect(() => {
    var proQty = document.querySelector('.pro-qty');
   console.log(proQty);
   

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        // console.log(response.data);
        setLargeImage(response.data.thumbnail);
        setProduct(response.data);
        setLoading(false); // Set loading to false after data is fetched
        // Fetch related products based on category
        const relatedResponse = await axios.get(`https://dummyjson.com/products/category/${response.data.category}`);
    //    console.log(relatedResponse);
        const relatedProductsData = relatedResponse.data.products.filter(p => p.id != id); // Exclude current product
        setRelatedProducts(relatedProductsData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    } else if (newQuantity < 1) {
      setQuantity(1);
    } else if (newQuantity > product.stock) {
      setQuantity(product.stock);
    }
  };

  const handleImageClick = (imgUrl) => {
    if (imgUrl !== largeImage) {
      setLargeImage(imgUrl);
    }
  };

  const renderProductImage = () => {
    if (loading) {
      return (
        <div className="product__details__pic__item">
          {/* Display a loading spinner while loading */}
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="product__details__pic__item">
        <img
          className="product__details__pic__item--large"
          src={largeImage}
          alt="Product"
        />
      </div>
    );
  };

  const renderCarouselItems = () => {
    if (product.images && product.images.length > 0) {
      return product.images.map((image, index) => (
        <div key={index} className="item">
          <img
            onClick={() => handleImageClick(image)}
            src={image}
            alt={`Thumbnail ${index + 1}` }
            style={{height:"100px"}}
          />
        </div>
      ));
    } else {
      return (
        <div className="item">
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

    const stars = [];
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }
    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(<i key="half" className="fa fa-star-half-o"></i>);
    }
    // Render remaining empty stars to complete 5 stars
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa fa-star-o"></i>);
    }

    return stars;
  };
const checkStock=()=>{
    if(product.stock > 0){
        return (
            <span style={{color:'green',fontWeight:"bold"}} >In Stock</span>
        )
    }
    else{
        if(loading){
            return (
                <span></span>
            )
        }else{
            return (
                <span style={{color:"red" , fontWeight:"bold"}}>Out Of Stock</span>
            )
        }
    
    }
}
  return (
    <>
    <Header/>
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              {renderProductImage()}
              <Carousel
                className="product__details__pic__slider"
                responsive={{
                  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
                  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
                  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                }}
                infinite={true}
              >
                {renderCarouselItems()}
              </Carousel>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{product.title}</h3>
              <div className="product__details__rating">
              {renderRatingStars(product.rating)}
             <span>({product.rating})</span>
              </div>
              <div className="product__details__price">${product.price}</div>
              <p>
              {product.description}
              </p>
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                  <span class="dec qtybtn"  onClick={() => handleQuantityChange(-1)}>-</span>
                    <input type="text" value={quantity} />
                    <span class="inc qtybtn"  onClick={() => handleQuantityChange(1)}>+</span>
                  </div>
                </div>
              </div>
              <a href="#" className="primary-btn">
                ADD TO CART
              </a>
              <a href="#" className="heart-icon">
                <span className="icon_heart_alt"></span>
              </a>
              <ul>
                <li>
                  <b>Availability</b> {checkStock()}
                </li>
                {/* <li>
                  <b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span>
                </li>
                <li>
                  <b>Weight</b> <span>0.5 kg</span>
                </li> */}
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="product__details__tab">
             
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab == 'tabs-1' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tabs-1')} style={{cursor:'pointer'}}
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab == 'tabs-2' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tabs-2')} style={{cursor:'pointer'}}
                  >
                    Rating
                  </a>
                </li>
              
              </ul>
              <div className="tab-content">
                <div className={`tab-pane ${activeTab == 'tabs-1' ? 'active' : ''}`}id="tabs-1" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>Products Description</h6>
                    <p>
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className={`tab-pane ${activeTab == 'tabs-2' ? 'active' : ''}`} id="tabs-2" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>Products Rating</h6>
                    <div className="product__details__text">
                    <p className="product__details__rating">
                    {renderRatingStars(product.rating)}
                     <span>{product.rating}</span>
                    </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="related-product">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title related__product__title">
                        <h2>Related Product</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                    {
                        relatedProducts.map((product)=>{
                            return  <Product_card image={product.images[0]} product_name={product.title} price={product.price}  id={product.id}/>
                        })
                      }
                
            </div>
        </div>
    </section>
  </>
  );
}

export default ProductDetails;
