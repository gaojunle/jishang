/**
 * Created by gaojun-pd on 2017/3/23.
 */

var countdownFlag = -1;
var countDownTime = 60;

var App = {
    init: function () {
        this.initData();
        this.bindEvent();
    },
    initData: function () {

    },

    bindEvent: function () {
        $('.js-get-code').click(function () {
            var $this = $(this);
            if ($this.hasClass('counting')) {
                return false;
            }
            $this.html(countDownTime + 's可重发').addClass('counting');

            //发送验证码；
            alert('发送验证码')
            /*$.get('#', {}, function () {
             alert('发送成功')
             })*/

            countdownFlag = setInterval(function () {
                countDownTime--;
                $this.html(countDownTime + 's可重发')
                if (countDownTime == 0) {
                    clearInterval(countdownFlag);
                    $this.html('获取验证码').removeClass('counting');
                    countDownTime = 60;
                }
            }, 1000)
        })

        $('.pay-way').on('click', 'a', function () {
            $(this).addClass('on').siblings().removeClass('on');
            alert('您选择支付方式，' + $(this).data('paytype'))
            return false;
        })
    }
};
App.init();