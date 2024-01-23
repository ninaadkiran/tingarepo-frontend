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
}