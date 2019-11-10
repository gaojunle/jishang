/**
 * Created by gaojun-pd on 2017/3/23.
 */
var App = {
    init: function () {
        this.initSwiper();
        this.initMap();
    },
    initSwiper: function () {
        function setCurrentSlide(ele, index) {
            $(".swiper1 .swiper-slide").removeClass("selected");
            ele.addClass("selected");
        }

        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 4.4,
            spaceBetween: 0,//slide之间的距离（单位px）。
            freeMode: true,//默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
            loop: false,//是否可循环
            onTab: function (swiper) {
                var n = swiper1.clickedIndex;
            }
        });
        swiper1.slides.each(function (index, val) {
            var ele = $(this);
            ele.on("click", function () {
                setCurrentSlide(ele, index);
                swiper2.slideTo(index, 500, false);
            });
        });

        var swiper2 = new Swiper('.swiper2', {
            //freeModeSticky  设置为true 滑动会自动贴合
            direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
            loop: false,
            onSlideChangeEnd: function (swiper) {  //回调函数，swiper从一个slide过渡到另一个slide结束时执行。
                var n = swiper.activeIndex;
                setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
                swiper1.slideTo(n, 500, false);
            }
        });
    },
    initMap: function () {
        var city = mapData.city,
            projectImg = mapData.projectImg,
            projectAddr = mapData.projectAddr;

        var myGeo = new BMap.Geocoder();// 创建地址解析器实例

        $.each(mapData.labels, function (i, v) {
            var map = new BMap.Map(v.mapId);    // 创建Map实例，底图去掉点击事件
            map.setCurrentCity(city);          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放

            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(projectAddr, function (point) {
                if (point) {
                    map.centerAndZoom(point, 15);
                    var myIcon = new BMap.Icon(projectImg, new BMap.Size(50, 50));
                    var procMarker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
                    map.addOverlay(procMarker);
                } else {
                    alert("项目地址无法定位!");
                }
            }, city);

            $.each(v.list, function (key, val) {
                myGeo.getPoint(val.name, function (point) {
                    if (point) {
                        var myIcon = new BMap.Icon('./img/common/map-icon.png', new BMap.Size(20, 20));
                        var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注

                        marker.detailData = val.detail

                        marker.addEventListener("click", function (e) {
                            var marker = e.target;
                            if (marker.getLabel()) {
                                marker.getLabel().remove();
                                $('.project-desc').hide();
                                return;
                            }
                            var markers = map.getOverlays();
                            for (var i = 0; i < markers.length; i++) {
                                var _marker = markers[i];
                                if (_marker.toString() == "[object Marker]" && _marker.getLabel()) {
                                    _marker.getLabel().remove();
                                }
                            }
                            //添加标签上详细内容
                            if (marker.detailData && marker.detailData.length > 0) {
                                var nameStr = '<p>' + val.name + '</p>';
                                var label = new BMap.Label(nameStr, {offset: new BMap.Size(20, 0)});
                                label.setStyle({
                                    backgroundColor: 'rgba(42, 42, 42, 0.7)',
                                    border: 'none',
                                    fontSize: "12px",
                                    lineHeight: "1.6",
                                    fontFamily: "微软雅黑",
                                    padding: '1px 8px',
                                    borderRadius: '5px',
                                    color: '#28c2fc'
                                });
                                marker.setLabel(label);
                            }

                            var detailStr = ''
                            $.each(marker.detailData, function () {
                                detailStr += '<p>' + this + '</p>'
                            })
                            $('.project-desc').html(detailStr).show();
                        });
                        map.addOverlay(marker);              // 将标注添加到地图中
                    } else {
                        console.log(val.name + "无法定位!");
                    }
                }, city);
            })
        })
    }
};
App.init();