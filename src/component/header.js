import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const favouriteProducts = useSelector((state) => state.favourite.productItems);
    const location=useLocation();
    // console.log(location.pathname); 
    useEffect(() => {
        var humbergerOpen = document.querySelector(".humberger__open");
        var humbergerMenuWrapper = document.querySelector(".humberger__menu__wrapper");
        var humbergerMenuOverlay = document.querySelector(".humberger__menu__overlay");
    
        humbergerOpen.addEventListener('click', function () {
            humbergerMenuWrapper.classList.add("show__humberger__menu__wrapper");
            humbergerMenuOverlay.classList.add("active");
            document.body.classList.add("over_hid");
        });
    
        humbergerMenuOverlay.addEventListener('click', function () {
            humbergerMenuWrapper.classList.remove("show__humberger__menu__wrapper");
            humbergerMenuOverlay.classList.remove("active");
            document.body.classList.remove("over_hid");
        });

    }, []);
    const showHeaderCart=()=>{
        if(location.pathname != '/login' && location.pathname != '/register'){
        return( 
            <div className="header__cart">
                <ul>
                    <li><Link to="/favourites"><i className="fa fa-heart"></i> <span>{favouriteProducts.length}</span></Link></li>
                    <li><Link to="/cart"><i className="fa fa-shopping-bag"></i> <span>3</span></Link></li>
                </ul>
                <div className="header__cart__price">item: <span>$150.00</span></div>
            </div>
        )
        }
    }
    const checkLogin=()=>{
        const userData = JSON.parse(localStorage.getItem('user'));
        // console.log(userData);
        if(userData == null){
            return (
                <div className="header__top__right__auth">
                   <Link to="/login"><i className="fa fa-user"></i> Login</Link>
                </div>
            )
        }else{
            const UserName=userData.email.split("@")[0];
            // console.log(UserName);
             return (
                    <div className="header__top__right__auth">
                         Welcome <strong>{UserName}</strong>
                     </div>
             )
        }
    }
    return (
        <>
               <div className="humberger__menu__overlay"></div>
                <div className="humberger__menu__wrapper">
                    <div className="humberger__menu__logo">
                        <a href="#"><img src={process.env.PUBLIC_URL +'/assets/img/logo.png'} alt=""/></a>
                    </div>
                    <div className="humberger__menu__cart">
                        {showHeaderCart()}
                    </div>
                    <div className="humberger__menu__widget">
                        {checkLogin()}
                       
                    </div>
                    <nav className="navbar mb-3">
                        <ul className='navbar-nav'>
                            <li className="nav-item  active">
                                <Link to="/" className='nav-link text-dark'>Home</Link>
                            </li>
                        </ul>
                    </nav>
                    <div id="mobile-menu-wrap"></div>
                    <div className="header__top__right__social">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-linkedin"></i></a>
                        <a href="#"><i className="fa fa-pinterest-p"></i></a>
                    </div>
                    <div className="humberger__menu__contact">
                        <ul>
                        
                            <li>Free Shipping for all Order of $99</li>
                        </ul>
                    </div>
                </div>
              <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                           
                            <div className="offset-6 col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    {checkLogin()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <a href="./index.html"><img src={process.env.PUBLIC_URL +'/assets/img/logo.png'} alt=""/></a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link to="/">Home</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                           {showHeaderCart()}
                        </div>
                    </div>
                    <div className="humberger__open" >
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
              </header>
        </>
    );
}

export default Header;