var banusCount = 2; //抽奖次数；
var leftCount = 2;//剩余抽奖次数；

var App = {
    init: function () {
        this.bindEvent();
        //抽奖次数限定
        $('.no-count-box').find('.js-banus-count').html(banusCount);
    },
    bindEvent: function () {
        this.bindFlip();
        this.bindFlipRule();
        this.bindClose();
    },
    bindFlip: function () {
        //显示抽奖弹层
        $('#showFlip').click(function () {
            $('.banus-box').addClass('show');
        })
        //抽奖
        $('.flip-grid-box').on('click', '.front', function () {
            var $this = $(this),
                $backImg = $this.next(),
                $banusMask = $('.flip-banus-mask');

            //抽奖次数限制；
            if (leftCount == 0) {
                $('.no-count-box').addClass('show');
                return false;
            }
            leftCount--;

            $this.parents('.fgrid').attr('sel', 'sel')
            $banusMask.find('.info p').html($backImg.attr('title'));
            $banusMask.find('.bunus-img').attr('src', $backImg.attr('src'));
            $banusMask.find('.see-detail').attr('href', $banusMask.find('.see-detail').attr('href') + '?id=' + $backImg.data('id'));
            $banusMask.addClass('show');
            return false;
        })
    },
    bindFlipRule: function () {
        //显示抽奖规则
        $('.js-rule').on('click', function () {
            $('.flip-rule-mask').addClass('show');
            return false;
        })

        //抽奖规则关闭
        $('.flip-rule-mask .icon-close').click(function () {
            $(this).parents('.flip-rule-mask').removeClass('show');
            return false;
        })
    },
    bindClose: function () {
        //抽奖弹层关闭
        $('.flip-close').click(function () {
            var $this = $(this),
                $banusBox = $this.parents('.banus-box')
            $banusBox.removeClass('show');
            $banusBox.find('.fgrid').removeClass('sel').attr('sel', '')
            $banusBox.find('.fgrid img').removeClass('show')
            return false;
        })

        //中奖弹层关闭
        $('.flip-banus-mask .bunus-close').click(function () {
            $(this).parents('.flip-banus-mask').removeClass('show');
            $('.flip-grid-box').find('img').addClass('show')
            setTimeout(function () {
                $('.flip-grid-box').find('[sel="sel"]').addClass('sel')
            }, 800)
            return false;
        })

        //抽奖次数用完关闭
        $('.no-count-box .icon-close').click(function () {
            $(this).parents('.no-count-box').removeClass('show');
            $(this).parents('.banus-box').removeClass('show');
            return false;
        })
    }
}
App.init();