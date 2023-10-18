let ball = {
  x: 300,
  y: 200,
  size: 120,
  speedX: 3,
  speedY: 3
};

let leftPaddle = {
  x: 10,
  y: 190,
  width: 100,
  height: 20
};

let rightPaddle = {
  x: 490,
  y: 190,
  width: 100,
  height: 20
};

let paddlesSpeed = 5;
let isSuccessful = false;

let gameState = 'briefing';

function setup() {
  createCanvas(600, 400);
}

function centerCanvas(cnv) {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas(createCanvas(600, 400));
}

function draw() {
  background(255);

  if (gameState === 'briefing') {
    displayBriefing();
  } else if (gameState === 'playing') {
    moveBall();
    if (!isSuccessful) {
      displayBall();
    }
    movePaddles();
    drawPaddle(leftPaddle, 'left');
    drawPaddle(rightPaddle, 'right');

    checkPaddleCollision(leftPaddle);
    checkPaddleCollision(rightPaddle);
    
    if (isSuccessful) {
      gameState = 'success';
    }
  } else if (gameState === 'success') {
    displaySuccess();
  }
}

function displayBriefing() {
  fill(255, 165, 0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Let's kill the    ", width / 2 - 60, height / 2 - 20);
  
  fill(255, 0, 0); // Change fill color to red for the word "cancer"
  text("CANCER", width / 2 + 30, height / 2 - 20);
  
  fill(255, 165, 0); // Change fill color back to black for the remaining text
  text("   cell!", width / 2 + 90, height / 2 - 20);
  text("Controls:", width / 2, height / 2 + 10);
  text("Left Syringe - W & S", width / 2, height / 2 + 40);
  text("Right Syringe - " + '\u2191' + " & " + '\u2193', width / 2, height / 2 + 70);
  text("Press ENTER to start", width / 2, height / 2 + 110);
}


function keyPressed() {
  if (keyCode === ENTER && gameState === 'briefing') {
    gameState = 'playing';
  }
}

function displaySuccess() {
  fill(255, 165, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('SUCCESS!', width / 2, height / 2);
}

function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y <= 0 || ball.y >= height) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x <= 0 || ball.x >= width) {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.size = 120;
  }
}

function displayBall() {
  fill(255, 0, 0);
  ellipse(ball.x, ball.y, ball.size);

  fill(255);
  textSize(ball.size / 5);
  textAlign(CENTER, CENTER);
  text("CANCER", ball.x, ball.y);
}

function movePaddles() {
  if (keyIsDown(UP_ARROW)) {
    rightPaddle.y -= paddlesSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.y += paddlesSpeed;
  }
  if (keyIsDown(87)) { 
    leftPaddle.y -= paddlesSpeed;
  }
  if (keyIsDown(83)) {
    leftPaddle.y += paddlesSpeed;
  }
}

function drawPaddle(paddle, side) {
  fill(255, 165, 0);
  if (side === 'left') {
    rect(paddle.x, paddle.y, paddle.width * 0.6, paddle.height);
    rect(paddle.x + paddle.width * 0.6, paddle.y + paddle.height * 0.375, paddle.width * 0.4, paddle.height * 0.25);
    fill(0);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("GSK", paddle.x + paddle.width * 0.4, paddle.y + paddle.height / 2);
  } else {
    rect(paddle.x + paddle.width * 0.4, paddle.y, paddle.width * 0.6, paddle.height);
    rect(paddle.x, paddle.y + paddle.height * 0.375, paddle.width * 0.4, paddle.height * 0.25);
    fill(0);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("GSK", paddle.x + paddle.width * 0.6, paddle.y + paddle.height / 2);
  }
}


function checkPaddleCollision(paddle) {
  let hit = false;

  if (paddle === leftPaddle) {
    hit = ball.x - ball.size / 2 <= paddle.x + paddle.width && ball.y + ball.size / 2 >= paddle.y && ball.y - ball.size / 2 <= paddle.y + paddle.height && ball.speedX < 0;
  } else {
    hit = ball.x + ball.size / 2 >= paddle.x && ball.y + ball.size / 2 >= paddle.y && ball.y - ball.size / 2 <= paddle.y + paddle.height && ball.speedX > 0;
  }

  if (hit) {
    ball.speedX = -ball.speedX;
    ball.size *= 0.9;

    if (ball.size <= 15) {
      isSuccessful = true;
    }
  }
}
