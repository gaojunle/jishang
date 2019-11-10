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
        var swiperType = new Swiper('.swiper-container', {
            spaceBetween: 0,
            freeMode: true,
            slidesPerView: "auto"
        });
    },
    //绑定事件操作
    bindEvent: function () {
        $(".project-info-btn").on("click", function () {
            var $this = $(this);
            $this.toggleClass('open')
            $this.find('img').attr('src', $this.hasClass('open') ? 'img/common/showbtn_open.png' : 'img/common/showbtn.png')
            $this.parents('.project-info-detail').toggleClass('open')
        });
    }
};
App.init();