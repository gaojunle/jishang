var Ticts = function Ticts(selector, deadline) {
    this.selector = selector;
    this.ticts = {
        deadline: deadline,
        interval: null,
    };
    this.createTicts();
};
Ticts.prototype = {
    createTicts: function () {
        var that = this;
        var dtime = moment(this.ticts.deadline).diff(moment()); //倒计时时间
        this.ticts.interval = setInterval(function () {
            countdownStep()
        }, 1000)
        countdownStep();
        function countdownStep() {
            var t = null;
            var d = null;
            var h = null;
            var m = null;
            var s = null;
            //js默认时间戳为毫秒,需要转化成秒
            t = dtime / 1000;
            d = Math.floor(t / (24 * 3600));
            h = Math.floor((t - 24 * 3600 * d) / 3600);
            m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
            s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
            //这里可以做一个格式化的处理,甚至做毫秒级的页面渲染,基于DOM操作,太多个倒计时一起会导致页面性能下降
            var hh = d * 24 + h;
            hh = hh >= 10 ? hh : '0' + hh;
            m = m > 10 ? m : '0' + m;
            s = s > 10 ? s : '0' + s;

            var innerHTML = `<span class="h">${hh}</span>:<span class="m">${m}</span>:<span class="s">${s}</span> 后结束`;

            dtime -= 1000;
            if (dtime < 0) {
                that.deleteTicts();//判断是否到期,到期后自动删除定时器
                innerHTML = that.selector.data('overtxt') || '活动已结束';
            }

            that.selector.html(innerHTML)
        }
    },
    deleteTicts: function () {
        clearInterval(this.ticts.interval);//清楚定时器的方法,需要定时器的指针作为参数传入clearInterval
        this.ticts.interval = null;
    }
}

var Common = {
    init: function () {
        this.initCountDown();
    },
    initCountDown: function () {
        $('.countdown_num').each(function () {
            new Ticts($(this), $(this).data('deadline'))
        })

        return false;
    }
}
Common.init();