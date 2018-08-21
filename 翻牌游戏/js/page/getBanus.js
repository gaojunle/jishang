/**
 * Created by gaojun-pd on 2017/3/23.
 */

var App = {
    init: function () {
        this.bindEvent();
    },

    bindEvent: function () {
        var that = this;
        $('.btn-submit').click(function () {
            that.dialog = new dialog({
                content: $('.partake').show(),
                padding: 0
            });
            that.dialog.showModal();
            return false;
        })

        $('.pop-close').click(function () {
            that.dialog.close();
            return false;
        })
    }
};
App.init();