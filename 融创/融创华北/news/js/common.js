//定义一个立即执行的函数
(function () {
    var Ticts = function Ticts() {
        this.ticts = {};
    };
    Ticts.prototype.createTicts = function (id, dealline) {
        var ticts = this;
        var time = moment(dealline).diff(moment());
        var _ticts = this.ticts[id] = {
            dealine: dealline
            , id: id
            , time: time
            , interval: setInterval(function () {
                var t = null;
                var d = null;
                var h = null;
                var m = null;
                var s = null;
                //js默认时间戳为毫秒,需要转化成秒
                t = _ticts.time / 1000;
                d = Math.floor(t / (24 * 3600));
                h = Math.floor((t - 24 * 3600 * d) / 3600);
                m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
                s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
                //这里可以做一个格式化的处理,甚至做毫秒级的页面渲染,基于DOM操作,太多个倒计时一起会导致页面性能下降
                document.getElementById(id).innerHTML = d + '天' + h + '小时' + m + '分钟' + s + '秒';
                _ticts.time -= 1000;
                console.log(333)
                if (_ticts.time < 0) {
                    ticts.deleteTicts(id);//判断是否到期,到期后自动删除定时器
                }

            }, 1000)
        }
    };
    Ticts.prototype.deleteTicts = function (id) {
        clearInterval(this.ticts[id].interval);//清楚定时器的方法,需要定时器的指针作为参数传入clearInterval
        delete this.ticts[id];//通过delete的方法删除对象中的属性
    };
    //新建一个ticts对象,放到window全局函数中,那么在html页面是(或者其他js文件)可以访问该对象
    window.Ticts = new Ticts();
})();
var Common = {
    init: function () {
        this.initCountDown();
    },
    initCountDown: function () {
        Ticts.createTicts("countdown_num", "2017-1-20 20:20:20");
        var $cdNum = $('.countdown_num');
        var dur = moment.duration(new Date($cdNum.data('time')));
        console.log($cdNum.data('time'))
        var step = 1;
        console.log(dur.get('year') * 365 * 12 * 24 + dur.months() * 30 * 24 + dur.get('hour'));
        // setInterval(function () {
        //     var f = moment(time).subtract('seconds', step);
        //     $cdNum.find('.h').html(f.format('hh'))
        //     $cdNum.find('.m').html(f.format('mm'))
        //     $cdNum.find('.s').html(f.format('ss'))
        //     step++;
        // }, 1000)
        return false;
    }
}
Common.init();