/**
 * Created by gaojun-pd on 2017/3/23.
 */
var _dialog = null;
var App = {
    init: function () {
        this.initData();
        this.bindEvent();
    },

    initData: function () {

    },

    //绑定事件操作
    bindEvent: function () {
        //全局dialog关闭事件
        $(document).on('click', '.dialog-close-icon', function () {
            _dialog.close().remove()
        })

        //激活操作
        $('.js-btn-active').click(function () {
            _dialog = dialog({
                content: $('.dialog-active').html()
            }).showModal();
            return false;
        })

        //验证成功后弹层
        $('.js-btn-suc').click(function () {
            _dialog = dialog({
                content: $('.dialog-suc').html()
            }).showModal();
            return false;
        })

        //验证失败后弹层
        $('.js-btn-fail').click(function () {
            _dialog = dialog({
                content: $('.dialog-fail').html()
            }).showModal();
            return false;
        })

        //下拉选择样式处理；
        $('.we-select').on('change', function () {
            var $this = $(this),
                $selOption = $this.find('option:selected');

            $this.find('option').css('color', '#111').eq(0).css('color', '#8F8F8F')
            if ($selOption.val() == -1) {
                $this.css('color', '#8F8F8F');
            } else {
                $this.css('color', '#111')
            }
        })

        $('.js-get-code').click(function () {
            var $this = $(this);
            if ($this.hasClass('counting')) {
                return false;
            }
            $this.html(countDownTime + 's可重发').addClass('counting');

            //发送验证码；
            //alert('发送验证码')
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
    }
};
App.init();