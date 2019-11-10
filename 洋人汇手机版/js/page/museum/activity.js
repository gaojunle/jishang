/**
 * @author  Administrator on 2018/2/3
 *
 * @descript
 * @version 1.0
 * @example:
 */
/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.bindEvent();
    },

    //绑定事件操作
    bindEvent: function () {
        $('.hotsell-about-btn').click(function () {
            $(this).parents().toggleClass('open')
        })
    }
};
App.init();