let snowflakes = [];
let myFont;
let cnv;
let soundFile;

function preload() {
    
    soundFile = createAudio('assets/sound.mp3');
  }

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('main-container');
  noStroke();
  fill(255);
  textSize(60);
  myFont=loadFont('assets/VCR_OSD_MONO_1.001.ttf'); // Use a different font for the heading
  textAlign(CENTER, CENTER);
  soundFile.autoplay(true);
  soundFile.loop(true);


  // Create a container div for buttons
  let buttonContainer1 = createDiv('');
  buttonContainer1.style('position', 'absolute');
  buttonContainer1.style('top', '50%');
  buttonContainer1.style('left', '50%');
  buttonContainer1.style('transform', 'translate(-50%, -50%)');
  buttonContainer1.class('button');
  
  
   let buttonContainer2 = createDiv('');
  buttonContainer2.style('position', 'absolute');
  buttonContainer2.style('top', '60%');
  buttonContainer2.style('left', '50%');
  buttonContainer2.style('transform', 'translate(-50%, -50%)');
  buttonContainer2.class('button');
  // Create "How to Play" button
  let howToPlayButton = createButton('How to Play');
  howToPlayButton.mousePressed(showInstructions);
  howToPlayButton.class('button');
  // Create "Start" button
  let startButton = createButton('Start');

  startButton.mousePressed(startGame);

  // Add buttons to the container
  howToPlayButton.parent(buttonContainer1);
  startButton.parent(buttonContainer2);
  startButton.class('button');
}

function draw() {
  background(0); // Set the background color to black

  // Generate new snowflakes
  let numSnowflakes = 1;
  for (let i = 0; i < numSnowflakes; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(1, 2);
    let speed = random(0, 5);
    snowflakes.push(new Snowflake(x, y, radius, speed));
  }

  // Update and display snowflakes
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    snowflakes[i].update();
    snowflakes[i].display();
    if (snowflakes[i].offscreen()) {
      snowflakes.splice(i, 1); // Remove snowflake if it goes offscreen
    }
  }

  // Display the heading
  fill(255);
   textFont(myFont);
    fill(color('red'));
  text("Rit-Hit", width / 2, height / 3);
  fill(color('white'));
  
  
}

class Snowflake {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    ellipse(this.x, this.y, this.radius * 2);
  }

  offscreen() {
    return this.y > height + this.radius;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function showInstructions() {
  // You can display instructions here
  window.location.href = 'rules.html';
}

function startGame() {
  // Your start game logic here (not linked to the animation)
  window.location.href = 'level1.html';
}





