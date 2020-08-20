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

window.onload = function () {
    setTimeout(function () {
        //针对图片大小位置压缩处理
        $('.my-gallery').each(function (idx, ele) {
            var $this = $(this);
            $this.addClass('num_' + $this.find('figure').length);
        })
        $('.img_box img').each(function () {
            var $this = $(this);
            var $parent = $(this).parents('figure');
            var pw = $parent.width();
            var ph = $parent.height();
            var mw = $this.width();
            var mh = $this.height();
            $this.parents('a').attr('data-size', screen.width + 'x' + (mh * screen.width / mw))
            //长图，让高度与外框一样大小，宽取中间
            if (mw >= mh) {
                $this.height(ph); //让高度与外框一样大小
                mw = $this.width();
                var mLeft = - Math.abs(pw - mw) / 2;
                //向左平移压缩后图片大小，保证居中
                $this.css({ left: mLeft })
            } else {
                $this.width(pw); //让宽与外框一样大小
                mh = $this.height();
                var mTop = - Math.abs(ph - mh) / 2;
                //向向平移压缩后图片大小，保证居中
                $this.css({ top: mTop })
            }

        })
    }, 400)
}