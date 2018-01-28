let game = new Phaser.Game(1050, 588, Phaser.AUTO, 'game', {
    preload: preload, create: create, update: update
});


let health, hunger, thirst, happiness; // The dad's stats

const MAX_STAT = 100;
const MIN_STAT = 0;

const DEPLETION_RATE = 1;

let dad;
let beer;

let button;


function preload() {
    // Load in the game assests
    game.load.image('dad', 'assets/dad.png');
    game.load.image('beer', 'assets/beer.jpg');
    game.load.image('button', 'assets/button.png');
    game.load.image('background', 'assets/livingroom.png');

}

function create() {
    // Initialize all the dad's stats to full 100%
    health = MAX_STAT;
    hunger = MAX_STAT;
    thirst = MAX_STAT;
    happiness = MAX_STAT;


    game.background = game.add.sprite(0, 0, 'background');


    // Add in game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Dad sprite and physics setup
    let start = getRandomLocation();
    dad = game.add.sprite(start.x, start.y, 'dad');
    game.physics.enable(dad, Phaser.Physics.ARCADE);
    dad.scale.setTo(0.6, 0.6);

    game.time.events.repeat(Phaser.Timer.SECOND * 8, Infinity, moveDad, this);

}

function update() {

}

function moveDad() {
    let target = getRandomLocation();
    game.physics.arcade.moveToXY(dad, target.x, target.y, 100, 4000);
    setTimeout(function () { dad.body.velocity.setTo(0, 0); }, 4000);


}

function itemRecieved(item) {
    console.log(item);
}

function actionOnClick() {
    console.log('Hunger:', hunger);
    depleteHunger();
    console.log('Hunger:', hunger);
}

function eat(foodType) {
    const CHICKEN = 15;
    const BURGER = 25;
    const STEAK = 40;

    let updatedHunger = hunger;

    switch (foodType) {
        case 'CHICKEN':
            updatedHunger += CHICKEN;
        case 'BURGER':
            updatedHunger += BURGER;
        case 'STEAK':
            updatedHunger += STEAK;
        default:
            break;
    }

    if (updatedHunger > MAX_STAT) {
        hunger = MAX_STAT;
    } else {
        hunger = updatedHunger;
    }
}

function drink() {
    const BEER = 20;
    if (thirst += BEER > MAX_STAT) {
        thirst = MAX_STAT;
    } else {
        thirst += BEER
    }
}

function depleteHunger() {
    hunger -= DEPLETION_RATE;
}

function depleteThirst() {
    thirst -= DEPLETION_RATE;
}

function getRandomLocation() {
    const MIN_X = 5;
    const MIN_Y = 458;

    const MAX_X = 865;
    const MAX_Y = 585;

    Math.floor(Math.random() * 10 + 1);

    let xCoor = getRandomInteger(MIN_X, MAX_X);
    let yCoor = getRandomInteger(MIN_Y, MAX_Y) - 220;

    return {
        x: xCoor,
        y: yCoor
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

