let board;
let boardWidth = 360;
let boardHeight = 640;
let econtext;

let birdWidth = 34;
let birdgHeight = 24;
let birdX = boardWidth/8
let birdY = boardHeight/2
let birdImg;

let bird = {
    X : birdX,
    y : birdY,
    width : birdWidth,
    height: birdHeight
}

let pipeArray = [];
let pipeWidth = 64;
let pipeHeigt = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2;


window.onload = function (){
    board = document.GetElementById("board");
    board.height = board.Height;
    board.width = board.Width;
    context = board.getContext("2d");

    context.fillstyle = "purple"
    context.fillRect(bird.X, bird.y, bird.width, bird.height);

    birdImg = new Image()
    birdImg.src = "./flappybird.png"
    birdImg.onload = function() {
        context.drawImage(bird.Img, bird.X, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottomPipeImg.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);

}

function update() {
    requestAnimationFrame(update)
    context.clearRect(0,0, board.width, board.height);

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe,height);
    }
}

function placePipes () {

    let topPipe= {
        img : topPipeImg,
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    
    pipeArray.push(topPipe);

}