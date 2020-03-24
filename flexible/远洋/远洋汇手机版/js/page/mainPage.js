jQuery(function ($) {
    var $animateCell = $('.js-animate');

    $animateCell.each(function () {
        var $img = $(this).find('img');
        $img.after($img.clone())
    })

    activeAnimate();
    setInterval(function () {
        if ($('.js-animate:not(".fadeOutDown")').length == 0) {
            $animateCell.removeClass('fadeOutDown');
        }

        activeAnimate();
    }, 3000)

    function activeAnimate() {
        var $cells = $animateCell.filter(':not(".fadeOutDown")');
        var $rCell = $cells.eq(getRandomIndex(0, $cells.length));

        setTimeout(function () {
            $rCell.addClass('fadeOutDown');
        }, 100)
    }

    function getRandomIndex(m, n) {
        var r = Math.floor(Math.random() * (m - n) + n);
        console.log(r);
        return r;
    }
})