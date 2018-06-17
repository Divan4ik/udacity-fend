var BoundedObject = function() {
    // gap distance in px from sprite borders to image
    this.bounds = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
}

var env = {};
env.DEBUG = false;

// BoundedObject.prototype.getBounds = function() {
//     return [
//         {
//             topLeft: [this.x1, this.y],
//             bottomRight: []
// }

BoundedObject.prototype.setBounds = function(top, right, bottom, left) {
    this.bounds.top = top;
    this.bounds.right = right;
    this.bounds.bottom = bottom;
    this.bounds.left = left;
}

BoundedObject.prototype.getCartesian = function() {
    var rect = {};
    rect.Y1 = this.y + this.bounds.top;
    rect.X1 = this.x + this.bounds.left;
    rect.Y2 = this.y + this.height - this.bounds.bottom;
    rect.X2 = this.x + this.width - this.bounds.right;
    return rect;
}

BoundedObject.prototype.isCollisionWith = function (obj) {
    var A = this.getCartesian(),
        B = obj.getCartesian();

    return (A.X1 < B.X2 && A.X2 > B.X1 && A.Y1 < B.Y2 && A.Y2 > B.Y1);
}

BoundedObject.prototype.drawBounds = function() {
    var bound = this.getCartesian();
    bound.width = this.width - this.bounds.left - this.bounds.right;
    bound.height = this.height - this.bounds.top - this.bounds.bottom;

    ctx.strokeRect(bound.X1,bound.Y1, bound.width, bound.height);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    Enemy.superclass.constructor.call(this);
    this.height = 171;
    this.width = 101;
    this.maxSpeed = 6;
    this.gap = 50;
    this.minSpeed = 3;
    this.initiated = false;
    this.id = _helpers.randomSeed();
};

var Player = function() {
    Player.superclass.constructor.call(this);
    this.height = 171;
    this.width = 101;
    this.gap = 18;
    this.sprite = 'images/char-boy.png';
    this.initiated = false;
}

var _helpers = {
    extend: function(Parent, Child) {
        var F = function() { };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
    },

    shuffle: function(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.round(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    },
    randomSeed: function() {
        var char = '0123456789qazwsxedcrfvtgbyhnujmikolp';
        return this.shuffle(char.split('')).slice(0,10).join('');
    },

    isNoCollisions: function(a,b) {
        return a.x + a.width + a.gap < b.x || b.x + b.width + b.gap < a.x;
    }
}

_helpers.extend(BoundedObject, Player);
_helpers.extend(BoundedObject, Enemy);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(!this.initiated)  this.init();

    if (this.isRouteFinished()) {
        this.generageStartPosition();
        this.generageStartSpeed();
    }
    

    this.x += this.speed;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype.init = function() {
    this.setBounds(77, 3, 28, 3);
    this.generageStartPosition();
    this.generageStartSpeed();
    this.initiated = true;
}

Enemy.prototype.generageStartPosition = function() {
    
    var randomRowMultiplier = Math.ceil(Math.random()/(1/3)),
        rowHeight = 85,
        spriteGap = 40;

    var bottomRowPosition = ctx.canvas.height - this.height  - spriteGap - rowHeight;
    //outside the canvas
    this.y = bottomRowPosition - rowHeight*randomRowMultiplier;
    this.x = -this.width;
    this.findSmartSpawnCoords();
    this.initiated = true;
}


Enemy.prototype.findSmartSpawnCoords = function() {
    while(!this.isSpawnVacanted()) {
        this.x -= this.width;
    }
}

Enemy.prototype.isSpawnVacanted = function() {
    var result = true,
        self = this;

    allEnemies.forEach(function(enemy) {
        if(self.id === enemy.id || self.y !== enemy.y ||
            _helpers.isNoCollisions(self, enemy)) {
            return;
        };
        result = false;
    });

    return result;
}

Enemy.prototype.generageStartSpeed = function() {
    this.speed = Math.floor(Math.random()*(this.maxSpeed - this.minSpeed) + this.minSpeed);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if(env.DEBUG)
        this.drawBounds();
};

Enemy.prototype.isRouteFinished = function() {
    return this.x >= ctx.canvas.width + this.width;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


Player.prototype.update = function() {
    if(!this.initiated)  this.init();

    if(this.isRouteFinished()) {
        alert('Horay!');
        this.reset();
    }

    this.render();
}

Player.prototype.init = function() {
    this.generageStartPosition();
    this.setBounds(64, 18, 32, 18);
    this.initiated = true;
}

Player.prototype.reset = function() {
    this.generageStartPosition();
}

Player.prototype.generageStartPosition = function() {
    this.x = (ctx.canvas.width/2) - this.width/2;
    // don't know why is that
    this.y = ctx.canvas.height - this.height  - 40;
}

Player.prototype.isRouteFinished = function() {
    return this.y <= 20;
}

Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'up':
            this.y -= this.height / 2;
            break;
        case 'right':
            this.x += this.width;
            break;
        case 'down':
            this.y += this.height / 2;
            break;
        case 'left':
            this.x -= this.width;
            break;
    }
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if(env.DEBUG)
        this.drawBounds();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = Array.from(new Array(5), function() { return new Enemy() })


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
