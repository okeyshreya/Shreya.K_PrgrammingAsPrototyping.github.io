let player;
let bg;
let walls = [];
let circle;
let timer = 30 * 1000;
let startTime;
let playerImage; 
let playerImageRadio; 
let p1;
let volumeSlider;
let soundFile;

function preload() {
    
    playerImage = loadImage('assets/avatar1.png');
    soundFile = createAudio('assets/sound.mp3');
}

function setup() {
    cnv = createCanvas(500, 650);
cnv.parent('column-two');



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

soundFile.autoplay(true);
soundFile.loop(true);

    walls.push(new Wall(1, 205, 30, 5));
    walls.push(new Wall(77, 205, 92, 5));
    walls.push(new Wall(75, 210, 5, 100));
    walls.push(new Wall(1, 210, 5, 100));
    walls.push(new Wall(165, 210, 5, 100));
    walls.push(new Wall(1, 260, 170, 5));
    walls.push(new Wall(1, 310, 170, 5));
  
  
    walls.push(new Wall(25, 310, 5, 340));
  
    walls.push(new Wall(25, 645, 415, 5));
    walls.push(new Wall(440, 485, 5, 180));
    walls.push(new Wall(25, 1, 455, 5));
    walls.push(new Wall(475, 5, 5, 275));

  
  //no space wall
    walls.push(new Wall(108,340, 170, 5));
    walls.push(new Wall(108, 340, 5, 130));
    walls.push(new Wall(275, 340, 5, 130));
    walls.push(new Wall(108, 470, 173, 5));
  
  //top right wall
    walls.push(new Wall(310, 5, 5, 275));
    walls.push(new Wall(310, 275, 170, 5));
    walls.push(new Wall(310, 130, 170, 5));
 
  // top left walls
    walls.push(new Wall(25, 133, 5, 75));
    walls.push(new Wall(165, 5, 5, 170));
    walls.push(new Wall(25, 5, 5, 90));
    walls.push(new Wall(75, 40, 5, 180));
    walls.push(new Wall(80, 130, 39, 5));
  
  //right washroom
    walls.push(new Wall(495, 300, 5, 185));
    walls.push(new Wall(330, 300, 5, 147));
    walls.push(new Wall(330,300, 170, 5));
    walls.push(new Wall(318,480, 180, 5));
    walls.push(new Wall(330,405, 95, 5));
    walls.push(new Wall(330,350, 95, 5));
    walls.push(new Wall(420, 350, 5, 60));
    walls.push(new Wall(400,440, 100, 5));
    walls.push(new Wall(315,445, 20, 5));
  
  //bottoms
    walls.push(new Wall(230,555, 210, 5));
    walls.push(new Wall(30,500, 200, 5));
    walls.push(new Wall(230,500, 5, 150));
  
  
   
  
  bg=loadImage('assets/floor1.png');
    // Create a circle at the top-left corner
    circle = new Circle(55, 240, 10);

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
       text("00:"+seconds, 213,250);
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.move(-10, 0); // Move left
    } else if (keyCode === RIGHT_ARROW) {
        player.move(10, 0); // Move right
    } else if (keyCode === UP_ARROW) {
        player.move(0, -10); // Move up
    } else if (keyCode === DOWN_ARROW) {
        player.move(0, 10); // Move down
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
        this.x = 370;
        this.y = 330;
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
