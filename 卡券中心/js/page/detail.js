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
    }
};
App.init();