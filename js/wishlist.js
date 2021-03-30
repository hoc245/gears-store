$(document).ready(function() {
    // getData();
    // clearEle();
})
// Check localStorage
var itemQuantily;
var cartItemCount;
var cartItemUrl;
var cartItemName;
var cartItemDes;
var cartItemPrices;
var wishlistCount = $('.wishlist-count');
var wishlistIcon = $('.wishlist-icon');
if (localStorage.getItem('cartItemCount') == null || localStorage.getItem('cartItemCount') == "0") {
    cartItemCount = 0;
    wishlistCount.hide();
    wishlistIcon.removeClass('added');
    localStorage.setItem('cartItemCount',cartItemCount);
} else {
    wishlistCount.show();
    wishlistIcon.addClass('added');
    wishlistCount.html(localStorage.getItem('cartItemCount'));
    cartItemCount = parseInt(localStorage.getItem('cartItemCount'));
}
if (localStorage.getItem('cartItemUrl') == null) {
    cartItemUrl = [];
    localStorage.setItem('cartItemUrl',cartItemUrl);
} else {
    cartItemUrl = localStorage.getItem('cartItemUrl').split(';');
}
if (localStorage.getItem('cartItemName') == null) {
    cartItemName = [];
    localStorage.setItem('cartItemName',cartItemName);
} else {
    cartItemName = localStorage.getItem('cartItemName').split(';');
}
if (localStorage.getItem('cartItemDes') == null) {
    cartItemDes = [];
    localStorage.setItem('cartItemDes',cartItemDes);
} else {
    cartItemDes = localStorage.getItem('cartItemDes').split(';');
}
if (localStorage.getItem('cartItemPrices') == null) {
    cartItemPrices = [];
    localStorage.setItem('cartItemPrices',cartItemPrices);
} else {
    cartItemPrices = localStorage.getItem('cartItemPrices').split(';');
}
if (localStorage.getItem('itemQuantily') == null) {
    itemQuantily = [];
    localStorage.setItem('itemQuantily',itemQuantily);
} else {
    itemQuantily = localStorage.getItem('itemQuantily').split(';');
}
window.onload = function() {
    addCartItem();
}
/*******************
******* NAV ********
*******************/
var hamberger = $('#hamberger');
var navOverlay = $('#nav-overlay');
var navBar = $('#nav-bar');
var navMain = $('#nav');
hamberger.click(() => {
    var x = window.matchMedia("(max-width: 768px)")
    if (x.matches) {
        hamberger.toggleClass('active');
        navOverlay.toggleClass('active');
        if (navOverlay.hasClass('active')) {
            navBar.addClass('active');
            $('.nav-bar-item').addClass('mobileActive');
            $('.nav-bar-social-item').addClass('mobileActive');
        } else {
            navBar.removeClass('active');
            $('.nav-bar-item').removeClass('mobileActive');
            $('.nav-bar-social-item').removeClass('mobileActive');
        }
    }
})
window.addEventListener('scroll',function(){
    if (window.pageYOffset > 0) {
        navMain.addClass('scroll');
    } else {
        navMain.removeClass('scroll');
    }
    if (window.pageYOffset < 500) {
        $('.go-top').hide();
    } else {
        $('.go-top').show();
    }
})
$('.go-top').click(function(){
    $('html, body').animate({
        scrollTop: 0,
    },800)
}).hide();
/*****************************
******* SMOOTH SCROLL ********
******************************/
var footerBarAnchor = $('#footer-menu ul li a');

footerBarAnchor.click(function(){
    if(this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800,function(){
            window.location.hash = hash
        })
    }
})
/***********************
******* SECTION ********
***********************/
var sectionWrapper = $('section');
window.addEventListener('scroll',() => {
    var offsetY = window.pageYOffset;
    var innerHeight = window.innerHeight;
    sectionWrapper.each((index,ele) => {
        var idEle = ele.id.toUpperCase().split('-').join(' ');
        if((offsetY + innerHeight - 230) >= ele.offsetTop) {
            ele.classList.add('active');
            $('.nav-bar-item').removeClass('active');
            $(`.nav-bar-item a:contains("${idEle}")`).parent().addClass('active');
        } else if (ele.offsetHeight < offsetY + innerHeight) {
            ele.classList.remove('active');
        }
    })
})

/************************
******* Add Item ********
************************/
var  cartList = $('#cart-list');
var totalPrices = $('#total-prices');

var addCartItem = function() {
    var urlArray = cartItemUrl;
    var nameArray = cartItemName;
    var desArray = cartItemDes;
    var pricesArray = cartItemPrices;
    var quantily = itemQuantily;
    var total = 0;
    var HtmlString = "";
    if (urlArray[0] == "") {
        cartList.html(`
            <p class="notification">Looks like you have nothing in your shopping cart</p>
        `)
        totalPrices.html(`$${total}`);
    } else {
        for (var i = 0 ; i < urlArray.length; i ++) {
            HtmlString += `
            <div class="cart-item">
                <img src="${cartItemUrl[i]}" alt="">
                <div class="cart-item-content">
                    <h1>${nameArray[i]}</h1>
                    <h2>${desArray[i]}</h2>
                    <p><span class="prices">$${pricesArray[i]*0.2}</span><span class="prices-sales">$${pricesArray[i]}</span> - <span>Quantily: </span><span class="itemQuantily">${quantily[i].substr(quantily[i].indexOf('quantily')).substr(9)}</span></p>
                </div>
                <div class="remove-item">
                <span></span>
                <span></span>
            </div>
            </div>
            <hr>
            `
            total += parseInt(pricesArray[i])*parseInt(quantily[i].substr(quantily[i].indexOf('quantily')).substr(9));
        }
        cartList.html(HtmlString);
        totalPrices.html(`$${total}`);
    }
    var removeBtn = $('.remove-item');
    removeBtn.each(function(index){
        $(this).click(function() {
            removeItem($(this));
            itemQuantily.splice($.inArray(itemQuantily[index],itemQuantily),1);
            localStorage.setItem('itemQuantily',itemQuantily.join(";"));
        })
    })
}

/***************************
******* Remove Item ********
***************************/

var removeItem = function(ele) {
    var itemUrlClicked = ele.prev('div').prev('img').attr('src');
    var itemNameClicked = ele.prev('.cart-item-content').find('h1').html();
    var itemDesClicked = ele.prev('.cart-item-content').find('h2').html();
    var itemPricesClicked = ele.prev('div').find('p').find('span')[1].innerHTML.substring(1);
    cartItemCount -= 1;
    cartItemUrl.splice($.inArray(itemUrlClicked,cartItemUrl),1);
    cartItemName.splice($.inArray(itemNameClicked,cartItemName),1);
    cartItemDes.splice($.inArray(itemDesClicked,cartItemDes),1);
    cartItemPrices.splice($.inArray(itemPricesClicked,cartItemPrices),1);
    localStorage.setItem('cartItemCount',cartItemCount);
    localStorage.setItem('cartItemName',cartItemName.join(';'));
    localStorage.setItem('cartItemDes',cartItemDes.join(';'));
    localStorage.setItem('cartItemPrices',cartItemPrices.join(';'));
    localStorage.setItem('cartItemUrl',cartItemUrl.join(';'))
    wishlistCount.html(cartItemCount);
    if (wishlistCount.html() == "0") {
        wishlistCount.hide();
        wishlistIcon.removeClass('added');
    } else {
        wishlistCount.show();
        wishlistIcon.addClass('added');
    }
    addCartItem();
    if ($('.cart-item').length == 0) {
        cartList.html(`
            <p class="notification">Looks like you have nothing in your shopping cart</p>
        `)
    }
}