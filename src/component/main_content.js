import React, { useEffect, useState } from 'react';
import Product_card from './product_card';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
function Main_content(props) {

    const [products, setProducts] = useState([]);
    const [pageCount,setPagecount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [searchfield , setSearchfield ] = useState('');
    const [productTitle,setProductTitle] = useState('') ;
    // console.log(productTitle);
    const limit = 12;
    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products?skip=0&limit=${limit}`);
            const total = response.data.total;
            setPagecount(Math.ceil(total / limit));
            setProducts(response.data.products);

            // console.log(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const fetchProductsUsingPagination = async (currentPage)=>{
        try {
            const skippedValues = currentPage * limit;
            let apiUrl = `https://dummyjson.com/products?skip=${skippedValues}&limit=${limit}`;
    
            // Append search query if available
            if (searchfield) {
                apiUrl += `&q=${searchfield}`;
            }
    
            // Append category filter if available
            if (category !== '' && category !== 'All Products') {
                apiUrl += `&category=${category}`;
            }
    
            const response = await axios.get(apiUrl);
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products with pagination:", error);
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products/categories");
            setCategories(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchCategoryProducts = async (cat) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/category/${cat}`);
            // console.log(response.data.products,cat);
            setProducts(response.data.products);
            setProductTitle(cat);
        } catch (error) {
            console.error("Error fetching category products:", error);
        }
    };
    const fetchSearchedProducts = async (searchedValue) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/search?q=${searchedValue}`);
            // console.log(response.data.products);
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching searched products:", error);
        }
    };

    const handleChange = async (e) => {
        const selectedCategory = e.target.innerText;
    
        if (selectedCategory == "All Products") {
            fetchProducts();
            setProductTitle("All");
            // console.log(category);
        } else {
            setCategory(selectedCategory); // Update category state
    
            try {
                // Use the updated category directly from state
                await fetchCategoryProducts(selectedCategory);
            } catch (error) {
                console.error("Error fetching category products:", error);
            }
        }
    };
    const searchProduct=async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData);
        const searchValue = formData.get('search'); 
        setSearchfield(searchValue);
        try {
            // Use the updated category directly from state
            await fetchSearchedProducts(searchValue);
            setProductTitle(searchValue);
            e.target.search.value=''
        } catch (error) {
            console.error("Error fetching searched products:", error);
        }
    }
  const handlePageClick =async(data)=>{
    // console.log(data.selected);
    let currentPage = data.selected ;
    await  fetchProductsUsingPagination(currentPage);
  }


  useEffect(() => {
    fetchProducts();
    fetchCategories();
}, []); 

    return (
        <>
         
         <section className="hero mt-5">
            <div className="container">
                <div className='row'>
                    <div className="hero__item set-bg" data-setbg={`${process.env.PUBLIC_URL}/assets/img/hero/banner.jpg`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/hero/banner.jpg)` }}>
                        <div className="hero__text" style={{padding:"60px"}}>
                            <span>SALES ON</span>
                            <h2>Products <br />100% Original</h2>
                            <p>Free Pickup and Delivery Available</p>
                            <a href="#" className="primary-btn">SHOP NOW</a>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-3">
                        <div className="hero__categories" >
                            <div className="hero__categories__all" onClick={toggleCategories}>
                                <i className="fa fa-bars"></i>
                                <span>All Categories</span>
                            </div>
                            <ul className={showCategories ? 'hero__categories__list__show' : 'hero__categories__list'} >
                            <li onClick={(e)=>handleChange(e)} style={{cursor:'pointer'}}>All Products</li>
                                {
                                    categories.map((category,index)=>{
                                        return (<li key={index} onClick={(e)=>handleChange(e)} style={{cursor:'pointer'}}>{category.name}</li>)
                                    })
                                }
                               

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="hero__search">
                            <div className="hero__search__form mx-auto">
                                <form onSubmit={(e) => searchProduct(e)}>
                                    <input type="text" placeholder="What do you need?"   name='search'/>
                                    <button type="submit" className="site-btn">SEARCH</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-5">
                        <div className="section-title ">
                            <h2>{productTitle ? productTitle :"All"} Products</h2>
                        </div>
                    </div>
                </div>
                <div className="row featured__filter">
                    {
                    products.map((product,index)=>{
                        return  <Product_card key={index} image={product.images[0]} product_name={product.title} price={product.price} quantity={1}  id={product.id}/>
                    })
                    }
                    
                </div>
            </div>
        </section>
        {products.length >= 12 && (
        <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination mb-5 justify-content-center"}
        pageClassName={"page-item "}
        pageLinkClassName={"page-link text-secondary"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link text-secondary"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link text-secondary"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link text-secondary"}
        activeClassName={"active"}
      /> )}
        </>
    );
}

export default Main_content;