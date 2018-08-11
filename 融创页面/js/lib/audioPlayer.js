$('<audio id="musicAudio" autoplay="autoplay" loop="loop">\n' +
    '        <source src="source/music_bg.mp3" type="audio/mpeg">\n' +
    '    </audio>').appendTo('body');
$(window).on('load', function () {
    function audioAutoPlay() {
        var audio = $('#musicAudio')[0];
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }

    audioAutoPlay();
})