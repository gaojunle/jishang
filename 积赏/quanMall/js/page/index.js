/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initData();
        this.bindEvent();
    },
    initData: function () {

    },

    bindEvent: function () {
        var $tab = $('.js-tab');
        var $tabConts = $tab.find('.tab-cont');
        $tab.on('click', '.tab-menu>li', function () {
            var $this = $(this),
                idx = $this.index();
            $tabConts.hide().eq(idx).show();
            $this.addClass('on').siblings().removeClass('on');
        })
    }
};
App.init();