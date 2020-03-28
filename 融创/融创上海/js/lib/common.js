// true 或false ,返回true的话 则为全面屏
function judgeBigScreen() {
    let result = false;
    const rate = window.screen.height / window.screen.width;
    let limit = window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值

    // window.screen.height为屏幕高度
    //  window.screen.availHeight 为浏览器 可用高度

    if (rate > limit) {
        result = true;
    }
    return result;
};
(function () {
    $().ready(function () {
        if (judgeBigScreen()) {
            $('.footer').addClass('fullScreen')
        }
        flexFull()
    });
})();

function flexFull() {
    var $flexFull = $('.js-flex-full');
    $flexFull.each(function () {
        var clen = $(this).children().length;
        var cols = $(this).data('cols')
        var bq = clen % cols;
        for (var i = 0; i < bq; i++) {
            var $tmp = $('<div class="flex-full-tmp"></div>').width($(this).children().eq(0).width())
            $(this).append($tmp)
        }
    })

}
(function () {
    var $tab = $('.js-tab');
    var $tabConts = $tab.find('.tab-cont');
    $tab.on('click', '.tab-menu>li', function () {
        var $this = $(this),
            idx = $this.index();
        $tabConts.hide().eq(idx).show();
        $this.addClass('on').siblings().removeClass('on');
    });
})()