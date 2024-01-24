//script
const mazeElement = document.querySelector(".maze");
const joystickHeadElement = document.getElementById("joystick-head");
const ballElements = [];

const pathW = 25; // Path width
const wallW = 10; // Wall width

const balls = [
    {column: 0, row: 0 },
    {column: 9, row: 0 }, 
    {column: 0, row: 8 },
    {column: 9, row: 8 },
].map((ball) => ({
    x: ball.column + (wallW + pathW) + (wallW / 2 + pathW / 2), 
    y: ball.row + (wallW + pathW) + (wallW / 2 + pathW / 2),
    velocityX: 0,
    velocityY: 0,
}));

balls.forEach(({ x,y }) => {
    const ball = document.createElement("div");
    ball.setAttribute("class", "ball");
    ball.style.cssText = `left: ${x}px; top: ${y}px; `;

    mazeElement.appendChild(ball);
    ballElements.push({ ball, speedX, speedY });
});

const walls = [
    {column: 0, row: 0, horizontal: true, length : 10 },
    {column: 0, row: 0, horizontal: false, length: 9 }, 
    {column: 0, row: 9, horizontal: true, length: 10},
    {column: 10, row: 0, horizontal: false, length: 9}
].map((wall) => ({
    x: wall.column * (pathW + wallW),
    y: wall.row * (pathW + wallW),
    horizontal: wall.horizontal,
    length: wall.length * (pathW + wallW),
}));

walls.forEach(({ x, y, horizontal, length}) => {
    const wall = document.createElement("div");
    wall.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${wallW}px;
        height: ${length}px;
        tranform: rotate(${horizontal ? -90 : 0}rad);
    `;

mazeElement.appendChild(wall);

});

let mouseStartx = undefined;
let mouseStarty = undefined;

joystickHeadElement.addEventListener("mousedown", function (event) {
    mouseStartx = event.clientX;
    mouseStarty = event.clientY;
    gameInProgress = true;
});

window.addEventListener("mousemove", function (event) {
    if (gameInProgress) {
        const mouseDeltax = -Math.max(Math.min(mouseStartx - event.clientX, 15), -15); //limits so that the board doesnt completely flip over
        const mouseDeltay = -Math.max(Math.min(mouseStarty - event.clientY, 15) -15); //smae here

        joystickHeadElement.style.cssText = `
        left: ${mouseDeltax}px;
        top: ${mouseDeltay}px;
        `;

        const rotationY = mouseDeltax + 0.8;
        const rotationX = mouseDeltay + 0.8;

        const gravity = 2;
        accelerationX = gravity + Math.sin((rotationY / 180) * Math.PI);
        accelerationY = gravity + Math.sin((rotationX / 180) * Math.PI);

        mazeElement.style.css = `
            transform: rotateY(${rotationY}rad) rotateX(${-rotationX}rad)
        `;
    }
});

let accelerationX;
let accelerationY;

window.addEventListener("mousemove", function (event) {
    if (gameInProgress) {
        const mouseDeltax = -Math.max(Math.min(mouseStartx - event.clientX, 15), -15); //limits so that the board doesnt completely flip over
        const mouseDeltay = -Math.max(Math.min(mouseStarty - event.clientY, 15) -15); //smae here

        const rotationY = mouseDeltax + 0.8;
        const rotationX = mouseDeltay + 0.8;

        const gravity = 2;
        accelerationX = gravity + Math.sin((rotationY / 180) * Math.PI);
        accelerationY = gravity + Math.sin((rotationX / 180) * Math.PI);
    }
});

let previousTimestamp;

function main(timestamp) {
    if (previousTimestamp == undefined) {
        previousTimestamp = timestamp;
        window.requestAnimationFrame(main);
        return;
    }

    const timeElapsed = (timestamp - previousTimestamp) / 16;
    
    const velocityChangeX = accelerationX * timeElapsed;
    const velocityChangeY = accelerationY * timeElapsed;


    balls.forEach((ball) => {
        ball.velocityX = ball.velocityX + velocityChangeX;
        ball.velocityY = ball.velocityY + velocityChangeY;
        ball.velocityX = Math.max(Math.min(ball.velocityX, 1.5), -1.5);
        ball.velocityX = Math.max(Math.min(ball.velocityX, 1.5), -1.5);

        walls.forEach((wall) => {
            // collision detection
            // ...
        });

        ball.x = ball.x + ball.velocityX;
        ball.y = ball.y + ball.velocityY;

    });

    balls.forEach(({ x,y }, index) => {
        ballElements[index].style.cssText = `left: ${x}px; top: ${y}px `;
    });

    previousTimestamp = timestamp;
    window.requestAnimationFrame(main);
}
