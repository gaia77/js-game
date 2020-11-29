// Grab HTML Element Selectors
const container = document.querySelector('.container');

// Returns the size of an element and its position relative to the viewport
let conDim = container.getBoundingClientRect();

// Created an empty div and add game styling content to it
const gameover = document.createElement('div');

// Game Styling Elements
gameover.innerHTML = "Start Game"; 
gameover.style.position = "absolute"; 
gameover.style.color = "white";
gameover.style.lineHeight = "275px";
gameover.style.height="250px";
gameover.style.textAlign = "center";
gameover.style.fontSize = "2em";
gameover.style.textTransform = "uppercase";
gameover.style.fontFamily = "sans-serif"
gameover.style.backgroundColor = "#11ea7a";
gameover.style.paddingTop= "10%";
gameover.style.paddingBottom= "10%"
gameover.style.width = "100%";
gameover.style.height = "80%";

// Click to 'Start Game' Event
gameover.addEventListener('click', startGame);

// Append Game Over
container.appendChild(gameover);

// Creating the Ball Element
const ball = document.createElement('div');

// Ball Styling
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "white";
ball.style.borderRadius = "25px";

// Ball Position
ball.style.top = "40%";
ball.style.left = "50%";

// Ball Placement/Appearance
ball.style.display="none";

// Append Ball 
container.appendChild(ball);

// Paddle Styling
const paddle = document.createElement('div');
paddle.style.position = "absolute";
paddle.style.backgroundColor = "white";
paddle.style.height = "20px";
paddle.style.width = "150px";
paddle.style.borderRadius = "25px";
paddle.style.bottom = "30px";
paddle.style.left = "45%";

// Append Paddle
container.appendChild(paddle);

// Keyboard Events (Arrow Key Left is 37, Arrow Key Right is 39) 
document.addEventListener('keydown',function(e){

  console.log(e.keyCode);
  if(e.keyCode === 37)paddle.left=true;       // If keycode is 37, set paddle value left to be true
  if(e.keyCode === 39)paddle.right=true;      // If keycode is 39, set paddle value right to be true
  if (e.keyCode === 38 && !player.inPlay)     // Give ability to launch the ball whenever they choose to
  player.inPlay = true; 
})

document.addEventListener('keyup',function(e){   // When key is released, paddle will stop moving left or right

    console.log(e.keyCode);
    if(e.keyCode === 37)paddle.left=false;       
    if(e.keyCode === 39)paddle.right=false;      
})

// Variable for the Player
const player = {
  gameover : true
};

// Functions
function startGame(){
  if(player.gameover){
    player.gameover = false;
    gameover.style.display = "none"; // Hide start button
    player.score = 0; // Set player score
    player.lives = 3; // Set players lives
    player.inPlay = false;
    ball.style.display = "block";
    ball.style.left = paddle.offsetLeft + 50 + "px"; //Ball default position 
    ball.style.top = paddle.offsetTop - 30 + "px";
    player.ballDir = [2,-5]; // Ball direction set as an array
    player.num = 30;
    setupBricks(player.num);   // Set bricks dynamically   
    scoreUpdater(); // Update visible score 
    player.ani = requestAnimationFrame(update); // Animation to move paddle across the page
  }      
}

// Function Setup Default Bricks Position
function setupBricks(num){
  let row = { // Determine starting position
    x: ((conDim.width % 100)/2),
    y: 50
  }
  let skip = false; // Stop creating bricks when you run out of space
  for(let x=0;x<num;x++){   // Create a for loop to know where to position bricks
    // console.log(row);
    if(row.x>(conDim.width - 100)){
      row.y += 50;
      if(row.y > (conDim.height/2)){
        skip = true; //reduce the number of bricks being created
      }
      row.x = ((conDim.width % 100)/2);
    }
    row.count = x;
    if(!skip){createBrick(row);}
    row.x += 100;
  }
}

// Function Create Brick
function createBrick(pos){
  const div = document.createElement('div');
  div.setAttribute('class','brick');
  div.style.backgroundColor = rColor();
  div.innerHTML = pos.count + 1 ;
  div.style.left = pos.x + 'px';
  div.style.top = pos.y + 'px';
  container.appendChild(div);
}

// Collision - Checking to see if bottom of paddle is less than the top of the ball
// Also checking to see if the bottom position of ball is larger than the top position of the paddle
function isCollide(a,b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return!((aRect.right<bRect.left) || (aRect.left>bRect.right) ||
  (aRect.bottom<bRect.top) || (aRect.top>bRect.bottom));
}

// Function Random Brick Color
function rColor() {
  return '#' + Math.random().toString(16).substr(-6);   // Create random  HEX color value 
}

// Function to Update Score and Lives

function scoreUpdater(){
  document.querySelector('.score').innerHTML = player.score;
  // Update players lives
  //console.log(document.querySelector('.lives'));
  document.querySelector('.lives').innerHTML = player.lives; 
}

// Function to continously move the paddle
function update(){
if(!player.gameover){                             
  let pCurrent = paddle.offsetLeft;
  
  if(paddle.left && pCurrent > 0){ //Paddle won't move off the left end side
    pCurrent -=5;  //subtracting 5 off
  }

  if(paddle.right && (pCurrent < (conDim.width - paddle.offsetWidth))){ //Paddle won't go pass the edges on right side
    pCurrent +=5;  //adding 5
  }
    
    paddle.style.left = pCurrent + 'px'; // Updating left paddle position

    if(!player.inPlay){
      waitingOnPaddle()
    }else{
      moveBall();
    }
    player.ani = window.requestAnimationFrame(update); //Relaunch animation
  }
}

function waitingOnPaddle(){
  ball.style.top = (paddle.offsetTop - 22)+'px'; 
  ball.style.left = (paddle.offsetLeft) + 65 + 'px';
}

// Function fallOff will be detracting player lives
function fallOff(){
  player.lives--;
    if(player.lives<0){
      endGame();
      player.lives = 0;
  }
  scoreUpdater();
  stopper();
}

// Function endGame
// Hide the ball , hide the bricks... clear up the board
  function endGame(){
    gameover.style.display="block";
    gameover.innerHTML = "Game Over<br>Your score "+player.score;
    player.gameover = true;
    ball.style.display = "none";
    let tempBricks = document.querySelectorAll('.brick');
    for(let tBrick of tempBricks){
      tBrick.parentNode.removeChild(tBrick);
    }
  }

// Function to stop the ball on top of the paddle
function stopper(){
  player.inPlay = false;
  player.ballDir[0,-5];
  waitingOnPaddle();
  window.cancelAnimationFrame(player.ani);
}

// Function move ball
function moveBall(){
  let posBall = {      //declare position ball
    x:ball.offsetLeft, // horizontal position
    y:ball.offsetTop  // vertical position
  }

// Checking container dimensions
if(posBall.y >(conDim.height -20) || posBall.y <0){
  if(posBall.y > (conDim.height -20)){
    fallOff(); 
  }else{
    player.ballDir[1]*= -1; //Reverse ball position/direction
  } 
}

if(posBall.x >(conDim.width -30) || posBall.x <0){
player.ballDir[0]*= -1;
} 

if(isCollide(paddle,ball)){ //check collision with the paddle
  let temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth/2))/10;
  console.log('hit');
  player.ballDir[0] = temp;
  player.ballDir[1]*=-1;
};

let bricks = document.querySelectorAll('.brick');
if(bricks.length == 0){
  stopper(); //stop ball from moving
  setupBricks(player.num); //set up value bricks generated
}
for(let tBrick of bricks){ //loop through all the bricks
  if(isCollide(tBrick,ball)){
    player.ballDir[1]*=-1;
    tBrick.parentNode.removeChild(tBrick);  // Remove brick
    player.score++;   // Update score
    scoreUpdater();
  }
}
  
posBall.y += player.ballDir[1]; //speed ball will be moving 
posBall.x += player.ballDir[0];
ball.style.top = posBall.y + 'px';
ball.style.left = posBall.x + 'px';
}