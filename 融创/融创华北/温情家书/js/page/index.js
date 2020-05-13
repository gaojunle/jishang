/**
 * Created by gaojun-pd on 2017/3/23.
 */
var Main = {
    init: function () {
        this.initData();
        this.bindEvent();
    },
    initData: function () {
        this.initSlider();
    },

    initSlider: function () {
        var $sliderBox = $('#iSlider-wrapper'),
            list = [];

        $sliderBox.children().each(function () {
            list.push({content: this})
        });
        $sliderBox.html('');

        new iSlider({
            data: list,
            dom: $sliderBox[0],
            isLooping: 1,
            isOverspread: 1,
            isAutoplay: 1,
            animateTime: 800,
            plugins: ['dot']
        })

    },

    //绑定事件操作
    bindEvent: function () {
        $('.fix-bottom-info').click(function () {
            popTipShow.confirm('下载小白彩票', $('.js-pop-content').html(), ['下载', '放弃'],
                function (e) {
                    //callback 处理按钮事件
                    var button = $(e.target).attr('class');
                    if (button == 'ok') {
                        alert('OK')
                        this.hide();
                    }

                    if (button == 'cancel') {
                        alert('cancel')
                        this.hide();
                    }
                }
            );
        });
    },

    /**
     * 通过key获取url中的参数值
     * @param key
     * @returns {null}
     */
    getQueryString: function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },

    //编译并渲染数据
    compileData: function (tEle, hEle, data, callback) {
        var $box = $(hEle),
            compiledTemplate = Template7.compile($(tEle).html());

        $box.html(compiledTemplate(data));

        if (callback && $.isFunction(callback)) {
            callback($box);
        }
    }
};
Main.init();