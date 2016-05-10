"use strict";
/**
 * Global variables for sprites, text, positions, enemies (move to a settings/cfg file later)
 */
var gPlayerSprite = "images/char-boy.png",
    gEnemySprite = "images/enemy-bug.png",
    gLoseText = "The almighty evil bug devours your entrails! The rest of you becomes feast for the flesh flies...",
    gWinText = "You swim away to safety...but find it leads to another bugged out playground.",
    gTotalEnemies = 10,                      // total number of enemies
    gMinEnemySpeed = 133,                   // min speed for enemies
    gMaxEnemySpeed = 333,                   // max speed for enemies
    gLenX = 101,                            // canvas X+1 tile (for canvas boundaries on position updates)
    gLenY = 83,                             // canvas Y-1 tile 
    gPlayerStartX = 202,                    // starting X position for player (bottom-middle grass tile)
    gPlayerStartY = 415,                    // starting Y position for player
    gEnemyMaxX = 5 * gLenX,                 // max X position for enemies (505: allows enemy to flow off last tile)
    gPlayerMinX = 0,                        // min X position for player on canvas
    gPlayerMinY = 0,                        // min Y position for player on canvas
    gPlayerMaxX = 4 * gLenX,                // max X position for player on canvas
    gPlayerMaxY = 5 * gLenY;                // max Y position for player on canvas

/**
 * Enemy, Player and Game classes
 */

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = gEnemySprite;
    this.randomizeStartPosition();
    this.speed = Math.floor(Math.random() * ((gMaxEnemySpeed - gMinEnemySpeed) + 1) + gMinEnemySpeed); // randomize enemy speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    if (this.x > gEnemyMaxX) { 
        // checks if enemy has gone off screen and reset its position 
        // again randomly off the left side of the canvas so it's less predictable
        this.randomizeStartPosition();
    } else {
        // multiply position and speed of the enemy object by delta time (for animation)
        this.x += this.speed * dt;
    }
};

Enemy.prototype.randomizeStartPosition = function() {
    this.x = -(Math.floor((Math.random()* 5) + 1) * gLenX);
    this.y = Math.floor((Math.random() * 3) + 1) * gLenY;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = gPlayerSprite;
    this.x = gPlayerStartX;
    this.y = gPlayerStartY;
    this.reset();
};

// Draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// reset player to start position if water line is reached
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        alert(gWinText);
        this.reset();
    }
};

// direction key press handler
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'up':
            var upPosition = this.y - gLenY;
            if (upPosition >= gPlayerMinY) {
                this.y = upPosition;
            } break;
        case 'down': 
            var downPosition = this.y + gLenY;
            if (downPosition <= gPlayerMaxY) {
                this.y = downPosition;
            } break;
        case 'left': 
            var leftPosition = this.x - gLenX;
            if (leftPosition >= gPlayerMinX) {
                this.x = leftPosition;
            } break;
        case 'right': 
            var rightPosition = this.x + gLenX;
            if (rightPosition <= gPlayerMaxX) {
                this.x = rightPosition;
            } break;
        default:
            return false;
    }
};

// reset player position
Player.prototype.reset = function() {
    this.x = gPlayerStartX;
    this.y = gPlayerStartY;
};

/**
 * Instantiation
 */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// instantiate enemies

var allEnemies = [];
for (var i=0; i < gTotalEnemies; i++) {
    allEnemies.push(new Enemy());
}

// instantiate player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
