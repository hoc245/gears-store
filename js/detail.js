$(document).ready(function() {
    var preload = $('#preload');
    preload.addClass('active');
    getData();
    clearEle();
    $('#detail-content').fadeOut(0);
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
    itemQuantily = [""];
    localStorage.setItem('itemQuantily',itemQuantily);
} else {
    itemQuantily = localStorage.getItem('itemQuantily').split(';');
}
var checkCurrentItem ="";
window.onload = function() {
    // Add quantily to item on load
    setQuantily();
    checkCurrentItem = `../assets/images/${productsType}/thumbnail/item-${productsID}.01.png`;
    // Add main image url
    mainImage.attr('src',`../assets/images/${productsType}/item-${productsID}.01.png`);
    // Add sub image url
    addSubImage(productsID);
    // Hover on sub image
    // var subImageItem = $('.detauil-sub-image');
    // subImageItem.mouseenter(function() {
    //     changeImage(mainImage,$(this).attr('src').replace("thumbnail/",""));
    // })
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
    // Add color
    addColor(productsID);
    // Add item prices sales off
    $('#prices h1').html(`$${parseInt(dataHolderPrices[itemNameIndex-1])}`);
    // Add to cart icon
    var similarItem = $('.similar-item');
    var similarItemBtn = $('.similar-item .item-description .btn');
    similarItemBtn.click(function() {
        $(this).toggleClass('added');
        var itemUrlAdded = $(this).parent('div').parent('div').find('img').attr('src');
        var itemNameAdded = $(this).parent('div').parent('div').find('h1').html();
        var itemDesAdded = $(this).parent('div').attr('data-description');
        var itemPricesAdded = $(this).next('span').html().substr(1,$(this).next('span').html().length -1);
        var checkUrl = $(this).parent('div').parent('div').find('a')[0].getAttribute('href');
        var check = checkUrl.substr(checkUrl.indexOf(`type`),checkUrl.length-14);
        if ($(this).hasClass('added')) {
            cartItemCount += 1;
            $(this).find('span').find('a').html('Item added!');
            $(this).parent('div').parent('div').addClass('added');
            if (cartItemUrl.indexOf(itemUrlAdded) == -1) {
                if (cartItemUrl[0] != "") {
                    cartItemUrl.push(itemUrlAdded);
                    cartItemName.push(itemNameAdded);
                    cartItemDes.push(itemDesAdded);
                    cartItemPrices.push(itemPricesAdded);
                } else {
                    cartItemUrl[0] = itemUrlAdded;
                    cartItemName[0] = itemNameAdded;
                    cartItemDes[0] = itemDesAdded;
                    cartItemPrices[0] = itemPricesAdded;
                }
            }
            var itemQuantilyHas;
            for (var i = 0 ; i < itemQuantily.length ; i++ ) {
                if (itemQuantily[i].indexOf(check) == -1) {
                    itemQuantilyHas = false;
                    continue;
                } else {
                    itemQuantilyHas = true;
                    var value = itemQuantily[i].substr(itemQuantily[i].indexOf(`quantily`)).substr(9);
                    itemQuantily[i] = check + `&quantily=${parseInt(value) + 1}`;
                }
            }
            if (itemQuantilyHas == false) {
                if (itemQuantily[0] == ""){
                    itemQuantily[0] = check + `&quantily=1`;
                } else {
                    itemQuantily.push(check + `&quantily=1`);
                }
                localStorage.setItem(`itemQuantily`,itemQuantily);
            }
        } else {
            for (var i = 0 ; i < itemQuantily.length ; i++ ) {
                if (itemQuantily[i].indexOf(check) == -1) {
                    continue;
                } else {
                    if (itemQuantily.length == 1) {
                        itemQuantily[0] = "";   
                    } else {
                        itemQuantily.splice(i,1);
                    }
                }
            }
            if (itemQuantilyHas == false) {
                itemQuantily.push(check + `&quantily=1`);
            }
            $(this).find('span').find('a').html('Add to cart');
            $(this).parent('div').parent('div').removeClass('added');
            cartItemCount -= 1;
            cartItemUrl.splice($.inArray(itemUrlAdded,cartItemUrl),1);
            cartItemName.splice($.inArray(itemNameAdded,cartItemName),1);
            cartItemDes.splice($.inArray(itemDesAdded,cartItemDes),1);
            cartItemPrices.splice($.inArray(itemPricesAdded,cartItemPrices),1);
        }
        localStorage.setItem('cartItemCount',cartItemCount);
        localStorage.setItem('cartItemName',cartItemName.join(';'));
        localStorage.setItem('cartItemDes',cartItemDes.join(';'));
        localStorage.setItem('cartItemPrices',cartItemPrices.join(';'));
        localStorage.setItem(`itemQuantily`,itemQuantily.join(";"));
        wishlistCount.html(cartItemCount);
        if (wishlistCount.html() == "0") {
            wishlistCount.hide();
            wishlistIcon.removeClass('added');
            localStorage.clear();
        } else {
            wishlistCount.show();
            wishlistIcon.addClass('added');
        }
        localStorage.setItem('cartItemUrl',cartItemUrl.join(';'))
        if (similarItemBtn.hasClass('active') == false) {
            localStorage.clear();
        }
    })
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
var subImage = $('#detail-sub-image');

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
var dataHolderColor;
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
                    dataHolderColor = data[i].item.color;
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

/************************************
*********** Add sub Image ***********
*************************************/

var addSubImage = function(id) {
    var idSubImageArray = [];
    var imageHtml = "";
    for (var i = 0 ; i < dataHolderSubUrl.length ; i++) {
        if (dataHolderSubUrl[i].substr(0,2) == id) {
            idSubImageArray.push(dataHolderSubUrl[i]);
        }
    }
    for (var j = 0 ; j < idSubImageArray.length ; j++) {
        imageHtml+=`<img class="detail-sub-image" src="../assets/images/${productsType}/thumbnail/item-${idSubImageArray[j]}.png" alt="${productsType}.${id}">`
    }
    subImage.html(`
        ${imageHtml}
    `)
    subImage.attr('style',`grid-template-columns: repeat(${idSubImageArray.length > 8 ? 8 : idSubImageArray.length},auto);gap: 5px`);
    var subImageItem = $('.detail-sub-image');
    subImageItem.mouseenter(function() {
        subImageItem.removeClass('active');
        changeImage(mainImage,$(this).attr('src').replace("thumbnail/",""));
        $(this).addClass('active');
    })
}
/****************************************
*************** Add Color ***************
*****************************************/
var color =$('#color');

var addColor = function(id) {
    var idColorArray = [];
    var colorHtml = "";
    if (dataHolderColor == null) {
        return false;
    } else {
        for (var i = 0 ; i < dataHolderColor.length ; i++) {
            if (dataHolderColor[i].substr(0,2) == productsID) {
                idColorArray.push(dataHolderColor[i].substr(3,dataHolderColor[i].length - 3));
            }
        }
        for (var j = 0 ; j < idColorArray.length; j ++) {
            if (idColorArray[j] == "#FFFFFF" || idColorArray[j] == "#ffffff") {
                colorHtml+=`<div class="color" data-color="${idColorArray[j]}" style="background-color: ${idColorArray[j]};border: 1px solid rgba(0,0,0,0.2)"></div>`;
            } else {
                colorHtml+=`<div class="color" data-color="${idColorArray[j]}" style="background-color: ${idColorArray[j]}"></div>`;
            }
        }
        color.html(colorHtml);
    }
}

/**************************************
*********** Wishlist Button ***********
***************************************/
var wishListBtn = $('#check-out');

wishListBtn.click(function() {
    if ($('#add-to-cart').hasClass('active') == false) {
        var element = $(event.target).parent().parent();
        var itemQuantilyHas;
        var currentType = productsType;
        var currentId = productsID;
        var check = `type=${currentType}&id=${currentId}`;
        var val = $('.item-count').val();
        var itemNameAdded = $('.detail-main-text-title').html();
        var itemDesAdded = $('#detail-main-text-description').html();
        var itemPricesAdded = $('#prices h1').html().substr(1);
        for (var i = 0 ; i < itemQuantily.length ; i++ ) {
            if (itemQuantily[i].indexOf(check) == -1) {
                continue;
            } else {
                if (itemQuantily.length == 1) {
                    itemQuantily[0] = "";   
                } else {
                    itemQuantily.splice(i,1);
                }
            }
        }
        element.find('span').find('a').html('Add to cart');
        element.find('span').find('a').removeAttr('href');
        cartItemCount -= 1;
        cartItemUrl.splice($.inArray(checkCurrentItem,cartItemUrl),1);
        localStorage.setItem('cartItemCount',cartItemCount);
        wishlistCount.html(cartItemCount);
        if (wishlistCount.html() == "0") {
            wishlistCount.hide();
            wishlistIcon.removeClass('added');
        } else {
            wishlistCount.show();
            wishlistIcon.addClass('added');
        }
        if (cartItemName.indexOf(itemNameAdded) == -1) {
            if (cartItemName[0] == "") {
                cartItemName[0] = itemNameAdded;
                cartItemDes[0] = itemDesAdded;
                cartItemPrices[0] = itemPricesAdded;
            } else {
                cartItemName.push(itemNameAdded);
                cartItemDes.push(itemDesAdded);
                cartItemPrices.push(itemPricesAdded);
            }  
        }
        localStorage.setItem('cartItemCount',cartItemCount);
        if (cartItemName.length >= 2) {
            localStorage.setItem('cartItemName',cartItemName.join(';'));
            localStorage.setItem('cartItemDes',cartItemDes.join(';'));
            localStorage.setItem('cartItemPrices',cartItemPrices.join(';'));
            localStorage.setItem('cartItemUrl',cartItemUrl.join(';'));
        } else {
            localStorage.setItem('cartItemName',cartItemName);
            localStorage.setItem('cartItemDes',cartItemDes);
            localStorage.setItem('cartItemPrices',cartItemPrices);
            localStorage.setItem('cartItemUrl',cartItemUrl);
        }
        localStorage.setItem(`itemQuantily`,itemQuantily.join(";"));
        }
})

/*****************************************
*********** Add to cart Button ***********
******************************************/
var addToCart = $('.btn#add-to-cart');

addToCart.click((event) => {
    var element = $(event.target).parent().parent();
    element.toggleClass('active');
    var itemQuantilyHas;
    var currentType = productsType;
    var currentId = productsID;
    var check = `type=${currentType}&id=${currentId}`;
    var val = $('.item-count').val();
    var itemNameAdded = $('.detail-main-text-title').html();
    var itemDesAdded = $('#detail-main-text-description').html();
    var itemPricesAdded = $('#prices h1').html().substr(1);
    if (element.hasClass('active')) {
        element.find('span').find('a').html('Added!');
        if (cartItemUrl[0] != "") {
            cartItemUrl.push(checkCurrentItem);
        } else {
            cartItemUrl[0] = checkCurrentItem;
        }
        cartItemCount += 1;
        for (var i = 0 ; i < itemQuantily.length ; i++ ) {
            if (itemQuantily[i].indexOf(check) == -1) {
                itemQuantilyHas = false;
                continue;
            } else {
                itemQuantilyHas = true;
                itemQuantily[i] = check + `&quantily=${val}`;
            }
        }
        if (itemQuantilyHas == false) {
            if (itemQuantily[0] == ""){
                itemQuantily[0] = check + `&quantily=${val}`;
            } else {
                itemQuantily.push(check + `&quantily=${val}`);
            }
        }
    } else {
        for (var i = 0 ; i < itemQuantily.length ; i++ ) {
            if (itemQuantily[i].indexOf(check) == -1) {
                continue;
            } else {
                if (itemQuantily.length == 1) {
                    itemQuantily[0] = "";   
                } else {
                    itemQuantily.splice(i,1);
                }
            }
        }
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
    if (cartItemName.indexOf(itemNameAdded) == -1) {
        if (cartItemName[0] == "") {
            cartItemName[0] = itemNameAdded;
            cartItemDes[0] = itemDesAdded;
            cartItemPrices[0] = itemPricesAdded;
        } else {
            cartItemName.push(itemNameAdded);
            cartItemDes.push(itemDesAdded);
            cartItemPrices.push(itemPricesAdded);
        }  
    }
    localStorage.setItem('cartItemCount',cartItemCount);
    if (cartItemName.length >= 2) {
        localStorage.setItem('cartItemName',cartItemName.join(';'));
        localStorage.setItem('cartItemDes',cartItemDes.join(';'));
        localStorage.setItem('cartItemPrices',cartItemPrices.join(';'));
        localStorage.setItem('cartItemUrl',cartItemUrl.join(';'));
    } else {
        localStorage.setItem('cartItemName',cartItemName);
        localStorage.setItem('cartItemDes',cartItemDes);
        localStorage.setItem('cartItemPrices',cartItemPrices);
        localStorage.setItem('cartItemUrl',cartItemUrl);
    }
    localStorage.setItem(`itemQuantily`,itemQuantily.join(";"));
})

/************************************
*********** Item quantily ***********
*************************************/

var inputNumber = $('.item-count');
var itemDecrease = $('.item-count-btn.decrease');
var itemIncrease = $('.item-count-btn.increase');

inputNumber.keypress((evt) => {
    if ($('#add-to-cart').hasClass('active')) {
        if (evt.which < 48 || evt.which > 57)
        {
            evt.preventDefault();
        } else {
            if ( evt.keyCode != 13) {
                inputNumber.keyup(() => {
                    inputNumber.attr('value',inputNumber.val());
                    changeItemQuantily(inputNumber.val());
                })
            }
        }
    }
})

itemDecrease.click(() => {
    var value = parseInt(inputNumber.val());
    if (value > 1) {
        inputNumber.attr('value',value-1);
        inputNumber.val(value-1);
    }
    if ($('#add-to-cart').hasClass('active')) {
        changeItemQuantily(inputNumber.val());
    }
})
itemIncrease.click(() => {
    var value = parseInt(inputNumber.val());
    inputNumber.attr('value',value+1);
    inputNumber.val(value+1);
    if ($('#add-to-cart').hasClass('active')) {
        changeItemQuantily(inputNumber.val());
    }
})
// Change itemQuantily value

var changeItemQuantily = function(val) {
    var currentType = productsType;
    var currentId = productsID;
    var check = `type=${currentType}&id=${currentId}`;
    var itemQuantilyHas;
    for (var i = 0 ; i < itemQuantily.length ; i++ ) {
        if (itemQuantily[i].indexOf(check) == -1) {
            itemQuantilyHas = false;
            continue;
        } else {
            itemQuantilyHas = true;
            itemQuantily[i] = check + `&quantily=${val}`;
        }
    }
    if (itemQuantilyHas == false) {
        if (itemQuantily[0] == ""){
            itemQuantily[0] = check + `&quantily=${val}`;
        } else {
            itemQuantily.push(check + `&quantily=${val}`);
        }
    }
    localStorage.setItem(`itemQuantily`,itemQuantily.join(";"));
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