/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initData();
        this.bindEvent();
    },
    initData: function () {
        this.initSwiper();
    },

    bindEvent: function () {
        $('.desc-box').on('click', 'li', function () {
            $(this).toggleClass('unfold');
        })

        $('.js-btn-charge').click(function () {
            var $this = (this);
            alert('兑换成功')
            $('.q-info .num').removeClass('no-show')
            $(this).hide().next().removeClass('hide');
            return false;
        })
    },

    initSwiper: function () {
        var swiperBanner = new Swiper('.banner-swiper', {
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction: false
        });
    }
};
App.init();