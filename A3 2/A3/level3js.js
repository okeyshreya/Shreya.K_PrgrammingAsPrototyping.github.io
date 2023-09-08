let player;
let bg;
let walls = [];
let circle;
let timer = 35 * 1000;
let startTime;
let playerImage; 
let playerImageRadio; 
let ele;
let soundFile;
function preload() {
    
    playerImage = loadImage('assets/avatar1.png');
    soundFile = createAudio('assets/sound.mp3');
}

function setup() {
    cnv = createCanvas(500, 650);
cnv.parent('column-two')

soundFile.autoplay(true);
soundFile.loop(true);

  // here we set the element to autoplay
  // The element will play as soon
  // as it is able to do so.

    // Create radio buttons
    playerImageRadio = createRadio();
    playerImageRadio.option( 'assets/avatar1.png','Purple  ');
    playerImageRadio.option( 'assets/avatar2.png','Red     ');
    playerImageRadio.option( 'assets/avatar3.png','Grey    ');
    playerImageRadio.option( 'assets/avatar4.png','Violet  ');
    //playerImageRadio.position(10, 10);
    playerImageRadio.style('width', '63px');
    // Select the default player image
    playerImageRadio.changed(playerImageChanged);
playerImageRadio.parent('column-one');
playerImageRadio.class('radio')

let startButton = createButton('Go Back');
startButton.parent('column-one');
startButton.class('button');
startButton.mousePressed(startGame);

walls.push(new Wall(30, 190, 5, 78));
    walls.push(new Wall(60,270, 5, 195));
    walls.push(new Wall(30, 265, 50, 5));
    walls.push(new Wall(40,290, 60, 5));
    walls.push(new Wall(30,230, 50, 5));
    walls.push(new Wall(75, 230, 5, 35));
  
  //lobby next to they/them
   walls.push(new Wall(80, 190, 70, 5));
   walls.push(new Wall(80, 265, 20, 5));
  

  //faculty01
    walls.push(new Wall(39, 270, 5, 375));
  
    walls.push(new Wall(40, 645, 415, 5));
    walls.push(new Wall(440, 4, 5, 310));
    walls.push(new Wall(32, 1, 416, 5)); 
    walls.push(new Wall(115, 405, 30, 5));
  
  //cut out above
    walls.push(new Wall(203,210, 130, 5));
    walls.push(new Wall(200,150, 5, 165));
    walls.push(new Wall(203,310, 130, 5));
    walls.push(new Wall(330,210, 5, 105));
  
  //top wide access
  walls.push(new Wall(205,150, 105, 5));
  walls.push(new Wall(290,365, 5, 120));
  walls.push(new Wall(310,150, 5, 65));
    
  //learning spaces
    walls.push(new Wall(145, 50, 5, 435));
   
    walls.push(new Wall(25, 0, 5, 195));
    walls.push(new Wall(47, 1, 5, 95));
    walls.push(new Wall(100, 130, 280, 5));
    walls.push(new Wall(235, 0, 5, 100));
    walls.push(new Wall(25, 130, 20, 5));
  
  
  
  //cut out wall below
    walls.push(new Wall(146,365, 145, 5))
    walls.push(new Wall(330, 285, 5, 203));
    walls.push(new Wall(370, 365, 86, 5));
    walls.push(new Wall(145,485, 150, 5))
  
  //top right wall
    walls.push(new Wall(330, 55, 5, 260));
    walls.push(new Wall(420, 5, 5, 420));
    walls.push(new Wall(330,285,40,5));
    walls.push(new Wall(380,205,45,5));
    walls.push(new Wall(330,365,45,5));
    walls.push(new Wall(320,485,45,5));
     walls.push(new Wall(410,485,75,5));
  
  
  
  //bottoms
    walls.push(new Wall(40,485, 60, 5));
    walls.push(new Wall(220,565, 5, 90));
   walls.push(new Wall(315,485, 5, 80));
  walls.push(new Wall(260,490, 5, 30));
  walls.push(new Wall(455,525, 5, 130));


  
  bg=loadImage('assets/floor3.png');
    // Create a circle at the top-left corner
    circle = new Circle(400, 395, 10);

    startTime = millis(); // Start the timer

    // Initialize the player object with the default image
    player = new Player();
}

function draw() {
    background(bg);

    // Display and move the player
    player.show();

    // Check if the player reaches the circle
    if (circle.contains(player.x, player.y)) {


       alert("Game Win");
        noLoop(); // Stop the game loop
    }

    // Display walls
    for (let wall of walls) {
        wall.show();
    }

    // Display the circle
    circle.show();

    // Calculate remaining time
    let currentTime = millis();
    let remainingTime = timer - (currentTime - startTime);

    // Check if the timer has run out
    if (remainingTime <= 0) {
        alert("Game Over - You ran out of time!");
        noLoop(); // Stop the game loop
    } else {
        // Display the remaining time
        let seconds = Math.ceil(remainingTime / 1000);
        textSize(24);
        fill(255, 0, 0); // Red color for the timer text
        text("00:"+seconds, 105,620);
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.move(-15, 0); // Move left
    } else if (keyCode === RIGHT_ARROW) {
        player.move(15, 0); // Move right
    } else if (keyCode === UP_ARROW) {
        player.move(0, -15); // Move up
    } else if (keyCode === DOWN_ARROW) {
        player.move(0, 15); // Move down
    }
}

function mousePressed() {
    // Restart the character's position when the mouse is clicked
    player.restart();
}

function playerImageChanged() {
    // Load the selected player image when the radio button changes
    let selectedImage = playerImageRadio.value();
    playerImage = loadImage(selectedImage);

    // Update the player object with the new image
    player.setImage(playerImage);
}

class Player {
    constructor() {
        this.x = 80;
        this.y = 40;
        this.width = 14; // Adjust the width of the player image
        this.height = 18; // Adjust the height of the player image
        this.image = playerImage; // Initialize with the default image
    }

    setImage(img) {
        this.image = img;
    }

    show() {
        // Display the player image
        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    move(x, y) {
        // Calculate the new position without actually moving the player
        let newX = this.x + x;
        let newY = this.y + y;

        let collision = false;

        // Check for collisions with walls
        for (let wall of walls) {
            if (
                newX + this.width / 2 > wall.x &&
                newX - this.width / 2 < wall.x + wall.w &&
                newY + this.height / 2 > wall.y &&
                newY - this.height / 2 < wall.y + wall.h
            ) {
                collision = true;
                break; // Exit the loop as soon as a collision is detected
            }
        }

        if (!collision) {
            this.x = newX;
            this.y = newY;
        }
    }

    restart() {
        this.x = width / 2;
        this.y = height / 2;
    }
}

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        noStroke();
        fill(200);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.radius * 2);
    }

    contains(x, y) {
        let d = dist(x, y, this.x, this.y);
        return d < this.radius;
    }
}

function startGame() {
    // Your start game logic here (not linked to the animation)
    window.location.href = 'index.html';
  }
// Call playerImageChanged function to initialize the player with the default image
playerImageChanged();
