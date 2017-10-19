var canvas = document.querySelector('#canvas');
var w = canvas.width = document.body.clientWidth;
var h = canvas.height = document.body.clientWidth;
var ctx = canvas.getContext('2d');
var bedball = true;
var red = {
    x: parseInt(Math.random() * 500),//x随机数,
    y: 0
}
var blue = {
    x: null,
    y: null,
}
var ball = {
    radius: 25,
    color: 'blue',
    rcolor: 'red', //掉落球颜色
    draw: function (redX, redY, blueX, blueY) {
        ctx.clearRect(0, 0, w, h);
        if (bedball) {
            ctx.beginPath();
            ctx.arc(redX, redY, this.radius, 0, Math.PI * 2, true); //x,y变量
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
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
        ball.draw(red.x, red.y, tapX, tapY);
        ballCurX = tapX;
        ballCurY = tapY;
        canvas.onmousemove = function (e) {

            ballCurX = e.clientX;
            ballCurY = e.clientY;
            ball.draw(red.x, red.y, ballCurX, ballCurY);
        }

        tapNum = 2;
    } else if (tapNum == 2) {
        ballCurX = e.clientX - qcx;
        ballCurY = e.clientY - qcy;
        canvas.onmousemove = null;
        getQ = true;
        tapNum = 3;
    } else if (tapNum == 3) {
        console.log(tapX, ballCurX);
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


                console.log(tapX, tapY, qcx, qcy, ballCurX, ballCurY);
                ball.draw(red.x, red.y, mX - qcx, mY - qcy);

                ballCurX = e.clientX - qcx;
                ballCurY = e.clientY - qcy;
            }

            tapNum = 2;
        }
    }
}


setInterval(function () {
    // red.y++;
    // // if(){  //红球碰到篮球 红球消失

    // // }else{

    // // }
    // ball.draw(red.x, red.y, ballCurX, ballCurY);
}, 10)