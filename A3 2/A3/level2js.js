let player;
let bg;
let walls = [];
let circle;
let timer = 25 * 1000;
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

walls.push(new Wall(8, 205, 50, 5));
walls.push(new Wall(8, 210, 5, 95));
walls.push(new Wall(90, 210, 5, 260));
walls.push(new Wall(8, 300, 50, 5));


walls.push(new Wall(8, 300, 5, 345));

walls.push(new Wall(8, 645, 420, 5));
walls.push(new Wall(425, 485, 5, 165));
walls.push(new Wall(8, 1, 460, 5));

//semi open 
walls.push(new Wall(50, 420, 45, 5));

//wide access
walls.push(new Wall(120,285, 143, 5));
walls.push(new Wall(120,285, 5, 60));

//cut out above
walls.push(new Wall(185,170, 89, 5));
walls.push(new Wall(185,240, 89, 5));
walls.push(new Wall(180,170, 5, 75));
walls.push(new Wall(269,170, 5, 75));





//left
walls.push(new Wall(90,340, 175, 5));
walls.push(new Wall(90, 340, 5, 130));
walls.push(new Wall(263, 285, 5, 190));
walls.push(new Wall(8, 470, 262, 5));

//top right wall
walls.push(new Wall(300, 5, 5, 275));
walls.push(new Wall(300, 275, 120, 5));
walls.push(new Wall(300, 130, 120, 5));
walls.push(new Wall(466, 5, 5, 275));
walls.push(new Wall(360, 220, 110, 5));


// top left walls
walls.push(new Wall(8, 133, 5, 75));
walls.push(new Wall(150, 6, 5, 203));
walls.push(new Wall(8, 5, 5, 90));
walls.push(new Wall(40, 1, 5, 95));
walls.push(new Wall(8, 130, 150, 5));

//right washroom nd lobby
walls.push(new Wall(465, 280, 5, 160));
walls.push(new Wall(300, 280, 5, 280));
walls.push(new Wall(300,480, 75, 5));
walls.push(new Wall(370,520, 55, 5));
walls.push(new Wall(425,480, 90, 5));
walls.push(new Wall(306,405, 85, 5));
walls.push(new Wall(390, 280, 5, 104));
walls.push(new Wall(400,440, 85, 5));
walls.push(new Wall(300,445, 20, 5));

//bottoms
walls.push(new Wall(370,555, 55, 5));
walls.push(new Wall(8,501, 255, 5));
walls.push(new Wall(260,500, 5, 150));

let startButton = createButton('Go Back');
startButton.parent('column-one');
startButton.class('button');
startButton.mousePressed(startGame);
  
  bg=loadImage('assets/floor2.png');
    // Create a circle at the top-left corner
    circle = new Circle(450, 30, 10);

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
        text("00:"+seconds, 150,400);
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
        this.x = 70;
        this.y = 450;
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
