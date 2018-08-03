let can,
    ctx;

let w,
    h;

// create image container
let girlPic = new Image(),
    starPic = new Image();

// define the number of stars
let num = 120;

let stars = [];

let lastTime,
    deltaTime;

let confine = false;

// define the image location and size
let padLeft = 50, padTop = 50, girlWidth = 450, girlHeight = 600;

// load and execution
document.body.onload = init;

function init() {
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");

    w = can.width;
    h = can.height;

    document.addEventListener("mousemove", mouseMove, false);

    girlPic.src = "img/girl.jpg";
    starPic.src = "img/star.png";

    for (let i = 0; i < num; i++) {
        let obj = new starObj();
        stars.push(obj);
        stars[i].init();
    }

    lastTime = Date.now();
    gameLoop();
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    let now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    drawBackground();
    drawGirl();
    drawStars();
    aliveUpdate();
}

function drawBackground() {
    ctx.fillStyle = "rgb(142,210,247)";
    ctx.fillRect(0, 0, w, h);
}

function drawGirl() {
    //drawImage(img, x, y, width, height);
    ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}

function mouseMove(e) {
    if (e.offsetX || e.offsetY) {
        let px = e.offsetX === undefined ? e.layerX : e.offsetX;
        let py = e.offsetY === undefined ? e.layerY : e.offsetY;

        confine = (px > padLeft && px < (padLeft + girlWidth) && py > padTop && py < (padTop + girlHeight));
    }
}