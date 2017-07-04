/**
 * @author  Administrator on 2017/5/20
 *
 * @descript
 * @version 1.0
 * @example:
 */
jQuery(function ($) {
    $('.weui-navbar').on('click', '.weui-navbar__item ', function () {
        $(this).addClass('weui-bar__item_on').siblings().removeClass('weui-bar__item_on')
        $('.weui-panel__bd').hide().eq($(this).index()).show();
    });
    $('.weui-navbar .weui-bar__item_on').trigger('click')
})