var App = {
    init: function () {
        this.countdown();
        this.bindPopClose();
        this.bindRuleShow();
        this.bindShareShow();
        this.bindZhuliClick();
        this.bindBanus();//领取奖品
    },
    countdown: function () {
        var $cdNum = $('.countdown_num');
        var date = new Date();
        var time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + $cdNum.data('time');
        var step = 1;
        setInterval(function () {
            var f = moment(time).subtract('seconds', step);
            $cdNum.find('.h').html(f.format('hh'))
            $cdNum.find('.m').html(f.format('mm'))
            $cdNum.find('.s').html(f.format('ss'))
            step++;
        }, 1000)
        return false;
    },
    bindRuleShow: function () {
        $('.show_rule').click(function () {
            $('.js_rule').addClass('show')
            return false;
        })
    },
    bindPopClose: function () {
        $('.pop_close').click(function () {
            $('.pop_box').removeClass('show')
            return false;
        })
    },
    bindShareShow: function () {
        $('.js_pop_share').click(function () {
            $('.pop_share').addClass('show')
            return false;
        })
    },
    bindZhuliClick: function () {
        $('.js_pop_msg').click(function () {
            $('.pop_msg').addClass('show')
            return false;
        })
    },
    bindBanus: function () {
        $('.js_banus').click(function () {
            $('.pop_address').addClass('show')
            return false;
        })
    }
}
App.init();