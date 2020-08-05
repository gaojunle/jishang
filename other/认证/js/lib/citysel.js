(function ($) {
    "use strict";
    var defOptions = {
        title: '地区选择',
        data: [],
        selector: ".citysel_box",
        selCityFun: function () { }
    };
    var citysel = (function () {
        function CitySel(element, options) {
            this.settings = $.extend(true, defOptions, options || {});
            this.element = element;
            this.init();
        }
        CitySel.prototype = {
            init: function () {
                this.createHtml();
            },
            createHtml: function () {
                var that = this;

                var $el = $(this.element),
                    data = this.settings.data;
                var $ht = $('<div class="citysel_box">\
                                <div class="citysel_title">'+ this.settings.title + '</div>\
                                <div class="cityitem_box"></div>\
                                <ul class="idx_list"></ul>\
                            </div>')

                $.each(data, function (idx, item) {
                    var uF = upperFirst(item.cityName);
                    console.log(JSON.stringify(item))
                    var html = '<li data-city=' + JSON.stringify(item) + '>' + item.cityName + '</li>';

                    if ($ht.find('[data-cityitem=' + uF + ']').length == 0) {
                        $ht.find('.cityitem_box').append('<div class="cityitem" data-cityitem=' + uF + '><div class="cindex">' + uF + '</div><ul></ul></div>')
                        $ht.find('.idx_list').append('<li>' + uF + '</li>')
                    }

                    $ht.find('[data-cityitem=' + uF + '] ul').append(html)
                })
                $el.html($ht)
                $el.find('.idx_list').css({ marginTop: - $el.find('.idx_list').height() / 2 });
                $el.on('click', '.cityitem_box li:not(.no)', function () {
                    if ($.isFunction(that.settings.selCityFun)) {
                        that.settings.selCityFun($(this).data('city'))
                    }
                    $(that.element).removeClass('show')
                })
                $el.find('.cityitem').each(function () {
                    if ($(this).find('li').length % 3 == 2) {
                        $(this).find('ul').append('<li class="no"></li>')
                    }
                })
            }
        }
        return CitySel;
    })();

    $.fn.citysel = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data("citysel");
            if (!instance) {
                me.data("citysel", (instance = new citysel(me, options)));
            }
        });
    }
})(jQuery);