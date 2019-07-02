/**
 * @author  Administrator on 2019/4/7
 *
 * @descript
 * @version 1.0
 * @example:
 */
jQuery(function ($) {
    var $opBox = $('.op-box'),
        $listBox = $('.js-list-box'),
        $btnDel = $('.btn-del')
    $opBox.on('click', function () {
        if (!$opBox.hasClass('on')) {
            $listBox.addClass('on');
            $opBox.addClass('on');
            $btnDel.addClass('on');
        } else {
            $listBox.removeClass('on');
            $opBox.removeClass('on');
            $btnDel.removeClass('on');
        }
    })

    $listBox.on('click', '.check-box', function () {
        $(this).toggleClass('on')
    })

    $btnDel.click(function () {
        var d = dialog({
            title: '',
            content: '<p style="text-align: center;font-size: 16px;padding: 10px 10px;">确定删除？</p>',
            okValue: '确定',
            width: 200,
            ok: function () {
                alert('选中：' + $listBox.find('.check-box.on').length);
                d.close().remove();
                return false;
            },
            backdropOpacity: '0.3',
            cancelValue: '取消',
            cancel: function () {
            }
        });
        d.showModal();
    })
})