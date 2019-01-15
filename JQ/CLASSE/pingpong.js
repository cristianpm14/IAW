

var canvas, context;
var fieldWidth, fieldHeight;

canvas = $("#camp")[0];

fieldWidth = canvas.width;
fieldHeight = canvas.height;
context = canvas.getContext('2d');

var xBall, yBall;
var ballWidth, ballHeight;
var incball, incX, incY;

var stickWidth, stickHeight, stickSeparation;
var incStick;
var leftStickX, leftStickY, rightStickX, rightStickY;
var goalsLeft, goalsRight;
var leftpoint, rightpoint;

LEFT_UP = 'W';
LEFT_DOWN = 'Z';
RIGHT_UP = 'I';
RIGHT_DOWN = 'M';
SOUND='O';

leftpoint = 0;
rightpoint = 0;

intball();
initSticks();
loopGame();

function loopGame(){

    drawfield();
    drawLeftStick();
    drawRightStick();
    drawball();
    updateBall();
    drawScore();

    setTimeout(loopGame, 4);
}

function  updateBall() {
    xBall += incX;
    yBall += incY;
    if (yBall<ballWidth/2){
        incY*=-1;
    }
    else if (yBall> fieldHeight - ballWidth/2){
    incY*=-1;
    }
    if (xBall<ballWidth/2){
    incX*=-1;
    }
    else if (xBall> fieldWidth - ballWidth/2){
        incX*=-1;
    }
    if (yBall>leftStickY && yBall < leftStickY+stickHeight && xBall<leftStickX + stickWidth){
        incX*=-1;
    }
    if (yBall >= rightStickY && yBall <= rightStickY + stickHeight -1 && xBall + stickWidth >= rightStickX){
        incX*=-1;
    }
    if (xBall<ballWidth/2){
        leftpoint++;
        intball();
    }
    if (xBall>=fieldWidth - ballWidth/2){
        rightpoint++;
        intball();
    }
}

function drawfield(){
context.fillStyle = "red";
context.clearRect(0,0,fieldWidth,fieldHeight);
context.fillRect(fieldWidth/2,0,2,fieldHeight);
}
function drawScore() {
    context.fillStyle = "white";
    context.font = "48px Georgia";
    context.fillText(leftpoint, fieldWidth/4, 30);
    context.fillText(rightpoint, 3*fieldWidth/4, 30);
}

function  intball() {
    xBall = fieldWidth/2;
    yBall = fieldHeight/2;
    ballWidth = 20;
    ballHeight = 20;
    incball = 1;
    incX = -1 + 2*Math.random();
    incY = -1 + 2*Math.random();
    goalsLeft=0;
    goalsRight=0;
}

function drawball() {
    context.fillStyle = "aqua";
    context.fillRect(xBall, yBall, ballHeight, ballWidth);
}

function initSticks() {
    stickWidth = 20;
    stickHeight = 100;
    stickSeparation = 20;
    incStick=5;
    incStick=5;
    leftStickX =stickSeparation;
    leftStickY = fieldHeight/2 - stickHeight/2;
    rightStickX = fieldWidth - stickSeparation - stickWidth;
    rightStickY = fieldHeight/2 - stickHeight/2;
}

function drawLeftStick() {
    context.fillStyle = "white";
    context.fillRect(leftStickX,leftStickY, stickWidth, stickHeight);
}

function drawRightStick() {
    context.fillStyle = "white";
    context.fillRect(rightStickX,rightStickY, stickWidth, stickHeight);
}

function moveUpLeftStick() {
    leftStickY-=incStick;
    if (leftStickY<0){
        leftStickY=1;
    }
}

function  moveDownLeftStick() {
    leftStickY+=incStick;
    if (leftStickY>fieldHeight - stickHeight){
        leftStickY = fieldHeight - stickHeight -1
    }
}

function moveUpRightStick() {
    rightStickY-=incStick;
    if (rightStickY<0){
        rightStickY=1;
    }
}

function  moveDownRightStick() {
    rightStickY+=incStick;
    if (rightStickY>fieldHeight - stickHeight){
        rightStickY = fieldHeight -stickHeight -1
    }
}
