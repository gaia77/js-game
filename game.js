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
gameover.style.lineHeight = "60px";
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

container.appendChild(gameover);

// Creating the Ball Element

const ball = document.createElement('div');

// Ball Styling

ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "white";
ball.style.borderRadius = "25px";

// If you want to add a png image to the ball
// ball.style.backgroundImage = "url(ball.png)";
// ball.style.backgroundSize= "20px 20px";

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
    player.lives = 1; // Set players lives
    ball.style.display = "block";
    ball.style.left= paddle.offsetLeft + 50 + "px";
    ball.style.top= paddle.offsetTop - 30 + "px";
    player.ballDir = [2,-5]; // Ball direction set as an array
    setupBricks(30);   // Set up bricks  
    scoreUpdater(); // Update visible score 
    window.requestAnimationFrame(update); // Animation to move paddle across the page
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
    moveBall();
    if(paddle.left){ 
      pCurrent -=5;  //subtracting 5 off
    }

    if(paddle.right){
      pCurrent +=5;  //adding 5
    }
    
    paddle.style.left = pCurrent + 'px'; // Updating left paddle position

    window.requestAnimationFrame(update);
  }
}

//Function fallOff will be detracting player lives

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
        player.ballDir[1]*= -1; //Reverse ball position
      } 
  }
  if(posBall.x >(conDim.width -30) || posBall.x <0){
    player.ballDir[0]*= -1;
  } 

  if(isCollide(paddle,ball)){
    let temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth/2))/10;
    console.log('hit');
    player.ballDir[0] = temp;
    player.ballDir[1]*=-1;
  };

  let bricks = document.querySelectorAll('.brick');
  for(let tBrick of bricks){
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

// "Request Animation Frame" is a method that tells the browser that you wish to perform an animation
// and requests that the browser call a specific function to update the animation

/*var start = null

function step(timestamp) {
  if (!start) start = timestamp;
    var progress = timestamp - start;
    container.style.transform = 'translateX(' + Math.min(progress/ 
      10, 200) + 'px)';

    // `Math.min()` is used to make sure that the element stops at exactly 200px.
    //element.style.transform = 'translateX(' + Math.min(progress/10,200) + 'px)';

  if (progress < 2000)
  { 
    window.requestAnimationFrame(step);     // Stop the animation after 2 seconds
  }
}

window.requestAnimationFrame(step); */