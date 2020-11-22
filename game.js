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

// Click to 'Start Game' Event
gameover.addEventListener('click', startGame);



// Functions
function startGame()
{
    window.requestAnimationFrame(update);      // Animation to move paddle across the page
}

function update ()                             // Function to continously move the paddle
{
    window.requestAnimationFrame(update);
}
 
// "Request Animation Frame" is a method that tells the browser that you wish to perform an animation
// and requests that the browser call a specific function to update the animation
 
var start = null

function step(timestamp) {
  if (!start) start = timestamp;
    var progress = timestamp - start;

    // `Math.min()` is used to make sure that the element stops at exactly 200px.
    element.style.transform = 'translateX(' + Math.min(progress/10,200) + 'px)';

  if (progress < 2000)
  { 
    window.requestAnimationFrame(step);     // Stop the animation after 2 seconds
  }
}

window.requestAnimationFrame(step);



