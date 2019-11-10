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
        this.initData();
        this.bindEvent();
    },
    initData: function () {
        this.initDialog()
    },

    initDialog: function () {
        //全局dialog关闭事件
        $(document).on('click', '.dialog-close-icon', function () {
            _dialog.close().remove()
        })
        //验证成功后弹层
        $('.js-submit-suc').click(function () {
            _dialog = dialog({
                content: $('.dialog-suc').html()
            }).showModal();
            return false;
        })

        //验证失败后弹层
        $('.js-submit-fail').click(function () {
            _dialog = dialog({
                content: $('.dialog-fail').html()
            }).showModal();
            return false;
        })
    },
    //绑定事件操作
    bindEvent: function () {

    }
};
App.init();