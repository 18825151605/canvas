function Gameball(json) {
    this.canvas = document.querySelector(json.obj);
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerWidth;
    this.ctx = this.canvas.getContext('2d');
    this.fen = 0;
    this.resuch = json.resuch;
    this.resuchTime = json.resuchTime||3000;
    this.redArr = [];
    this.redball = json.redball;
    this.getLongArr = [];
    this.blue = {
        x: null,
        y: null,
    };
    this.ballCurX;
    this.ballCurY;
    this.tapNum = 0;
    this.qcx = 0;
    this.qcy = 0;
    this.getQ = true;
    var that = this;
    this.ball = {
        radius: 25,
        color: 'blue',
        rcolor: 'red', //掉落球颜色
        draw: function (blueX, blueY) {
            that.ctx.clearRect(0, 0, that.w, that.h);
            // console.log(that.redArr);
            for (var k = 0; k < that.redArr.length; k++) {
                // console.log(111);
                if (that.redArr[k].cansee) {
                    that.ctx.beginPath();
                    that.ctx.arc(that.redArr[k].x, that.redArr[k].y, that.ball.radius, 0, Math.PI * 2, true); //x,y变量
                    that.ctx.closePath();
                    that.ctx.fillStyle = 'red';
                    that.ctx.fill();
                }
            }
            // console.log(blueX);
            if (blueX) {
                // console.log(3);
                that.ctx.beginPath();
                that.ctx.arc(blueX, blueY, this.radius, 0, Math.PI * 2, true);
                that.ctx.closePath();
                that.ctx.fillStyle = this.color;
                that.ctx.fill();
            }

            that.ctx.beginPath();
            that.ctx.font = "30px Courier New";
            that.ctx.fillStyle = "blue";
            that.ctx.fillText(that.fen, 800, 50);
            that.ctx.closePath();
        }
    };
    this.init();
    this.bornRed();
    this.check();
}
Gameball.prototype = {
    init: function () {
        var that = this;
        setInterval(function () {
            // console.log(that);
            that.rush();
        }, 10);
        this.check();
        if (that.resuch) {
            setInterval(function () {
                for (var i = 0; i < that.redArr.length; i++) {
                    that.redArr[i].cansee = true;
                    that.redArr[i].y = parseInt(Math.random() * 100);
                    that.redArr[i].x = parseInt(Math.random() * 500);

                }
            }, that.resuchTime); //刷新页面球
        }

        this.canvas.onclick = function (e) {
            console.log(that);
            var tapX = e.clientX;
            var tapY = e.clientY;
            if (that.tapNum == 0) {
                that.ball.draw(tapX, tapY);
                that.ballCurX = tapX;
                that.ballCurY = tapY;
                that.canvas.onmousemove = function (e) {
                    that.ballCurX = e.clientX;
                    that.ballCurY = e.clientY;
                    that.ball.draw(that.ballCurX, that.ballCurY);
                }

                that.tapNum = 2;
            } else if (that.tapNum == 2) {
                that.ballCurX = e.clientX - that.qcx;
                that.ballCurY = e.clientY - that.qcy;
                that.canvas.onmousemove = null;
                that.getQ = true;
                that.tapNum = 3;
            } else if (that.tapNum == 3) {
                // console.log(tapX, ballCurX);
                var ballCur = {
                    xmin: that.ballCurX - 25,
                    xmax: that.ballCurX + 25,
                    ymin: that.ballCurY - 25,
                    ymax: that.ballCurY + 25
                }
                if (ballCur.xmin < tapX && tapX < ballCur.xmax && ballCur.ymin < tapY && tapY < ballCur.ymax) {
                    that.canvas.onmousemove = function (e) {
                        var mX = e.clientX;
                        var mY = e.clientY;
                        if (that.getQ) {
                            that.qcx = tapX - that.ballCurX;
                            that.qcy = tapY - that.ballCurY;
                            that.getQ = false;
                        }
                        // console.log(tapX, tapY, qcx, qcy, ballCurX, ballCurY);
                        that.ball.draw(mX - that.qcx, mY - that.qcy);

                        that.ballCurX = e.clientX - that.qcx;
                        that.ballCurY = e.clientY - that.qcy;
                    }

                    that.tapNum = 2;
                }
            }
        };

    },
    rush: function () {
        for (var i = 0; i < this.redArr.length; i++) {
            this.redArr[i].y++;
        }
        this.check();
        this.ball.draw(this.ballCurX, this.ballCurY);
    },
    bornRed: function () {
        for (var i = 0; i < this.redball; i++) {
            var json = {
                x: parseInt(Math.random() * 500),//x随机数
                y: parseInt(Math.random() * 100),
                cansee: true
            };
            this.redArr.push(json);
        }
    },
    check: function () {
        for (var i = 0; i < this.redArr.length; i++) {
            this.getLongArr[i] = Math.sqrt(Math.pow(Math.abs(this.ballCurY - this.redArr[i].y), 2) + Math.pow(Math.abs(this.ballCurX - this.redArr[i].x), 2));
            if (this.getLongArr[i] < this.ball.radius * 2) {  //蓝球碰到红球 把bedball设置为false else true;
                this.redArr[i].cansee = false;
                this.redArr[i].x = 0;
                this.redArr[i].y = 0;
                this.fen++;
                // console.log(this.fen);
            }
        }
    }
}


var demo1 = new Gameball({
    obj: '#canvas',
    redball: 6,
    resuch: true,
})