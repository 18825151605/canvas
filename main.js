var canvas = document.querySelector('#canvas');
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//生成红球的数组
var redArr = [];
function bornRed(num) {
    for (var i = 0; i < num; i++) {
        var json = {
            x: parseInt(Math.random() * 500),//x随机数
            y: parseInt(Math.random() * 100),
            cansee: true
        };
        redArr.push(json);
    }
}
bornRed(6);
var getLongArr = [];
var blue = {
    x: null,
    y: null,
}
function check() {
    //获得两球的距离
    // console.log(getLongArr);
    for (var i = 0; i < redArr.length; i++) {
        getLongArr[i] = Math.sqrt(Math.pow(Math.abs(ballCurY - redArr[i].y), 2) + Math.pow(Math.abs(ballCurX - redArr[i].x), 2));
        if (getLongArr[i] < ball.radius * 2) {  //蓝球碰到红球 把bedball设置为false else true;
            redArr[i].cansee = false;
        }
    }
    // console.log(getLong);

}
var ball = {
    radius: 25,
    color: 'blue',
    rcolor: 'red', //掉落球颜色
    draw: function (blueX, blueY) {
        ctx.clearRect(0, 0, w, h);
        for (var k = 0; k < redArr.length; k++) {
            if (redArr[k].cansee) {
                ctx.beginPath();
                ctx.arc(redArr[k].x, redArr[k].y, this.radius, 0, Math.PI * 2, true); //x,y变量
                ctx.closePath();
                ctx.fillStyle = 'red';
                ctx.fill();
            }
        }

        if (blueX) {
            ctx.beginPath();
            ctx.arc(blueX, blueY, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
};

var ballCurX;
var ballCurY;
var tapNum = 0; //点击状态
var qcx = 0;
var qcy = 0;
var getQ = true;
canvas.onclick = function (e) {
    var tapX = e.clientX;
    var tapY = e.clientY;
    if (tapNum == 0) {
        ball.draw(tapX, tapY);
        ballCurX = tapX;
        ballCurY = tapY;
        canvas.onmousemove = function (e) {
            ballCurX = e.clientX;
            ballCurY = e.clientY;
            ball.draw(ballCurX, ballCurY);
        }

        tapNum = 2;
    } else if (tapNum == 2) {
        ballCurX = e.clientX - qcx;
        ballCurY = e.clientY - qcy;
        canvas.onmousemove = null;
        getQ = true;
        tapNum = 3;
    } else if (tapNum == 3) {
        // console.log(tapX, ballCurX);
        var ballCur = {
            xmin: ballCurX - 25,
            xmax: ballCurX + 25,
            ymin: ballCurY - 25,
            ymax: ballCurY + 25
        }
        if (ballCur.xmin < tapX && tapX < ballCur.xmax && ballCur.ymin < tapY && tapY < ballCur.ymax) {
            canvas.onmousemove = function (e) {
                var mX = e.clientX;
                var mY = e.clientY;
                if (getQ) {
                    qcx = tapX - ballCurX;
                    qcy = tapY - ballCurY;
                    getQ = false;
                }
                // console.log(tapX, tapY, qcx, qcy, ballCurX, ballCurY);
                ball.draw(mX - qcx, mY - qcy);

                ballCurX = e.clientX - qcx;
                ballCurY = e.clientY - qcy;
            }

            tapNum = 2;
        }
    }
}


setInterval(function () {
    for (var i = 0; i < redArr.length; i++) {
        redArr[i].y++;
    }
    check();
    ball.draw(ballCurX, ballCurY);
}, 10)