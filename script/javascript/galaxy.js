// script.js

function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 200;
    if (left >= 0) {
        character.style.left = left + "px";
    }
}

function moveRight() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 200;
    if (left <= 500) {
        character.style.left = left + "px";
    }
}

function resetGame() {
    block.style.animation = "none";
    counter = 0;
    animationDuration = initialAnimationDuration;

    // Show and animate the game over text
    gameOverText.style.display = 'block';
    setTimeout(() => {
        gameOverText.style.opacity = 1;
    }, 10);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
});

var block = document.getElementById("block");
var character = document.getElementById("character");
var counter = 0;
var initialAnimationDuration = 1000; // Initial animation duration in milliseconds
var animationDuration = initialAnimationDuration;

block.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * 3);
    left = random * 200;
    block.style.left = left + "px";
    counter++;

    // Increase animation speed over time
    animationDuration *= 0.95; // You can adjust the multiplier for the speed of increase
    block.style.animation = `slide ${animationDuration / 1000}s infinite`;
});

var gameOverText = document.getElementById('game-over-text');

setInterval(function () {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    if (characterLeft == blockLeft && blockTop < 800 && blockTop > 600) {
        // Game over
        resetGame();
    }
}, 1);
function restartGame() {
    // Reset game-related properties
    block.style.animation = "slide 1s infinite";
    counter = 0;
    animationDuration = initialAnimationDuration;

    // Hide the game over text and restart button
    gameOverText.style.display = 'none';
    restartButton.style.display = 'none';

    // Resume the block animation
    block.style.animation = `slide ${animationDuration / 1000}s infinite`;

    // Reset the interval for game over check
    clearInterval(gameOverInterval);
    gameOverInterval = setInterval(checkGameOver, 1);
}

// Add a function to check for game over
function checkGameOver() {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    if (characterLeft == blockLeft && blockTop < 800 && blockTop > 600) {
        // Game over
        clearInterval(gameOverInterval);
        showGameOver();
    }
}

// Replace the existing game over logic with a function
function showGameOver() {
    // Stop the block animation
    block.style.animation = "none";

    // Show the game over text
    gameOverText.style.display = 'block';
    
    // Show the restart button
    restartButton.style.display = 'block';
}