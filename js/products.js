$(document).ready(function() {
    getData();
    clearEle();
})
var cartItemCount;
var cartItemUrl;
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
window.onload = function() {
    let currentUrl = new URLSearchParams(window.location.search);
    // Scroll to products section when load.
    $('.products-item').fadeOut(0);
    if (currentUrl.has('type')) {
        var top = $('#products-menu').offset().top - 280;
        $('html, body').scrollTop(top);
        for( var i = 0 ; i < menuFilter.length ; i++) {
            if (menuFilter[i].innerHTML == currentUrl.get("type")) {
                menuFilter[i].classList.add('active');
            };
        }
        if (currentUrl.get('type') == "all") {
            menuFilter[0].classList.add('active');
            $('#products-title-filter').html(`All products`);
            filterItem('all');
        } else {
            $('#products-title-filter').html(`${currentUrl.get("type")}`);
            $(`.products-item[data-type="${currentUrl.get("type")}"]`).fadeIn();
        }
        $('#products-title-filter').attr('href',`./products.html?type=${currentUrl.get("type")}`);
    } else {
        menuFilter[0].classList.add('active');
        $('#products-title-filter').attr('href',`./products.html?type=all`);
        $('#products-title-filter').html(`All products`);
        filterItem('all');
    }
    // Add to cart icon
    var productsItem = $('.products-item');
    var productsItemBtn = $('.products-item .item-description .btn');
    productsItemBtn.click(function() {
        $(this).toggleClass('added');
        var itemUrlAdded = $(this).parent('div').parent('div').find('img').attr('src');
        if ($(this).hasClass('added')) {
            cartItemCount += 1;
            $(this).find('span').find('a').html('Item added!');
            $(this).parent('div').parent('div').addClass('added');
            if (cartItemUrl.indexOf(itemUrlAdded) == -1) {
                cartItemUrl.push(itemUrlAdded);
            }
        } else {
            $(this).find('span').find('a').html('Add to cart');
            $(this).parent('div').parent('div').removeClass('added');
            cartItemCount -= 1;
            cartItemUrl.splice($.inArray(itemUrlAdded,cartItemUrl),1);
        }
        localStorage.setItem('cartItemCount',cartItemCount);
        wishlistCount.html(cartItemCount);
        if (wishlistCount.html() == "0") {
            wishlistCount.hide();
            wishlistIcon.removeClass('added');
        } else {
            wishlistCount.show();
            wishlistIcon.addClass('added');
        }
        localStorage.setItem('cartItemUrl',cartItemUrl.join(';'))
    })
    // Re-add on load
    productsItem.each(function() {
        if (cartItemUrl.indexOf($(this).find('img').attr('src')) != -1) {
            $(this).addClass('added');
            $(this).find('div').find('button').find('span').find('a').html('Item added!');
            $(this).find('div').find('button').addClass('added');
        } else {
            $(this).removeClass('added');
            $(this).find('div').find('button').find('span').find('a').html('Add to cart');
            $(this).find('div').find('button').removeClass('added');
        }
    })
    /*****************************
    ******** 3D ANIMATION ********
    ******************************/
    var container = $('.3d-animation');
    container.mousemove(function(e) {
        let innerWidth = $(this).width();
        let innerHeight = $(this).height();
        let leftAxis = $(this).offset().left;
        let rightAxis = window.innerWidth - leftAxis - innerWidth;
        let topAxis = $(this).offset().top;
        let bottomAxis = window.innerHeight - topAxis - innerHeight;
        let xAxis = (window.innerWidth - rightAxis - e.pageX) / 20;
        let yAxis = (window.innerHeight - bottomAxis - e.pageY) / 20;
        let image = $(this).find('img');
        image.css('transform',`rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.2,1.2)`);
    })
    container.mouseenter(function(){
        let image = $(this).find('img');
        image.removeClass('transition');
    })
    container.mouseleave(function(){
        let image = $(this).find('img');
        image.addClass('transition');
        let scale = image.attr('data-scale');
        image.css('transform',`rotateY(0deg) rotateX(0deg) scale(${scale},${scale})`);
    })
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
var navBarAnchor = $('.nav-bar-item a');
var footerBarAnchor = $('#footer-menu ul li a');
navBarAnchor.click(function(){
    if (hamberger.hasClass('active')) {
        hamberger.removeClass('active');
        navOverlay.removeClass('active');
        navBar.removeClass('active');
        $('.nav-bar-item').removeClass('mobileActive');
        $('.nav-bar-social-item').removeClass('mobileActive');
    }
    navBar
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

/********************************
*********** Add Items ***********
*********************************/
var productsContainer = $('#products-menu');
var createEle = function(id,type,url,name,badge,des,prices) {
    var item = document.createElement('div');
    item.setAttribute('data-badge',badge);
    item.classList.add('products-item');
    item.classList.add('3d-animation');
    item.setAttribute('data-type',type);
    item.setAttribute('data-prices',prices);
    item.setAttribute('data-prices',prices);
    item.innerHTML = `
        <a class="image-link" href="./detail.html?type=${type}&id=${id}">
            <img data-scale="1" src="../assets/images/${type}/thumbnail/item-${url}.png" alt="${url}">
        </a>
        <h1>${name}</h1>
        <div class="item-description">
        <button class="btn active" id="hero-btn"><span><a>Add to cart</a></span></button>
            <span>$${prices}</span>
        </div>
    `;
    productsContainer.append(item);
}
var clearEle = function() {
    var item = $('.products-item');
    item.remove();
}
/********************************
*********** AJAX JSON ***********
*********************************/
var dataHolderUrl;
var dataHolderName;
var dataHolderDes;
var dataHolderPrices;
let searchParams = new URLSearchParams(window.location.search);
let productsType = searchParams.has('type') == true ? searchParams.get('type') : 'all';
var getData = function() {
    var url = "../json/data.json";
    $.ajax({
        url : url,
        success : function(data) {
            for (var i = 0 ; i < data.length ; i++) {
                dataHolderUrl = data[i].item.mainItem;
                dataHolderName = data[i].item.name;
                dataHolderDes = data[i].item.description;
                dataHolderPrices = data[i].item.prices;
                for (var j = 0; j < data[i].item.mainItem.length ; j ++) {
                    createEle(data[i].item.mainItem[j].substr(0,2),data[i].products,data[i].item.mainItem[j],data[i].item.name[j],data[i].item.badge[j],"test",data[i].item.prices[j]); 
                }
            }
        }
    })
}

/********************************
************ Products ***********
*********************************/
var menuFilter = $('#products-filter li');

menuFilter.click(function() {
    var type = $(this).html();
    menuFilter.removeClass('active');
    $(this).addClass('active');
    filterItem(type);
})
// Filter Function
var filterItem = function(type) {
    var item = $('.products-item');
    item.fadeOut(300);
    var itemMatched = $(`.products-item[data-type="${type}"]`);
    setTimeout(function(){
        if (type == "all" || type == "All products" || type == "all produsts") {
            item.fadeIn(500);
        } else {
            itemMatched.fadeIn(300);
        }
    },400);
}
// Sort Function
var softEle = function(type) {
    var item = productsContainer.find('.products-item[style=""]');
    item.fadeOut(300);
    setTimeout(() => {
        item.sort(function(a,b) {
            if (type == "Increase") {
                return +$(a).data('prices') - +$(b).data('prices');
            } else {
                return +$(b).data('prices') - +$(a).data('prices');
            }
        }).appendTo(productsContainer);
    },300);
    setTimeout(() => {
        item.fadeIn(300)
    }, 400);;
}
var productsSort = $('#products-sort li');
productsSort.click(function() {
    var type = $(this).html();
    productsSort.removeClass('active');
    $(this).addClass('active');
    softEle(type);
})

var productsFilter = $('#products-filter');
var productsFilterBtn = $('#products-hamburger');

productsFilterBtn.click(function() {
    $(this).toggleClass('active');
    productsFilter.toggleClass('expanded');
})
