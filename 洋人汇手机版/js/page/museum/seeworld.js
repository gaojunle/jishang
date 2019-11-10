/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initData();
        this.bindEvent();
    },
    initData: function () {
        this.initSwiper()
    },

    initSwiper: function () {
        var swiperBanner = new Swiper('.banner-swiper', {
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction: false
        });
    },
    //绑定事件操作
    bindEvent: function () {

    }
};
App.init();