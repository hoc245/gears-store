$(document).ready(function() {
    getData();
    clearEle();
})
var cartItemCount;
var cartItemUrl;
if (localStorage.getItem('cartItemCount') == null) {
    cartItemCount = 0;
    localStorage.setItem('cartItemCount',cartItemCount);
} else {
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
    if (currentUrl.has('type')) {
        var top = $('#products-menu').offset().top - 280;
        $('html, body').scrollTop(top);
        for( var i = 0 ; i < menuFilter.length ; i++) {
            if (menuFilter[i].firstChild.innerHTML == currentUrl.get("type")) {
                menuFilter[i].classList.add('active');
            };
        }
        if (currentUrl.get('type') == "all") {
            menuFilter[0].classList.add('active');
            $('#products-title-filter').html(`All products`);
        } else {
            $('#products-title-filter').html(`${currentUrl.get("type")}`);
        }
        $('#products-title-filter').attr('href',`./products.html?type=${currentUrl.get("type")}`);
    } else {
        menuFilter[0].classList.add('active');
        $('#products-title-filter').attr('href',`./products.html?type=all`);
        $('#products-title-filter').html(`All products`);
    }
    var productsItem = $('.products-item');
    productsItem.click(function(){
        $(this).toggleClass('added');
        var itemUrlAdded = $(this).find('img').attr('src');
        console.log(itemUrlAdded);
        if ($(this).hasClass('added')) {
            cartItemCount += 1;
            if (cartItemUrl.indexOf(itemUrlAdded) == -1) {
                cartItemUrl.push(itemUrlAdded);
            }
        } else {
            cartItemCount -= 1;
            cartItemUrl.splice($.inArray(itemUrlAdded,cartItemUrl),1);
        }
        localStorage.setItem('cartItemCount',cartItemCount);
        localStorage.setItem('cartItemUrl',cartItemUrl.join(';'))
    })
    productsItem.each(function() {
        if (cartItemUrl.indexOf($(this).find('img').attr('src')) != -1) {
            $(this).addClass('added');
        } else {
            $(this).removeClass('added');
        }
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
})
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
/*****************************
******** 3D ANIMATION ********
******************************/
var container = $('.3d-animation');
var square = $('.square');

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
    let scale = image.attr('data-scale');
    image.css('transform',`rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(${scale},${scale})`);
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
/********************************
*********** Add Items ***********
*********************************/
var productsContainer = $('#products-menu');
var createEle = function(type,url,name,badge,des,prices) {
    var item = document.createElement('div');
    item.setAttribute('data-badge',badge);
    item.classList.add('products-item');
    item.classList.add('3d-animation');
    item.setAttribute('data-type',type);
    item.innerHTML = `
        <img data-scale="1" src="../assets/images/${type}/thumbnail/item-${url}.png" alt="${url}">
        <h1>${name}</h1>
        <div class="item-description">
            <span>${des}</span>
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
            if (productsType == "all") {
                for (var i = 0 ; i < data.length ; i++) {
                    dataHolderUrl = data[i].item.mainItem;
                    dataHolderName = data[i].item.name;
                    dataHolderDes = data[i].item.description;
                    dataHolderPrices = data[i].item.prices;
                    for (var j = 0; j < data[i].item.mainItem.length ; j ++) {
                        createEle(data[i].products,data[i].item.mainItem[j],data[i].item.name[j],data[i].item.badge[j],"test",data[i].item.prices[j]);
                    }
                }
            } else {
                for (var i = 0 ; i < data.length ; i++) {
                    if (data[i].products == productsType) {
                        for (var j = 0; j < data[i].item.mainItem.length ; j ++) {
                            createEle(data[i].products,data[i].item.mainItem[j],data[i].item.name[j],data[i].item.badge[j],"test",data[i].item.prices[j]);
                        }
                    }
                }
            }
        }
    })
}

/********************************
************ Products ***********
*********************************/
var menuFilter = $('#products-filter li');

