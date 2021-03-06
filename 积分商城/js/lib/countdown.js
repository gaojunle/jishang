
var time_wrap = document.getElementById("times_wrap");
var time_d = document.getElementById("times_d");
var time_h = document.getElementById("times_h");
var time_m = document.getElementById("times_m");
var time_s = document.getElementById("times_s");

var time_end = new Date($('#times_wrap').data('enddate')); // 设定结束时间
time_end = time_end.getTime();

console.log($('#times_wrap').data('enddate'))
function show_time() {
    var time_now = new Date(); // 获取当前时间
    time_now = time_now.getTime();
    var time_distance = time_end - time_now; // 结束时间减去当前时间
    var int_day, int_hour, int_minute, int_second;
    if (time_distance >= 0) {
        // 天时分秒换算
        int_day = Math.floor(time_distance / 86400000)
        time_distance -= int_day * 86400000;
        int_hour = Math.floor(time_distance / 3600000)
        time_distance -= int_hour * 3600000;
        int_minute = Math.floor(time_distance / 60000)
        time_distance -= int_minute * 60000;
        int_second = Math.floor(time_distance / 1000)

        // 时分秒为单数时、前面加零站位
        if (int_hour < 10)
            int_hour = "0" + int_hour;
        if (int_minute < 10)
            int_minute = "0" + int_minute;
        if (int_second < 10)
            int_second = "0" + int_second;

        // 显示时间
        time_d.innerHTML = wrapBySpan(int_day);
        time_h.innerHTML = wrapBySpan(int_hour);
        time_m.innerHTML = wrapBySpan(int_minute);
        time_s.innerHTML = wrapBySpan(int_second);

        setTimeout("show_time()", 1000);
    }
};

function wrapBySpan(txt) {
    var arr = txt.toString().split('');
    var rTxt = '';
    for (var i = 0; i < arr.length; i++) {
        rTxt += '<span>' + arr[i] + '</span>';
    }
    return rTxt;
}

show_time();