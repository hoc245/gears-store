$(document).ready(function() {
    var preload = $('#preload');
    preload.addClass('active');
})
window.onload = function() {
    var preload = $('#preload');
    preload.fadeOut(500);
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
        },1000,function(){
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
        },1000,function(){
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
/************************************
******** NEW ARRIVAL SECTION ********
*************************************/
var currentImage = $('#new-arrival-image img');
var changeImage = function(src) {
    var url = [];
    for (var i = 0 ; i < src.length ; i++) {
        url.push('./assets/images/Wireless Headphone/thumbnail/item-' + src[i] + '.png');
    }
    var currentUrl = currentImage.attr('src');
    var index = url.indexOf(currentUrl);
    console.log(currentUrl);
    console.log(index);
    console.log(url);
    if ( index == (url.length - 1)) {
        currentImage.attr('src',url[0]);
    } else {
        currentImage.attr('src',url[index+1]);
    }
    setTimeout(function(){
        changeImage(dataHolderUrl)
    },5000);
}

/*********************************
******** PRODUCTS SECTION ********
**********************************/
var productsItem = $('.products-item');

var setThemeProducts = function() {
    var x = window.matchMedia("(max-width: 720px)")
    if (x.matches) {
        productsItem[1].classList.add('purple');
        productsItem[3].classList.add('purple');
    } else {
        productsItem[1].classList.add('purple');
        productsItem[2].classList.add('purple');
    }
}
setThemeProducts();

/********************************
*********** AJAX JSON ***********
*********************************/