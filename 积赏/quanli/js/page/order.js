var App = {
    init: function () {
        this.initData();
        this.bindEvent();
        this.bindBtnOp();

        var type = this.getQueryString('type')
        if (type > 0) {
            $('.tab-menu>li').eq(type).trigger('click')
        }
    },
    initData: function () {

    },

    bindEvent: function () {
        var that = this,
            $tab = $('.js-tab');
        var $tabConts = $tab.find('.tab-cont');
        $tab.on('click', '.tab-menu>li', function () {
            var $this = $(this),
                idx = $this.index();
            $tabConts.hide().eq(idx).show();
            $this.addClass('on').siblings().removeClass('on');

            var type = that.getQueryString('type')
            if (type == idx) {
                return;
            } else {
                location.href = location.pathname + '?type=' + idx
            }
        })
    },

    bindBtnOp: function () {
        $('.pop-box').on('click', '.js-cancel', function () {
            $(this).parents('.pop-box').hide();
        }).on('click', '.js-ok', function () {
            alert('点击了OK');
            $(this).parents('.pop-box').hide();
            return false
        })

        $('.js-op-box')
            .on('click', '.btn-cancel', function () {
                $('.pop-box').show();
                return false;
            })
            .on('click', '.btn-confirm', function () {
                $('.pop-box').show();
                return false;
            })
            .on('click', '.btn-del', function () {
                $('.pop-box').show();
                return false;
            })
            .on('click', '.btn-logistics', function () {
                alert('点击后跳转至快递100页面，可查看物流信息')
                return false;
            })
    },
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
};
App.init();