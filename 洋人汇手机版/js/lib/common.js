var handlerOrientationChange = function () {
    var width = window.innerWidth <= 320 ? 320 : window.innerWidth >= 640 ? 640 : window.innerWidth;
    var fontSize = 100 * (width / 320);
    document.documentElement.style.fontSize = fontSize + 'px';
};

handlerOrientationChange();

$(window).load(function () {
    $(".loading-gif").remove();
});
$(window).resize(function () {
    handlerOrientationChange()
})