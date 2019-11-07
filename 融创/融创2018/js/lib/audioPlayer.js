$('<audio id="musicAudio" loop="loop">\n' +
    '        <source src="source/music_bg.mp3" type="audio/mpeg">\n' +
    '    </audio>').appendTo('body');

$(window).on('load', function () {
    var audio = $('#musicAudio')[0];
    var isAudioPlay = sessionStorage.getItem('isAudioPlay') != 'stop';

    function addAudioIcon() {
        var $auidoIcon = $('<div class="audio-icon"></div>').appendTo('body');
        isAudioPlay && $auidoIcon.addClass('rotate');

        $auidoIcon.click(function () {
            isAudioPlay = sessionStorage.getItem('isAudioPlay') != 'stop';

            isAudioPlay ? audio.pause() : audio.play();
            $auidoIcon.toggleClass('rotate', !isAudioPlay)
            sessionStorage.setItem('isAudioPlay', isAudioPlay ? 'stop' : 'play')
        })
    }

    function audioAutoPlay() {
        isAudioPlay && audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            isAudioPlay && audio.play();
        }, false);
    }


    /* pushHistory();  //这个必须在文档加载时就触发，创建出来的新的history实体
     window.addEventListener("popstate", function (e) {  //popstate 只有在history实体被改变时才会触发
         var $auidoIcon = $('.audio-icon');
         //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
         isAudioPlay = sessionStorage.getItem('isAudioPlay') != 'stop';

         isAudioPlay ? audio.pause() : audio.play();
         $auidoIcon.toggleClass('rotate', !isAudioPlay)
         sessionStorage.setItem('isAudioPlay', isAudioPlay ? 'stop' : 'play')
     }, false);

     function pushHistory() {
         var state = {
             title: "title",
             url: "#"
         };
         window.history.pushState(state, "title", "#");
     }*/

    function pushHistory() {
        window.addEventListener("popstate", function (e) {
            self.location.reload();
        }, false);
        var state = {
            title: "",
            url: "#"
        };
        window.history.replaceState(state, "", "#");
    };

    pushHistory();
    audioAutoPlay();
    addAudioIcon();
})