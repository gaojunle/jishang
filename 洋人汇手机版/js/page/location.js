/**
 * Created by gaojun-pd on 2017/3/23.
 */

var App = {
    init: function () {
        this.bindEvent();
        //this.initMap();
    },
    //绑定事件操作
    bindEvent: function () {
        var map = new BMap.Map("BMap"),
            geolocation = new BMap.Geolocation(),
            geoc = new BMap.Geocoder(),
            $pStart = $('#pStart'),
            $pEnd = $('#pEnd');

        map.centerAndZoom("北京", 13);

        //获取当前定位
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                geoc.getLocation(r.point, function (rs) {
                    var addComp = rs.addressComponents;
                    var addrStr = addComp.city + addComp.district + addComp.street;
                    $pStart.val(addrStr);
                });
            }
            else {
                $pStart.attr('placeholder', '请输入开始位置');
                alert('无法定位到您的当前位置，导航失败，请手动输入您的当前位置！' + this.getStatus());
            }
        }, {enableHighAccuracy: true})

        //切换到达方式
        $('.ways-search').on('click', 'li', function () {
            var $this = $(this),
                $rst = $('#r-result');

            if ($this.hasClass('on')) {
                $rst.toggle();
                $this.removeClass('on')
                return false;
            }

            $this.addClass('on').siblings().removeClass('on');
            $rst.show().empty();

            switch ($this.data('type')) {
                case 'bus':
                    searchRouteBus();
                    break;
                case 'driver':
                    searchRouteDriver();
                    break;
                case 'walk':
                    searchRouteWalk();
                    break;
            }
        })
        function searchRouteBus() {
            var start = $pStart.val(),
                end = $pEnd.text();

            var transit = new BMap.TransitRoute(map, {
                renderOptions: {map: map, panel: "r-result"},
                policy: BMAP_TRANSIT_POLICY_LEAST_TIME
            });
            transit.search(start, end);
        }

        function searchRouteDriver() {
            var start = $pStart.val(),
                end = $pEnd.text()

            var driving = new BMap.DrivingRoute(map, {
                renderOptions: {
                    map: map,
                    panel: "r-result",
                    autoViewport: true
                }
            });
            driving.search(start, end);
        }

        function searchRouteWalk() {
            var start = $pStart.val(),
                end = $pEnd.text()

            var walking = new BMap.WalkingRoute(map, {
                renderOptions: {
                    map: map,
                    panel: "r-result",
                    autoViewport: true
                }
            });
            walking.search(start, end);
        }
    },
    initMap: function () {

    }
};
App.init();