'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /*------------------
        Preloader
    --------------------*/
    window.addEventListener('load', function () {
        var loader = document.querySelector(".loader");
        var preloader = document.querySelector("#preloder");
        loader.style.display = "none";
        preloader.style.transitionDelay = "0.2s";
        preloader.style.opacity = "0";

        /*------------------
            Gallery filter
        --------------------*/
        var featuredControls = document.querySelectorAll('.featured__controls li');
        featuredControls.forEach(function (control) {
            control.addEventListener('click', function () {
                featuredControls.forEach(function (c) {
                    c.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        if (document.querySelector('.featured__filter')) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    var setBgElements = document.querySelectorAll('.set-bg');
    setBgElements.forEach(function (element) {
        var bg = element.getAttribute('data-setbg');
        element.style.backgroundImage = 'url(' + bg + ')';
    });

    // Hamburger Menu
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

    /*------------------
		Navigation
	--------------------*/
    if (document.querySelector(".mobile-menu")) {
        var mobileMenu = document.querySelector(".mobile-menu");
        mobileMenu.addEventListener('change', function () {
            var value = mobileMenu.value;
            if (value) {
                var selectedLink = document.querySelector(value);
                if (selectedLink) {
                    selectedLink.click();
                }
            }
        });
    }

    /*-----------------------
        Categories Slider
    ------------------------*/
    var categoriesSlider = document.querySelector(".categories__slider");
    if (categoriesSlider) {
        categoriesSlider.classList.add('owl-carousel');
        new OwlCarousel(categoriesSlider, {
            loop: true,
            margin: 0,
            items: 4,
            dots: false,
            nav: true,
            navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                }
            }
        });
    }

    var heroCategoriesAll = document.querySelector('.hero__categories__all');
    var heroCategoriesUl = document.querySelector('.hero__categories ul');

    if (heroCategoriesAll && heroCategoriesUl) {
        heroCategoriesAll.addEventListener('click', function () {
            if (heroCategoriesUl.style.display === 'none' || heroCategoriesUl.style.display === '') {
                heroCategoriesUl.style.display = 'block';
            } else {
                heroCategoriesUl.style.display = 'none';
            }
        });
    }

    /*--------------------------
        Latest Product Slider
    ----------------------------*/
    var latestProductSlider = document.querySelector(".latest-product__slider");
    if (latestProductSlider) {
        latestProductSlider.classList.add('owl-carousel');
        new OwlCarousel(latestProductSlider, {
            loop: true,
            margin: 0,
            items: 1,
            dots: false,
            nav: true,
            navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true
        });
    }

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    var productDiscountSlider = document.querySelector(".product__discount__slider");
    if (productDiscountSlider) {
        productDiscountSlider.classList.add('owl-carousel');
        new OwlCarousel(productDiscountSlider, {
            loop: true,
            margin: 0,
            items: 3,
            dots: true,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
            responsive: {
                320: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                }
            }
        });
    }

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    var productDetailsPicSlider = document.querySelector(".product__details__pic__slider");
    if (productDetailsPicSlider) {
        productDetailsPicSlider.classList.add('owl-carousel');
        new OwlCarousel(productDetailsPicSlider, {
            loop: true,
            margin: 20,
            items: 4,
            dots: true,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true
        });
    }

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = document.querySelector(".price-range");
    var minamount = document.querySelector("#minamount");
    var maxamount = document.querySelector("#maxamount");
    var minPrice = parseInt(rangeSlider.getAttribute('data-min'));
    var maxPrice = parseInt(rangeSlider.getAttribute('data-max'));

    if (rangeSlider && minamount && maxamount) {
        noUiSlider.create(rangeSlider, {
            start: [minPrice, maxPrice],
            connect: true,
            range: {
                'min': minPrice,
                'max': maxPrice
            }
        });

        rangeSlider.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            if (handle) {
                maxamount.value = '$' + Math.round(value);
            } else {
                minamount.value = '$' + Math.round(value);
            }
        });
    }

    /*--------------------------
        Custom Select
    ----------------------------*/
    if (document.querySelector("select")) {
        new NiceSelect("select");
    }

    /*------------------
		Single Product
	--------------------*/
    var productDetailsPicSliderImgs = document.querySelectorAll('.product__details__pic__slider img');

    productDetailsPicSliderImgs.forEach(function (img) {
        img.addEventListener('click', function () {
            var imgurl = img.getAttribute('data-imgbigurl');
            var bigImg = document.querySelector('.product__details__pic__item--large').getAttribute('src');
            if (imgurl !== bigImg) {
                document.querySelector('.product__details__pic__item--large').setAttribute('src', imgurl);
            }
        });
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = document.querySelectorAll('.pro-qty');

    proQty.forEach(function (qty) {
        qty.insertAdjacentHTML('afterbegin', '<span class="dec qtybtn">-</span>');
        qty.insertAdjacentHTML('beforeend', '<span class="inc qtybtn">+</span>');

        qty.addEventListener('click', function (e) {
            var button = e.target;
            var input = qty.querySelector('input');
            var oldValue = parseFloat(input.value);
            var newVal = oldValue;

            if (button.classList.contains('inc')) {
                newVal = oldValue + 1;
            } else if (button.classList.contains('dec')) {
                newVal = oldValue > 0 ? oldValue - 1 : 0;
            }

            input.value = newVal;
        });
    });

});
