/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initDialog();
    },
    initData: function () {
    },

    initDialog: function () {
        //全局dialog关闭事件
        $(document).on('click', '.dialog-close-icon', function () {
            _dialog.close().remove()
        })
        //验证成功后弹层
        $('.js-mycode').click(function () {
            _dialog = dialog({
                width: '7rem',
                content: $('.dialog-srcode').html()
            }).showModal();

            $(_dialog.node).find('.srcode-img').attr('src', $(this).data('codesrc'))
            return false;
        })

        $('.js-qiandao').click(function () {
            _dialog = dialog({
                content: $('.dialog-suc').html()
            }).showModal();
            return false;
        })
    },
};
App.init();