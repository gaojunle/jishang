/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initData();
    },
    initData: function () {
        this.initSwiper()
    },

    initSwiper: function () {
        $('.swiper-container').each(function () {
            var swiper = new Swiper(this, {
                spaceBetween: 26,
                freeMode: true,
                slidesPerView: "auto"
            });
            swiper.update();
        });
    }
};
App.init();