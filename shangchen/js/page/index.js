/**
 * @author  gaojun-pd on 2016/12/16
 *
 * @descript
 * @version 1.0
 * @example:
 */
jQuery(function ($) {
	var main = {
		init: function () {
			this.initBanner();
			this.initMiniSlider();
			this.initWinEvent();
			this.initGotop();
		},

		initBanner: function () {
			//大图轮播
			$(".js-banner").slide({
				effect: "left",
				autoPlay: true,
				titCell: '.hd a',
				interTime: 4000,
				delayTime: 1000/*,
				 effect: "fold"*/
			});
		},

		initMiniSlider: function () {
			//页面内小轮播
			$(".scrollImg").slide({
				effect: "left",
				autoPlay: true,
				mainCell: '.wMax',
				titCell: '.point a',
				titOnClassName: 'current',
				interTime: 4000,
				delayTime: 1000,
				mouseOverStop: false
			});
		},

		initWinEvent: function () {
			var that = this,
				$win = $(window),
				$body = $('body'),
				$btnSide = $('.btn-side');

			if ($body.scrollTop() > 300) {
				$btnSide.fadeIn();
			}
			//页面resize
			$win.on('resize', function () {
				//that.initBanner();
			});

			$win.on('scroll', function () {
				if ($body.scrollTop() > 300) {
					$btnSide.fadeIn();
				} else {
					$btnSide.hide();
				}
			})
		},

		//gotop
		initGotop: function () {
			$('.gotop').click(function () {
				$('html,body').animate({'scrollTop': 0})
			})
		}
	};

	main.init();
})