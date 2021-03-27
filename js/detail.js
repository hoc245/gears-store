$(document).ready(function() {
    getData();
    clearEle();
    $('#detail-content').fadeOut(0);
})
var cartItemCount;
var cartItemUrl;
var itemQuantily;
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
if (localStorage.getItem('itemQuantily') == null || localStorage.getItem('itemQuantily') == "0") {
    itemQuantily = [];
    localStorage.setItem('itemQuantily',itemQuantily);
} else {
    itemQuantily = localStorage.getItem('itemQuantily').split(';');
}
var checkCurrentItem ="";
window.onload = function() {
    checkCurrentItem = `../assets/images/${productsType}/thumbnail/item-${productsID}.01.png`;
    // Add main image url
    mainImage.attr('src',`../assets/images/${productsType}/item-${productsID}.01.png`);
    // Add sub image url
    for (var i = 0 ; i < dataHolderSubUrl.length ; i++) {
        if (dataHolderSubUrl[i].substr(0,2) == productsID) {
            if (subImageIndex <= 3) {
                subImage[subImageIndex].setAttribute('src',`../assets/images/${productsType}/thumbnail/item-${dataHolderSubUrl[i]}.png`);
                subImageIndex++;
            }
        }
        if (i == (dataHolderSubUrl.length - 1)) {
            subImage.each(function(){
                if ($(this).attr('src') == "") {
                    $(this).fadeOut(0);
                } else {
                    $(this).fadeIn();
                }
            })
        }
    }
    // Hover on sub image
    var mainImageUrl = mainImage.attr('src')
    subImage.mouseenter(function() {
        changeImage(mainImage,$(this).attr('src').replace("thumbnail/",""));
    })
    // Get index of main item
    var itemNameIndex = parseInt(productsID.substr(1,1));
    // Add title
    $('#products-title-filter').html(dataHolderName[itemNameIndex-1]);
    // Add item name
    $('#detail-main-text .detail-main-text-title').html(dataHolderName[itemNameIndex-1]);
    // Add item sub title
    $('#detail-main-text-description').html(dataHolderDes[itemNameIndex-1].split('<br>')[0]);
    // Add item des
    $('.detail-main-description').each(function(index){
        $(this).find('p').html(dataHolderDes[itemNameIndex-1].split('<br>')[index]);
    })
    // Add item prices
    $('#prices p').html(`$${parseInt(dataHolderPrices[itemNameIndex-1])*1.5}`);
    // Add item prices sales off
    $('#prices h1').html(`$${parseInt(dataHolderPrices[itemNameIndex-1])}`);
    // Add to cart icon
    var similarItem = $('.similar-item');
    var similarItemBtn = $('.similar-item .item-description .btn');
    similarItemBtn.click(function() {
        $(this).toggleClass('added');
        var itemUrlAdded = $(this).parent('div').parent('div').find('img').attr('src');
        if ($(this).hasClass('added')) {
            cartItemCount += 1;
            $(this).find('span').find('a').html('Item added!');
            $(this).parent('div').parent('div').addClass('added');
            if (cartItemUrl.indexOf(itemUrlAdded) == -1) {
                if (cartItemUrl[0] != "") {
                    cartItemUrl.push(itemUrlAdded);
                } else {
                    cartItemUrl[0] = itemUrlAdded;
                }
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
    // Add quantily to item on load
    setQuantily();
    // Re-add on load
    similarItem.each(function() {
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
    if (cartItemUrl.indexOf(checkCurrentItem) != -1) {
        addToCart.addClass('active');
        addToCart.find('span').find('a').html('Added!');
        setTimeout(() => {
            addToCart.find('span').find('a').html('Check my cart');
            addToCart.find('span').find('a').attr('href','./products/cart.html');
        },2000);
    } else {
        addToCart.find('span').find('a').html('Add to cart');
        addToCart.find('span').find('a').removeAttr('href');
    }
    $('#detail-content').fadeIn(500);
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
var mainImage = $('#detail-main-image');
var subImage = $('.detail-sub-image');
var subImageIndex = 0;

var similarContainer = $('#similar-menu');
var createEle = function(id,type,url,name,badge,prices) {
    var item = document.createElement('div');
    item.setAttribute('data-badge',badge);
    item.classList.add('similar-item');
    item.classList.add('3d-animation');
    item.setAttribute('data-type',type);
    item.setAttribute('data-prices',prices);
    item.setAttribute('data-id',id);
    item.innerHTML = `
        <a href="./detail.html?type=${type}&id=${id}">
            <img data-scale="1" src="../assets/images/${type}/thumbnail/item-${url}.png" alt="${url}">
        </a>
        <h1>${name}</h1>
        <div class="item-description">
        <button class="btn active" id="hero-btn"><span><a>Add to cart</a></span></button>
            <span>$${prices}</span>
        </div>
    `;
    similarContainer.append(item);
}
var clearEle = function() {
    var item = $('.similar-item');
    item.remove();
}
/********************************
*********** AJAX JSON ***********
*********************************/
var dataHolderSubUrl;
var dataHolderUrl;
var dataHolderName;
var dataHolderDes;
var dataHolderPrices;
let searchParams = new URLSearchParams(window.location.search);
let productsType = searchParams.get('type');
let productsID = searchParams.get('id');
var getData = function() {
    var url = "../json/data.json";
    $.ajax({
        url : url,
        success : function(data) {
            for (var i = 0 ; i < data.length ; i++) {
                if (data[i].products == productsType) {
                    dataHolderName = data[i].item.name;
                    dataHolderUrl = data[i].item.mainItem;
                    dataHolderSubUrl = data[i].item.subItem.split(',');
                    dataHolderDes = data[i].item.description;
                    dataHolderPrices = data[i].item.prices;
                    for (var j = 0; j < data[i].item.mainItem.length ; j ++) {
                        if (data[i].item.mainItem[j].substr(0,2) != productsID) {
                            createEle(data[i].item.mainItem[j].substr(0,2),data[i].products,data[i].item.mainItem[j],data[i].item.name[j],data[i].item.badge[j],data[i].item.prices[j]);
                        }
                    }
                }
            }
        }
    })
}
/****************************************
*********** CHANGE MAIN IMAGE ***********
*****************************************/

var changeImage = function(ele,url) {
    ele.attr('src',url);
}

/*****************************************
*********** Add to cart Button ***********
******************************************/
var addToCart = $('.btn#add-to-cart');

addToCart.click((event) => {
    var element = $(event.target).parent().parent();
    element.toggleClass('active');
    if (element.hasClass('active')) {
        element.find('span').find('a').html('Added!');
        setTimeout(() => {
            element.find('span').find('a').html('Check my cart');
            element.find('span').find('a').attr('href','./products/cart.html');
        },2000);
        if (cartItemUrl[0] != "") {
            cartItemUrl.push(checkCurrentItem);
        } else {
            cartItemUrl[0] = checkCurrentItem;
        }
        cartItemCount += 1;
    } else {
        element.find('span').find('a').html('Add to cart');
        element.find('span').find('a').removeAttr('href');
        cartItemCount -= 1;
        cartItemUrl.splice($.inArray(checkCurrentItem,cartItemUrl),1);
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

/************************************
*********** Item quantily ***********
*************************************/

var inputNumber = $('.item-count');
var itemDecrease = $('.item-count-btn.decrease');
var itemIncrease = $('.item-count-btn.increase');

inputNumber.keypress((evt) => {
    if (evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    } else {
        inputNumber.keyup(() => {
            inputNumber.attr('value',inputNumber.val());
            changeItemQuantily(inputNumber.val());
        })
    }
})

itemDecrease.click(() => {
    var value = parseInt(inputNumber.val());
    if (value > 1) {
        inputNumber.attr('value',value-1);
        inputNumber.val(value-1);
        changeItemQuantily(inputNumber.val());
    }
})
itemIncrease.click(() => {
    var value = parseInt(inputNumber.val());
    inputNumber.attr('value',value+1);
    inputNumber.val(value+1);
    changeItemQuantily(inputNumber.val());
})
// Change itemQuantily value

var changeItemQuantily = function(val) {
    var currentType = productsType;
    var currentId = productsID;
    var checkStr = `type=${currentType}&id=${currentId}`;
    var check = false;
    var position;
    for (var i = 0 ; i < itemQuantily.length; i ++) {
        if ( itemQuantily[i].indexOf(checkStr) != -1) {
            check = true;
            position = i;
            break;
        } else {
            continue;
        }
    }
    if (check == false) {
        if (itemQuantily[0] == [""]) {
            itemQuantily[0] = `type=${currentType}&id=${currentId}&quantily=${val}`;
        } else {
            itemQuantily.push(`type=${currentType}&id=${currentId}&quantily=${val}`);
        }
    } else {
        itemQuantily[position] = `type=${currentType}&id=${currentId}&quantily=${val}`;
    }
    localStorage.setItem('itemQuantily',itemQuantily.join(';'));
}

// Set current quantily

var setQuantily = function() {
    var currentType = productsType;
    var currentId = productsID;
    var checkStr = `type=${currentType}&id=${currentId}`;
    var check = false;
    var position;
    for (var i = 0 ; i < itemQuantily.length; i ++) {
        if ( itemQuantily[i].indexOf(checkStr) != -1) {
            check = true;
            position = i;
            break;
        } else {
            continue;
        }
    }
    if (check) {
        inputNumber.val(itemQuantily[position].substr(-1,1))
    };
}