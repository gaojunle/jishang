/**
 * Created by gaojun-pd on 2017/3/23.
 */

var lottery = function (conf) {
    this.opt = $.extend({
        $lottery: $("#lottery"),
        $units: $(".l-util"),
        index: -1,	//起点位置,转动到哪个位置
        count: $(".l-util").length,	//总共有多少个位置
        timer: 0,	//setTimeout的ID，用clearTimeout清除
        speed: 100,	//初始转动速度
        times: 0,	//转动次数
        cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: 2,	//中奖位置
        runding: false,//是否运行中；
    }, conf);
    this.init()
}
lottery.prototype = {
    init: function (id) {
        var opt = this.opt;

        opt.$units.addClass('rolling').eq(opt.index).addClass("active");

        if (opt.$lottery.data('running')) {
            return false;
        }
        opt.$lottery.data('running', true);

        this.roll();
    },
    toggleStatus: function () {
        var opt = this.opt;

        opt.$units.filter('.active').removeClass("active");

        opt.index += 1;
        if (opt.index > opt.count - 1) {
            opt.index = 0;
        }
        opt.$units.filter('.unit-' + opt.index).addClass("active");
    },
    roll: function () {
        var that = this,
            opt = that.opt;

        opt.times += 1;
        that.toggleStatus();

        if (opt.times > opt.cycle + 10 && opt.prize == opt.index) {
            clearTimeout(opt.timer);
            opt.prize = -1;
            opt.times = 0;
            opt.click = false;
            opt.$lottery.data('running', false);
        } else {
            if (opt.times < opt.cycle) {
                opt.speed -= 10;
            } else if (opt.times == opt.cycle) {
                var index = Math.random() * (opt.count) | 0;

            } else {
                if (opt.times > opt.cycle + 10 && ((opt.prize == 0 && opt.index == 7) || opt.prize == opt.index + 1)) {
                    opt.speed += 110;
                } else {
                    opt.speed += 20;
                }
            }
            if (opt.speed < 40) {
                opt.speed = 40;
            }

            opt.timer = setTimeout(function () {
                that.roll.apply(that)
            }, opt.speed);

            return false;
        }
    }
}

var App = {
    init: function () {
        this.bindEvent();
        this.initScroll();
    },

    bindEvent: function () {
        var that = this;

        $(".btn-lottery").click(function () {
            new lottery({
                index: Math.random() * ($(".l-util").length) | 0, //转盘开始位置，目前是随机数
                prize: 7//奖位置，从0开始
            });
            return false;
        });

        //规则
        $('.js-rule').click(function () {
            that.dialog = new dialog({
                content: $('.rule-box'),
                padding: 0
            });
            that.dialog.showModal();
            return false;
        });

        //参与过
        $('.js-partake').click(function () {
            that.dialog = new dialog({
                content: $('.partake'),
                padding: 0
            });
            that.dialog.showModal();
            return false;
        });

        $('.js-banus').click(function () {
            that.dialog = new dialog({
                content: $('.banus-box'),
                padding: 0
            });
            that.dialog.showModal();
            return false;
        });
        $('.js-no-banus').click(function () {
            that.dialog = new dialog({
                content: $('.no-banus-box'),
                padding: 0
            });
            that.dialog.showModal();
            return false;
        });

        $('body').on('click', '.pop-close', function () {
            that.dialog.close().remove()
        })
    },
    initScroll: function () {
        var $bangList = $('.js-bang-list');
        setInterval(function () {
            var $li = $bangList.find('li:first');
            $li.animate({"margin-top": -$li.height()}, 1000, function () {
                $(this).css("margin-top", 0).appendTo($bangList);
            })
        }, 2000)
    }
};
App.init();