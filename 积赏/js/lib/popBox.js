/**
 * Created by gaojun-pd on 2017/5/3.
 */
function showPop(msg, title, type) {
    var $popBox = $('.pop-box'),
        $poptype = $popBox.find('.txt-' + type)

    $popBox.find('.pop-txt').addClass('hide');

    if (title) {
        var titleSpan = '';
        $.each(title.split(''), function (i, v) {
            titleSpan += '<span>' + v + '</span>'
        });

    }

    $poptype.find('.title').html(titleSpan);
    $poptype.find('.msg').html(msg);
    $poptype.removeClass('hide');

    $popBox.find('.js-pop-close').one('click', function () {
        $popBox.fadeOut();
        return false;
    });

    $popBox.fadeIn();
}
