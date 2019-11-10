/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initData();
    },
    initData: function () {
        this.initSwiper()
        this.initViewer()
    },

    initSwiper: function () {
        var swiper = new Swiper('.swiper-container-1', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
        var swiperType = new Swiper('.swiper-container-2', {
            spaceBetween: 0,
            freeMode: true,
            slidesPerView: "auto"
        });
    },

    initViewer: function () {
        $('.viewer-pic').viewer();
    }
};
App.init();