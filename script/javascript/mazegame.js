//HTML
<div class="game">
    <div calss="maze">
    </div>
    <div class="joystick">
        <div class="joystick-head"></div>
    </div>
</div>

//script
const mazeElement = document.getElementById("maze");
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
    ball.style.cssText = 'left: ${x}px; top: ${y}px; ';

    mazeElement.appendChild(ball);
    ballElements.push({ ball, speedX, speedY });
});