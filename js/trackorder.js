var preload = $('#preload');
var sectionWrapper = $('section');

$(document).ready(function() {
    preload.addClass('active');
})

window.onload = function() {
    preload.fadeOut(500);
}
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