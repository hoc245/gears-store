var itemQuantily;
var cartItemCount;
var cartItemUrl;
var cartItemName;
var cartItemDes;
var cartItemPrices;
var wishlistCount = $('.wishlist-count');
var wishlistIcon = $('.wishlist-icon');
var hamberger = $('#hamberger');
var navOverlay = $('#nav-overlay');
var navBar = $('#nav-bar');
var navMain = $('#nav');
var navBarAnchor = $('.nav-bar-item a');
var footerBarAnchor = $('#footer-menu ul li a');
var sectionWrapper = $('section');
var productsContainer = $('#products-menu');
var dataHolderUrl;
var dataHolderName;
var dataHolderDes;
var dataHolderPrices;
let searchParams = new URLSearchParams(window.location.search);
let productsType = searchParams.has('type') == true ? searchParams.get('type') : 'all';
var menuFilter = $('#products-filter li');
var productsSort = $('#products-sort li');
var productsFilter = $('#products-filter');
var productsFilterBtn = $('#products-hamburger');
if (localStorage.getItem('itemQuantily') == null) {
    itemQuantily = [""];
    localStorage.setItem('itemQuantily',itemQuantily);
} else {
    itemQuantily = localStorage.getItem('itemQuantily').split(';');
}
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
$(document).ready(function() {
    var preload = $('#preload');
    preload.addClass('active');
    getData();
    clearEle();
})
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
                    console.log(value);
                    itemQuantily[i] = check + `&quantily=${parseInt(value) + 1}`;
                }
            }
            if (itemQuantilyHas == false) {
                if (itemQuantily[0] == ""){
                    itemQuantily[0] = check + `&quantily=1`;
                } else {
                    itemQuantily.push(check + `&quantily=1`);
                }
                localStorage.setItem(`itemQuantily`,itemQuantily.join(";"));
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
        if (productsItemBtn.hasClass('active') == false) {
            localStorage.clear();
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
    var preload = $('#preload');
    preload.fadeOut(500);
}
/*******************
******* NAV ********
*******************/
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
        <div class="item-description" data-description="${des.substr(0,des.indexOf('<br>'))}">
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
                    createEle(data[i].item.mainItem[j].substr(0,2),data[i].products,data[i].item.mainItem[j],data[i].item.name[j],data[i].item.badge[j],data[i].item.description[j],data[i].item.prices[j]); 
                }
            }
        }
    })
}

/********************************
************ Products ***********
*********************************/

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
productsSort.click(function() {
    var type = $(this).html();
    productsSort.removeClass('active');
    $(this).addClass('active');
    softEle(type);
})


productsFilterBtn.click(function() {
    $(this).toggleClass('active');
    productsFilter.toggleClass('expanded');
})

var closeForm = $('.close-iframe');
var overlayForm = $('.overlay');
var iframeForm = $('iframe');
closeForm.click(() => {
    iframeForm.attr('id','');
    iframeForm.fadeOut(500);
    overlayForm.fadeOut(500);
    $('html,body').attr('style','');
    closeForm.fadeOut(300);
})
var login = $('#log-in');
login.click(() => {
    iframeForm.attr('id','frame');
    document.getElementById('frame').contentDocument.location.reload(true);
    iframeForm.fadeIn(500);
    overlayForm.fadeIn(500);
    $('html,body').attr('style','overflow:hidden');
    var iframePos = iframeForm.offset();
    closeForm.attr('style',`top: ${iframePos.top + 20}px; right: ${iframePos.left + 20}px`);
    closeForm.fadeIn(300);
})