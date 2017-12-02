window.onload = function () {
    console.log("网页可见区域宽：" + document.body.clientWidth);
    console.log("网页可见区域高：" + document.body.clientHeight);
    console.log("网页可见区域宽(包括边线的宽)：" + document.body.offsetWidth);
    console.log("网页可见区域高(包括边线的宽)：" + document.body.offsetHeight);
    console.log("网页正文全文宽：" + document.body.scrollWidth);
    console.log("网页正文全文高：" + document.body.scrollHeight);
    console.log("网页被卷去的高：" + document.body.scrollTop);
    console.log("网页被卷去的左：" + document.body.scrollLeft);
    console.log("网页正文部分上：" + window.screenTop);
    console.log("网页正文部分左：" + window.screenLeft);
    console.log("屏幕分辨率的高：" + window.screen.height);
    console.log("屏幕分辨率的宽：" + window.screen.width);
    console.log("屏幕可用工作区高度：" + window.screen.availHeight);
    console.log("屏幕可用工作区宽度：" + window.screen.availWidth);

    // 获取对象
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");

    var music = document.getElementById("music");
    var audio = document.getElementsByTagName("audio")[0];

    //当音乐播放完停止时候，自动停止音乐播放效果
    audio.addEventListener("ended", function (event) {
        music.setAttribute("class", "");
    }, false);

    // 点击音乐图标，控制音乐播放效果
    // music.onclick = function () {
    //     if (audio.paused) {
    //         audio.play();
    //         this.setAttribute("class", "play");
    //         // this.style.animationPlayState = "running";//兼容性较差
    //         // this.style.webkitAnimationPlayState = "running";//为了兼容iphone
    //     } else {
    //         audio.pause();
    //         this.setAttribute("class", "");
    //         // this.style.animationPlayState = "paused";
    //         // this.style.webkitAnimationPlayState = "paused";
    //     }
    // };
    music.addEventListener("touchstart", function (event) {
        if (audio.paused) {
            audio.play();
            this.setAttribute("class", "play");
            // this.style.animationPlayState = "running";//兼容性较差
            // this.style.webkitAnimationPlayState = "running";//为了兼容iphone
        } else {
            audio.pause();
            this.setAttribute("class", "");
            // this.style.animationPlayState = "paused";
            // this.style.webkitAnimationPlayState = "paused";
        }
    }, false);
    // 点击屏幕从第一页翻转到第二页
    page1.addEventListener("touchstart", function (event) {
        page1.style.display = "none";
        page2.style.display = "block";
        page3.style.display = "block";
        page3.style.top = "100%";

        // 第二页自动翻转到第三页
        setTimeout(function () {
            page2.setAttribute("class", "page fadeOut");
            page3.setAttribute("class", "page fadeIn");
        }, 5500);
    }, false);
};