let alive = 0;
let starObj = function () {
};
//初始化
starObj.prototype.init = function () {
    this.x = Math.random() * 450 + 50;
    this.y = Math.random() * 600 + 50;

    this.picNo = Math.floor(Math.random() * 7);
    this.timer = 0;
    this.xSpd = Math.random() * 2 - 1;
    this.ySpd = Math.random() * 2 - 1;
};
//更新动画帧
starObj.prototype.update = function () {
    this.x += this.xSpd * deltaTime * 0.006;
    this.y += this.ySpd * deltaTime * 0.006;

    //this.x 超过范围， init（重生）
    if (this.x < 50 || this.x > 500) {
        this.init();
        return;
    }
    if (this.y < 50 || this.y > 650) {
        this.init();
        return;
    }
    this.timer += deltaTime;
    if (this.timer > 50) {
        this.picNo += 1;
        this.picNo %= 7;
        this.timer = 0;
    }
};
//绘制
starObj.prototype.draw = function () {
    ctx.save();

    ctx.globalAlpha = alive;
    //drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
    ctx.restore();
};

//绘制星星
function drawStars() {
    for (let i = 0; i < num; i++) {
        stars[i].update();
        stars[i].draw();
    }
}

//to be or not to be.
function aliveUpdate() {
    if (confine) {
        alive += 0.03 * deltaTime * 0.05;
        alive = Math.min(1, alive);
    } else {
        alive -= 0.03 * deltaTime * 0.05;
        alive = Math.max(0, alive);
    }
}