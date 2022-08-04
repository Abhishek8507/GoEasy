const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// ctx.fillStyle = "red";
// ctx.fillRect(25,25,50,40);
const BOX = 20;
let SCORE = 0;
const food = {};
const snake = [
    {x:6, y:6}
];
let direction = "left";

function randomFood() {
    food.x = Math.floor(Math.random()*24);
    food.y = Math.floor(Math.random()*24);
}

document.addEventListener("keydown", function(event) {
    const key = event.keyCode;
    if(key == 37 && direction!="right") //Left
    {
        direction = "left";
        console.log("Left");
    }
    else if(key == 38 && direction!="down") //Up
    {
        direction = "up";
        console.log("Up");
    }
    else if(key == 39 && direction!="left") //Right
    {
        direction = "right";
        console.log("Right");
    }
    else if(key == 40 && direction!="up") //Down
    {
        direction = "down";
        console.log("Down");
    }
});

function snakeCollision(newHead) {
    for(i=0; i<snake.length; i++)
    {
        const curr = snake[i];
        if(curr.x == newHead.x && curr.y == newHead.y)
        return true;
    }
    return false;
}

function wallCollision(newHead){
    if(newHead.x < 0 || newHead.x >= 25 || newHead.y < 0 || newHead.y >= 25)
    return true;

    return false;
}

function updateScore() {
    SCORE++;
    console.log(SCORE);
    document.querySelector('h3').innerText = "SCORE:"+SCORE;
}

function draw() {
    // Draw Game Area
    ctx.fillStyle = "aqua";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Food
    ctx.fillStyle = "orange";
    ctx.fillRect(food.x*BOX, food.y*BOX, BOX, BOX);
    // ctx.fillRect(100px, 100px, 20, 20);
    
    // Draw Snake
    for(i=0; i<snake.length; i++)
    {
        const color = i==0 ? "green" : "white";
        ctx.fillStyle = color;
        ctx.fillRect(snake[i].x*BOX, snake[i].y*BOX, BOX, BOX);
    }

    let newHead = {
        x : snake[0].x,
        y : snake[0].y
    }

    if(direction == "left") newHead.x += -1;
    if(direction == "right") newHead.x += 1;
    if(direction == "up") newHead.y += -1;
    if(direction == "down") newHead.y += 1;

    
    // Collisions handling
    if(wallCollision(newHead) || snakeCollision(newHead))
        clearInterval(game);    
    
    // Snake Eats Food
    if((newHead.x == food.x && newHead.y == food.y))
    {
        updateScore();
        randomFood();
    }
    else
    snake.pop();

    snake.unshift(newHead);
    
}
randomFood();
let game = setInterval(draw, 150);