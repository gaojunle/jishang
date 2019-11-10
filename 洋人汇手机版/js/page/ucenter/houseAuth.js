/**
 * Created by gaojun-pd on 2017/3/23.
 */
var _dialog = null;
var App = {
    init: function () {
        this.initDialog();
        this.bindEvent();
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
        /*var mobileSelect4 = new MobileSelect({
            trigger: '.js-city',
            title: '省市选择',
            wheels: [
                cityData
            ],
            transitionEnd: function (indexArr, data) {
                console.log(data);
            },
            callback: function (indexArr, data) {
                $('.js-city').val(data[0].value + ' ' + data[1].value)
            }
        });*/

        $('.js-select').each(function () {
            var $this = $(this),
                $selData = $this.parents('li').find('select');
            if ($selData.length == 0) {
                return false;
            }

            var data = [];
            $selData.find('option').each(function () {
                data.push({id: $(this).val(), value: $(this).html()})
            });

            new MobileSelect({
                trigger: this,
                title: $selData.data('title') + '选择',
                wheels: [
                    {data: data}
                ],
                callback: function (indexArr, data) {
                    $this.val(data[0].value)
                }
            });
        })
    }
};
App.init();