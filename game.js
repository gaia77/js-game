// Grab HTML Element Selectors
const container = document.querySelector('.container');

// Returns the size of an element and its position relative to the viewport
let conDim = container.getBoundingClientRect();

// Created an empty div and add game styling content to it
const gameover = document.createElement('div');

// Game Styling Elements
gameover.textContent = "Start Game"; 
gameover.style.position = "absolute"; 
gameover.style.color = "white";
gameover.style.lineHeight = "300px";
gameover.style.textAlign = "center";
gameover.style.fontSize = "3em";
gameover.style.textTransform = "uppercase";
gameover.style.fontFamily = "sans-serif"
gameover.style.backgroundColor = "pink";
gameover.style.width = "100%";
container.appendChild(gameover);

// Creating the Ball Element
const ball = document.createElement('div');

// Ball Styling
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "white";
ball.style.borderRadius = "25px";
ball.style.top = "70%";
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
paddle.style.left = "50%";

// Append Paddle
container.appendChild(paddle);

// Keyboard Events (Arrow Key Left is 37, Arrow Key Right is 39) 
document.addEventListener('keydown',function(e)
{
    console.log(e.keyCode);
    if(e.keyCode === 37)paddle.left=true;       // If keycode is 37, set paddle value left to be true
    if(e.keyCode === 39)paddle.right=true;      // If keycode is 39, set paddle value right to be true
})


document.addEventListener('keyup',function(e)   // When key is released, paddle will stop moving left or right
{
    console.log(e.keyCode);
    if(e.keyCode === 37)paddle.left=false;       
    if(e.keyCode === 39)paddle.right=false;      
})

//Variable for the player

const player = {
  gameover : true
};

// Click to 'Start Game' Event
gameover.addEventListener('click', startGame);



// Functions
function startGame()
{
    if(player.gameover){
    player.gameover = false;
    gameover.style.display = "none"; //Hide start button
    player.score = 0; //set player score
    player.lives = 5; //set players lives
    ball.style.display = "block";
    setupBricks(30);   //set up bricks  
    scoreUpdater(); //update visible score 
    //window.requestAnimationFrame(update);      // Animation to move paddle across the page
    }
}

  //Function setup bricks
  function setupBricks(num){
    let row = {                     //determine starting position
      x: ((conDim.width % 100)/2),
      y: 50
    }

    for(let x=0;x<num;x++){
      console.log(row);
      if(row.x>(conDim.width - 100)){
        row.y += 50;
        row.x = ((conDim.width % 100)/2);
      }
      row.x +=100;
    }
  }




  //Function to update score and lives
  function scoreUpdater(){
    document.querySelector('.score').textContent = player.score;
    document.querySelector('.lives').textContent = player.lives; //update players lives
  }



function update ()                             // Function to continously move the paddle
{
    let pCurrent = paddle.offsetLeft;
    console.log(pCurrent);
    if(paddle.left){ 
      pCurrent -=5;  //subtracting 5 off
    }

    if(paddle.right){
      pCurrent +=5;  //adding 5
    }
    paddle.style.left = pCurrent + 'px'; //Updating left paddle position
  
    window.requestAnimationFrame(update);
}
 
// "Request Animation Frame" is a method that tells the browser that you wish to perform an animation
// and requests that the browser call a specific function to update the animation
 
var start = null

function step(timestamp) {
  if (!start) start = timestamp;
    var progress = timestamp - start;

    // `Math.min()` is used to make sure that the element stops at exactly 200px.
    //element.style.transform = 'translateX(' + Math.min(progress/10,200) + 'px)';

  if (progress < 2000)
  { 
    window.requestAnimationFrame(step);     // Stop the animation after 2 seconds
  }
}

window.requestAnimationFrame(step);



