const canvas = document.getElementById('canvas');
const scoreBoard = document.getElementById('score');
const context = canvas.getContext('2d');

// constant units

const boxSize = 30;
const xPad = 1*boxSize;
const yPad = 3*boxSize;

// board

const boardSize = {
  x : 20,
  y : 12
}

// create snake

let snake = [];
snake[0] = {
  x : 5 * boxSize + xPad,
  y : 4 * boxSize + yPad
}

// create food

let food = {
  x : Math.floor(Math.random()*boardSize.x + 1) * boxSize,
  y : Math.floor(Math.random()*boardSize.y + 3) * boxSize
} 

// create score

let score = 0;

// control snake

let d;

document.addEventListener("keydown", move);

function move(event){
  if (event.keyCode ==  37 && d != "RIGHT"){
    d = "LEFT";
  }else if(event.keyCode == 38 && d != "DOWN"){
    d = "UP";
  }else if(event.keyCode == 39 && d != "LEFT"){
    d = "RIGHT";
  }else if(event.keyCode == 40  && d != "UP"){
    d = "DOWN";
  }
}

// collision function

function collision(head, array){
  for (let i = 0; i < array.length; i++){
    if (head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}

// draw function

function draw(){

  // fill background
  for(let i=0; i < boardSize.x; i++){
    for (let j=0; j < boardSize.y; j++){
      if ( (i+j) % 2 == 0){
        context.fillStyle = "#8995A2";
      }
      else
        context.fillStyle = "#4F6E8F";
      context.fillRect(xPad + i*boxSize, yPad + j*boxSize,boxSize,boxSize);
    }
  }
  context.strokeStyle = "#2B3D4F";
  context.lineWidth = 5;
  context.strokeRect(xPad, yPad, boardSize.x * boxSize, boxSize*boardSize.y);
  context.lineWidth = 1;
  // draw snake
  for (let i = 0; i < snake.length; i++){
    context.fillStyle = "#CDDB6E";
    context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    context.strokeStyle = "#555C29";
    context.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

  // snake head
  let snakeHead = {
    x : snake[0].x,
    y : snake[0].y
  }

  // draw food
    context.fillStyle = "#9C6965";
    context.fillRect(food.x, food.y, boxSize, boxSize);
    context.strokeStyle = "#5C3E3C";
    context.strokeRect(food.x, food.y, boxSize, boxSize);

  // moving snake

  if (d == "LEFT") snakeHead.x -= boxSize;
  if (d == "UP") snakeHead.y -= boxSize;
  if (d == "RIGHT") snakeHead.x += boxSize;
  if (d == "DOWN") snakeHead.y += boxSize;

  // check if food was eaten
  if (snakeHead.x == food.x && snakeHead.y == food.y){
    score++;
    food = {
      x : Math.floor(Math.random()*boardSize.x + 1) * boxSize,
      y : Math.floor(Math.random()*boardSize.y + 3) * boxSize
    } 
  }else{
    snake.pop();
  }

  let newHead = {
    x : snakeHead.x,
    y : snakeHead.y
  }

  // check if game is over

  if (snakeHead.x < xPad || snakeHead.x > boardSize.x * boxSize + xPad - boxSize
      || snakeHead.y < yPad || snakeHead.y > boardSize.y * boxSize + yPad - boxSize       || collision(snakeHead, snake)
  ){
    alert("Game Over!");
    clearInterval(loop);
  }

  snake.unshift(newHead);

  // update score board

  scoreBoard.innerHTML = score;

}

// loop function

let loop = setInterval(draw, 150);