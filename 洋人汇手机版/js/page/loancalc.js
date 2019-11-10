/**
 * Created by gaojun-pd on 2017/3/23.
 */
/*
 房贷计算器
 amount: 贷款总额 单位：万元
 method：还款方式
 term：按揭期数 单位：月
 rate：贷款利率
 */
function calculate(amount, method, term, rate, discount) {
    if (method == 0)
        return calculateMP(amount, term, rate);
    else {
        return calculateEP(amount, term, rate);
    }
}
/*
 等额本息
 每月月供额=〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔(1＋月利率)＾还款月数-1〕
 每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
 每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
 总利息=还款月数×每月月供额-贷款本金
 */
function calculateMP(amount, term, rate) {
    var returnData = {};
    returnData.TotalAmount = amount;
    returnData.Rate = rate;
    returnData.Term = term;
    var repayment = (amount * 10000 * (rate / 12) * Math.pow(1 + (rate / 12), term)) / (Math.pow(1 + (rate / 12), term) - 1);
    returnData.RepaymentPerMonth = Math.round(repayment * 100) / 100;
    returnData.TotalRepayment = Math.round(repayment * term * 100) / 100;
    return returnData;
}
/*
 等额本金
 每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
 每月应还本金=贷款本金÷还款月数
 每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
 总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
 */
function calculateEP(amount, term, rate) {
    var returnData = {};
    returnData.TotalAmount = amount;
    returnData.Rate = rate;
    returnData.Term = term;

    var myyhbj = amount * 10000 / term;
    var myygdje = myyhbj * rate / 12;
    var myyg = new Array();
    var mylx = new Array();
    var totalRepayment = 0;
    for (var i = 0; i < term; i++) {
        var dyyg = myyhbj + (((amount * 10000) - myyhbj * (i)) * (rate / 12))
        totalRepayment += dyyg;
        myyg.push(Math.round(dyyg * 100) / 100);
        mylx.push(Math.round((myyhbj * (term - i) * rate / 12) * 100) / 100);
    }

    returnData.myyhbj = myyhbj;
    returnData.myygdje = myygdje;
    returnData.myyg = myyg;
    returnData.mylx = mylx;
    returnData.TotalRepayment = Math.round(totalRepayment * 100) / 100;
    return returnData;
}
//模拟select
var swiperYear = new Swiper('#year-select .swiper-container', {
    direction: 'vertical',
    spaceBetween: 0,
    freeMode: true,
    slidesPerView: 'auto',
    mousewheelControl: true
});
var swiperRate = new Swiper('#rate-select .swiper-container', {
    direction: 'vertical',
    spaceBetween: 0,
    freeMode: true,
    slidesPerView: 'auto',
    mousewheelControl: true
});
var swiperYear1 = new Swiper('#year-select1 .swiper-container', {
    direction: 'vertical',
    spaceBetween: 0,
    freeMode: true,
    slidesPerView: 'auto',
    mousewheelControl: true
});
var swiperRate1 = new Swiper('#rate-select1 .swiper-container', {
    direction: 'vertical',
    spaceBetween: 0,
    freeMode: true,
    slidesPerView: 'auto',
    mousewheelControl: true
});
var swiperYear2 = new Swiper('#year-select2 .swiper-container', {
    direction: 'vertical',
    spaceBetween: 0,
    freeMode: true,
    slidesPerView: 'auto',
    mousewheelControl: true
});
var swiperRate2 = new Swiper('#rate-select2 .swiper-container', {
    direction: 'vertical',
    spaceBetween: 0,
    freeMode: true,
    slidesPerView: 'auto',
    mousewheelControl: true
});

function swipeTo(a, b) {
    var selectIndex = b.find("li.selected").index();
    selectNum = b.find("li").length;
    x = -44 * (selectIndex - 1);
    y = -44 * selectNum + 202;
    if (x >= 0) {
        a.setWrapperTranslate(0);
    } else if (selectNum - selectIndex < 4) {
        a.setWrapperTranslate(y);
    } else {
        a.setWrapperTranslate(x);
    }
};
function swipeAll() {
    swipeTo(swiperYear, $("#year-select .year-list"));
    swipeTo(swiperRate, $("#rate-select .rate-list"));
    swipeTo(swiperYear1, $("#year-select1 .year-list"));
    swipeTo(swiperRate1, $("#rate-select1 .rate-list"));
    swipeTo(swiperYear2, $("#year-select2 .year-list"));
    swipeTo(swiperRate2, $("#rate-select2 .rate-list"));
};

var defaultYear = 19; //20年
defaultRate = 0; //基准利率
function swipeDefault() {
    $(".year-list").each(function () {
        $(this).find("li").eq(defaultYear).click();
    });
    $(".rate-list").each(function () {
        $(this).find("li").eq(defaultRate).click();
    });
    $(".loan-tab input[type=text]").val("");
    $(".loan-tab label:first").click();
};

$(window).load(function () {
    $(".select-cancel span").on("click", function () {
        $(".select-cover").hide();
        swipeAll();
    });
    $("#year").on("click", function () {
        $("#year-select").show();
        swiperYear.update();
    });
    $("#rate").on("click", function () {
        $("#rate-select").show();
        swiperRate.update();
    });
    $("#year1").on("click", function () {
        $("#year-select1").show();
        swiperYear1.update();
    });
    $("#rate1").on("click", function () {
        $("#rate-select1").show();
        swiperRate1.update();
    });
    $("#year2").on("click", function () {
        $("#year-select2").show();
        swiperYear2.update();
    });
    $("#rate2").on("click", function () {
        $("#rate-select2").show();
        swiperRate2.update();
    });
    $(".select-swiper li").on("click", function () {
        var txt = $(this).text();
        var pid = $(this).closest(".select-cover").attr("id");
        $(this).addClass("selected").siblings().removeClass("selected");
        if (pid == "year-select") {
            $("#year").text(txt);
        } else if (pid == "year-select1") {
            $("#year1").text(txt);
        } else if (pid == "year-select2") {
            $("#year2").text(txt);
        } else if (pid == "rate-select") {
            $("#rate").text(txt);
        } else if (pid == "rate-select1") {
            $("#rate1").text(txt);
        } else if (pid == "rate-select2") {
            $("#rate2").text(txt);
        }
        $(".select-cover").hide();
        swipeAll();
    });

    $(".loan-head li").each(function (e) {
        $(this).on("click", function () {
            $(this).addClass("on").siblings().removeClass("on");
            if (e == 2) {
                $(".loan-tab ul").hide().eq(1).show();
            } else {
                $(".loan-tab ul").hide().eq(0).show();
            }
            ;
            swipeDefault();
            swipeAll();
        })
    })
});
$(function () {
    function RateSet() {
        var year = parseInt($('#term').val()) / 12;
        var type = parseInt($('#calcType').val());
        var ratio = parseInt($('#ratio').val());

        var rate = Math.round(rateArray[type][year - 1] * ratio) / 100;
        if (type == 1) {
            rate = Math.round(rateArray[type][year - 1] * 100) / 100;
        }
        var text = "商业贷款利率" + rate + "%";
        if (type == 1) {
            text = "公积金贷款利率" + rate + "%";
        }
        $('.loan-rate').text(text);
    }

    function Calaculate() {
        var year = parseInt($('#term').val()) / 12;
        var type = parseInt($('#calcType').val());
        var ratio = parseInt($('#ratio').val());
        var mode = parseInt($('[name="calcMode"]:checked').val());
        var rate = 0;
        var amount = parseInt($('#amount').val());
        if (isNaN(amount) || amount <= 0) {
            alert("贷款金额不能为空或小于0");
            return;
        }
        var html = "";
        if (type == 2) {
            var syamount = parseFloat($('#txtsy').val());
            var gjjamount = parseFloat($('#txtgjj').val());
            mode = $('[name="calcMode2"]:checked').val();
            year = parseInt($('#term2').val()) / 12;
            ratio = parseInt($('#ratio2').val());

            var gjjdata = calculate(gjjamount, mode, year * 12, Math.round(rateArray[1][year - 1] * 100) / 100 / 100);
            var sydata = calculate(syamount, mode, year * 12, Math.round(rateArray[0][year - 1] * ratio) / 100 / 100);

            if (mode == 1) {
                var myyg = new Array();
                for (var i = 0; i < sydata.myyg.length; i++) {
                    myyg[i] = Math.round((sydata.myyg[i] + gjjdata.myyg[i]) * 100) / 100;
                }
                WriteEPCalcResult(mode, syamount + gjjamount, 0, year, sydata.TotalRepayment + gjjdata.TotalRepayment, (Math.round((sydata.TotalRepayment - syamount * 10000) * 100 + (gjjdata.TotalRepayment - gjjamount * 10000) * 100) / 100), myyg);

            } else {
                WriteMPCalcResult(mode, syamount + gjjamount, 0, year, gjjdata.TotalRepayment + sydata.TotalRepayment, (Math.round((sydata.TotalRepayment - syamount * 10000) * 100 + (gjjdata.TotalRepayment - gjjamount * 10000) * 100) / 100), gjjdata.RepaymentPerMonth + sydata.RepaymentPerMonth);
            }
        } else {
            if (type == 1) ratio = 100;
            rate = Math.round(rateArray[type][year - 1] * ratio) / 100;
            var data = calculate(amount, mode, year * 12, rate / 100);
            if (mode == 1) {
                WriteEPCalcResult(mode, amount, rate, year, data.TotalRepayment, (Math.round((data.TotalRepayment - amount * 10000) * 100) / 100), data.myyg);
            } else {
                WriteMPCalcResult(mode, amount, rate, year, data.TotalRepayment, (Math.round((data.TotalRepayment - amount * 10000) * 100) / 100), data.RepaymentPerMonth);
            }
        }
    }

    var date = new Date();
    $('.rate').text(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日基准利率");
    $('.rate-list>ul').each(function () {
        $(this).find('li:eq(0)').text(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日基准利率");
    });
    $('.year-list li').click(function () {
        $('#' + $(this).parents('.select-cover').attr("controlid")).val($(this).attr("data"));
        if ($('#calcType').val() != "2")
            RateSet();
    });

    $('.rate-list li').click(function () {
        $('#' + $(this).parents('.select-cover').attr("controlid")).val($(this).attr('data'));
        if ($('#calcType').val() != "2")
            RateSet();
    });

    $('.flex li').click(function () {
        $('#calcType').val($(this).attr("data"));
    });
    $('.calculate-btn').click(function () {
        Calaculate();
    });
    var rateSettings = ["1-1|4.35;2-5|4.75;6|4.9".split(';'), "1-5|2.75;6|3.25".split(';')];
    var rateArray = new Array();
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < rateSettings.length; j++) {
            if (!rateArray[j])
                rateArray[j] = new Array();
            for (var k = 0; k < rateSettings[j].length; k++) {
                var t = rateSettings[j][k].split('|');
                if (isNaN(parseInt(t[0]))) {
                    var arr = t[0].split('-');
                    var min = parseInt(arr[0]);
                    var max = parseInt(arr[1]);

                    if (min <= i + 1 <= max) {
                        rateArray[j][i] = t[1];
                    }
                } else {
                    if (i + 1 >= parseInt(t[0])) {
                        rateArray[j][i] = t[1];
                    }
                }
            }
        }
    }
    RateSet();
});

function WriteMPCalcResult(mode, amount, rate, year, repayment, interest, repaymentpermonth) {
    var html = "<li class='flex'><div class='tit'>贷款方式：</div><div class='fx1'>" + (mode == 0 ? "等额本息" : "等额本金");
    html += "</div></li>";
    html += "<li class='flex'><div class='tit'>贷款总额：</div><div class='fx1'>" + amount;
    html += "万元</div></li>";
    if (rate > 0) {
        html += "<li class='flex'><div class='tit'>利<span style='padding-left: 26px;'>率</span>：</div><div class='fx1'>" + rate;
        html += "%</div></li>";
    }
    html += "<li class='flex'><div class='tit'>按揭年数：</div><div class='fx1'>" + year + "年（" + (year * 12) + "期）";
    html += "</div></li>";
    html += "<li class='flex'><div class='tit'>利<span style='padding-left: 26px;'>息</span>：</div><div class='fx1'>" + interest;
    html += "元</div></li>";
    html += "<li class='flex'><div class='tit'>还款总额：</div><div class='fx1'>" + repayment;
    html += "元</div></li>";
    html += "<li class='flex'><div class='tit'>参考月供：</div><div class='fx1'>" + repaymentpermonth;
    html += "元</div></li>";
    $('.calculate-result ul').html(html);
    SetFormData(mode, amount, rate, year, repayment, interest, repaymentpermonth);
}

function WriteEPCalcResult(mode, amount, rate, year, repayment, interest, myyg) {
    var html = "<li class='flex'><div class='tit'>贷款方式：</div><div class='fx1'>" + (mode == 1 ? "等额本息" : "等额本金");
    html += "</div></li>";
    html += "<li class='flex'><div class='tit'>贷款总额：</div><div class='fx1'>" + amount;
    html += "万元</div></li>";
    if (rate > 0) {
        html += "<li class='flex'><div class='tit'>利<span style='padding-left: 26px;'>率</span>：</div><div class='fx1'>" + rate;
        html += "%</div></li>";
    }
    html += "<li class='flex'><div class='tit'>按揭年数：</div><div class='fx1'>" + year + "年（" + (year * 12) + "期）";
    html += "</div></li>";
    html += "<li class='flex'><div class='tit'>利<span style='padding-left: 26px;'>息</span>：</div><div class='fx1'>" + interest;
    html += "元</div></li>";
    html += "<li class='flex'><div class='tit'>还款总额：</div><div class='fx1'>" + repayment;
    html += "元</div></li>";

    html += "<li class='flex'><div class='tit'>首月月供：</div><div class='fx1'><div>" + myyg[0];

    html += "元<div></div></li>";
    $('.calculate-result ul').html(html);
    SetFormData(mode, amount, rate, year, repayment, interest, myyg[0]);
}
function SetFormData(mode, amount, rate, year, repayment, interest, repaymentpermonth) {
    $('#bjd [name="mode"]').val(mode)
    $('#bjd [name="amount"]').val(amount)
    $('#bjd [name="rate"]').val(rate)
    $('#bjd [name="year"]').val(year)
    $('#bjd [name="interest"]').val(interest)
    $('#bjd [name="repayment"]').val(repayment)
    $('#bjd [name="repaypermonth"]').val(repaymentpermonth);
}


$('#btnwygf').click(function () {
    if ($('#wygf').hasClass("show")) {
        $('#wygf').hide();
        $('#wygf').removeClass('show');
        $("nav").css("position", "fixed");
    } else {
        $('#wygf').show();
        $('#wygf').addClass('show');
        $("nav").css("position", "absolute");
    }
});