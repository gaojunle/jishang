jQuery(function ($) {
    var $getCode = $('.btn-get-code');
    $('.js-mobile').on('keyup', function () {
        var val = $(this).val();

        if (/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(val) && !$getCode.data('istime')) {
            $getCode.addClass('active')
        }
    });

    $getCode.click(function () {
        var $this = $(this),
            countDown = 60;

        if (!$this.data('istime') && $this.hasClass('active')) {
            //TODO 发送请求获取验证码
            //alert('发送请求获取验证码');
            $this.removeClass('active');
            $this.html('发送中(' + countDown-- + ')');
            $this.data('istime', setInterval(function () {
                if (countDown == 0) {
                    clearInterval($this.data('istime'));
                    $this.data('istime', false).addClass('active');
                    $this.html('获取验证码');
                    return false;
                }
                $this.html('发送中(' + countDown-- + ')');
            }, 1000));
        }
    });

    $("#suform").validate({
        submitHandler: function (form) {
            alert("submit");
        },
        rules: {
            name: "required",
            mobile: "required",
            code: {
                required: true,
                minlength: 4
            }
        },
        errorPlacement: function (error, element) {                             //错误信息位置设置方法
            element.parent().after(error);                            //这里的element是录入数据的对象
        },
        messages: {
            mobile: "请输入手机号",
            code: {
                required: "请输入验证码",
                minlength: "验证码长度不能小于 4 个字母"
            }
        }
    });
})