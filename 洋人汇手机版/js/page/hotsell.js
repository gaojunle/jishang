/**
 * Created by gaojun-pd on 2017/3/23.
 */
var swiperAbout = null;
var App = {
    init: function () {
        this.initData();
        this.bindEvent();
    },
    initData: function () {
        this.initSwiper()
        //模拟滚动条
        swiperAbout = new Swiper('.hotsell-about-swpiper', {
            scrollbar: '.swiper-scrollbar',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            scrollbarHide: false
        });
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
        //简介
        $(".hotsell-about-btn").on("click", function () {
            var fontSize = parseInt($("html").css("font-size"));
            scrollH = fontSize * 1.2 + 'px';
            if ($(this).hasClass("open")) {
                $(this).removeClass("open").find("img").attr({src: "img/common/showbtn.png"});
                $(this).siblings(".hotsell-about-detail").hide();
            } else {
                $(this).addClass("open").find("img").attr({src: "img/common/showbtn_open.png"});
                $(this).siblings(".hotsell-about-detail").show();
                $('html,body').animate({scrollTop: scrollH}, 500);
                setTimeout("swiperAbout.update()", 100);
            }
        });
    }
};
App.init();