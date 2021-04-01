var changeFormBtn = $('.changeForm');
var form = $('.form');

changeFormBtn.click((e) => {
    var target = e.target.getAttribute('data-type');
    form.fadeOut(300);
    setTimeout(function() {
        $(`.form[data-type='${target}']`).fadeIn(300);
    },300);
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
    iframeForm.attr('id','');
    iframeForm.fadeIn(500);
    overlayForm.fadeIn(500);
    $('html,body').attr('style','overflow:hidden');
    var iframePos = iframeForm.offset();
    closeForm.attr('style',`top: ${iframePos.top + 20}px; right: ${iframePos.left + 20}px`);
    closeForm.fadeIn(300);
})