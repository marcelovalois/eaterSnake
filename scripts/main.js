const tabHeight = 40;
const tabWidth = 40;
const initialSnakeLength = 5;

const up = 0;
const right = 1;
const down = 2;
const left = 3;

const colorEnv = 'rgb(126, 170, 45)';  // Environment Color
const colorSnake = '#DCDCDC'; // Snake Color

var tableArray = [];
var head = {};
var tail = {};
var foodPosition = {};
var queue = [];
var directionQueue = [];
var direction = 1;
var interval;
var matchStarted = false;

var score = 0;

var speed = 25;
if (localStorage.getItem('speed')) speed = localStorage.getItem('speed');


const board = document.querySelector('div.board');

function launch() {
    setHomeDiv();
    addEvents();
}

function createFieldset(id, text) {
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', id);
    var txt = document.createElement('label');
    txt.appendChild(document.createTextNode(text));
    txt.setAttribute('class', 'texts');
    fieldset.appendChild(txt);

    return fieldset;
}

function setBackground() {
    board.innerHTML = '';
 
    const newLayout = document.createElement('div');
    newLayout.setAttribute('class', 'homeLayout');
    board.prepend(newLayout);

    return newLayout;
}

function setImages(newLayout) {
    const snakeImg = document.createElement('img');
    snakeImg.setAttribute('src', './images/snake.svg');
    snakeImg.setAttribute('id', 'image');
    newLayout.appendChild(snakeImg);

    const snakeImg2 = document.createElement('img');
    snakeImg2.setAttribute('src', './images/textImage.svg');
    snakeImg2.setAttribute('id', 'image2');
    newLayout.appendChild(snakeImg2);
}

function setButtons(newLayout) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'fieldsets');
    newLayout.appendChild(newDiv);

    //Start Game Button
    const initGameTag = createFieldset('start', 'Start Game');

    initGameTag.addEventListener('click', startMatch);

    newDiv.appendChild(initGameTag);


    //Settings Button
    const settingsTag = createFieldset('settings', 'Settings');
    
    settingsTag.addEventListener('click', setSettings)
    
    newDiv.appendChild(settingsTag);


    //About Button
    const aboutTag = createFieldset('about', 'About');

    aboutTag.addEventListener('click', setAbout);
    
    newDiv.appendChild(aboutTag);
}

function setSpeed(tempSpeed) {
    speed = tempSpeed;
    localStorage.setItem('speed', tempSpeed);
}

function setSettings() {
    
    const fieldsets = document.querySelector('div.fieldsets');
    fieldsets.innerHTML = '';

    //Back Button
    const backButton = createFieldset('back', 'Back to Menu');

    backButton.addEventListener('click', function() {
        setHomeDiv();
    });

    fieldsets.appendChild(backButton);

    // Description label
    const descriptionLabel = createFieldset('description', '*Select the Difficulty*');

    fieldsets.appendChild(descriptionLabel);


    //Difficulty Buttons
    const diffies = document.createElement('div');
    diffies.setAttribute('class', 'diffs');
    fieldsets.appendChild(diffies);
    
    
    const easy = createFieldset('easy', 'EASY');
    diffies.appendChild(easy);
    easy.addEventListener('click', function() {
        setSpeed(40);
    });
    
    const med = createFieldset('normal', 'NORMAL');
    diffies.appendChild(med);
    med.addEventListener('click', function() {
        setSpeed(25);
    });
    
    const hard = createFieldset('hard', 'HARD');
    diffies.appendChild(hard);
    hard.addEventListener('click', function() {
        setSpeed(15);
    });

    const veryHard = createFieldset('veryHard', 'VERY HARD');
    diffies.appendChild(veryHard);
    veryHard.addEventListener('click', function() {
        setSpeed(10);
    });

    const insane = createFieldset('insane', 'INSANE!');
    diffies.appendChild(insane);
    insane.addEventListener('click', function() {
        setSpeed(8);
    });

    const impossible = createFieldset('impossible', "YOU WON'T DO IT!!!");
    diffies.appendChild(impossible);
    impossible.addEventListener('click', function() {
        setSpeed(5);
    });
    

}

function setAbout() {
    const fieldsets = document.querySelector('div.fieldsets');
    fieldsets.innerHTML = '';

    //Back Button
    const backButton = createFieldset('back', 'Back to Menu');

    backButton.addEventListener('click', function() {
        setHomeDiv();
    });

    fieldsets.appendChild(backButton);


    const presentation = document.createElement('div');
    presentation.setAttribute('class', 'presentation');
    fieldsets.appendChild(presentation);

    var controls = document.createElement('p');
    controls.appendChild(document.createTextNode('Controls:'));
    presentation.appendChild(controls);

    var commands = document.createElement('ul');
        var upCommand = document.createElement('li');
        upCommand.appendChild(document.createTextNode('↑: Turn Snake Up'));
        commands.appendChild(upCommand);

        var downCommand = document.createElement('li');
        downCommand.appendChild(document.createTextNode('↓: Turn Snake Down'));
        commands.appendChild(downCommand);

        var leftCommand = document.createElement('li');
        leftCommand.appendChild(document.createTextNode('←: Turn Snake Left'));
        commands.appendChild(leftCommand);

        var rightCommand = document.createElement('li');
        rightCommand.appendChild(document.createTextNode('→: Turn Snake Right'));
        commands.appendChild(rightCommand);

        var enterCommand = document.createElement('li');
        enterCommand.appendChild(document.createTextNode('↵ (Enter): Start the Game'));
        commands.appendChild(enterCommand);

    presentation.appendChild(commands);

    var thanks = document.createElement('p');
    var thanksText = 'Just a little project made with the intention of improving my "DOM Manipulation" skills in Javascript. <br><br>';
    thanksText += 'I Hope you enjoy it :) <br>';
    thanks.innerHTML = thanksText;
    presentation.appendChild(thanks);

    var creator = document.createElement('p');
    creator.setAttribute('id', 'creator');
    var creatorText = 'Made by Marcelo Menezes Valois. July, 2020';
    creator.innerHTML = creatorText;
    presentation.appendChild(creator);

}

function setHomeDiv() {
    
    const layout = setBackground();

    setImages(layout);

    setButtons(layout);
}


function startMatch() {
    matchStarted = true;
    setGameDiv(); // Set the game screen
    createTable(); // It creates a matrix with all table positions
    setInitialSnake(); // Set a snake with predeterminated length
    renderTable(); // Render the table
    setRandomFood(); // Set initial food
    interval = setInterval(moveSnake, speed); // Init snake movement
}

function setGameDiv() {
    board.innerHTML = '';

    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'scoreBoard');
    board.prepend(newDiv);

    // Back Button
    const button = document.createElement('button');
    button.setAttribute('id', 'backButton');
    button.setAttribute('tabindex', '-1'); // Unselectable by tab
    button.appendChild(document.createTextNode('Return'));
    button.addEventListener('click', function() {
        gameOver();
    });

    const auxDiv = document.createElement('div');
    auxDiv.appendChild(button);
    newDiv.appendChild(auxDiv);

    // Score Label
    const scoreLabel = document.createElement('label');
    scoreLabel.setAttribute('id', 'name');
    scoreLabel.appendChild(document.createTextNode('Score: '));
    newDiv.appendChild(scoreLabel);

    // Score Board
    const scoreBoard = document.createElement('label');
    scoreBoard.setAttribute('id', 'number');
    scoreBoard.appendChild(document.createTextNode(score));
    newDiv.appendChild(scoreBoard);


    const tabl = document.createElement('table');
    board.appendChild(tabl);
}

function createTable() {
    for (var i = 0; i < tabHeight; i++) {
        aux = [];
        for(var j = 0; j < tabWidth; j++) {
            aux[j] = 0;
        }
        tableArray.push(aux);
    }
}

function setInitialSnake() {

    //Just building a snake with initial length set
    const initialHeight = tabHeight - 1;
    const initialWidth = 0;
    var headPosition = {};

    for (var i = initialWidth; i < initialWidth + initialSnakeLength; i++) {
        tableArray[initialHeight][i] = 1;
        headPosition = {
            height: initialHeight,
            width: i
        }
        queue.push(headPosition);
    }

    head = headPosition;

    tail = queue[0];
}

function renderTable() {
    //Cleaning div content
    const tabl = document.querySelector('table');
    tabl.innerHTML = '';

    //Creating table element
    for (var row = 0; row < tabHeight; row++) {
        
        var tempTr = document.createElement('tr');
        tempTr.setAttribute('class', `row${row}`);
        tabl.appendChild(tempTr);

        for (var column = 0; column < tabWidth; column++) {
            var tempTd = document.createElement('td');
            tempTd.setAttribute('id', `column${column}`);

            if (tableArray[row][column]) 
                tempTd.setAttribute('style', `background-color: ${colorSnake}`);
            else
                tempTd.setAttribute('style', `background-color: ${colorEnv}`);

            
            tempTr.appendChild(tempTd);
        }
    }
}

function renderObject(object, color) {
    const tempQuery = document.querySelector(`.row${object.height} #column${object.width}`);
    tempQuery.setAttribute('style', `background-color: ${color}`);
}

function setRandomFood() {
    // Calculate how many positions are in the board
    const totalPos = tabWidth * tabHeight;

    while(true) {
        //Get a random number to set a random food position
        const randomNumber = Math.floor(Math.random() * totalPos);

        const verticalPosition = parseInt(randomNumber / tabHeight);
        const horizontalPosition = randomNumber % tabHeight;

        //That random number can't be a position occupied by the snake
        if (tableArray[verticalPosition][horizontalPosition])
            continue;
        else {
            tableArray[verticalPosition][horizontalPosition] = 1;
            foodPosition = {
                height: verticalPosition,
                width: horizontalPosition
            }

            renderObject(foodPosition, colorSnake);

            break;
        }
    }
}

function addEvents() {
    window.addEventListener('keydown', function(event) {
    
    //Bug correction: In this game, the snake can't turn its direction to the opposite one. But, if the player try to press
    // 2 keys quick enough to invert snake's movement, it will pass through itself, considering that direction changes occurs instantly but,
    // snake's rendering, doesn't

    //Solution: Set a "direction queue" for saving all keys pressed. The solution also gets the last queue element to check if next movement
    // isn't opposite to the last
    var tempDirection;
    var leng = directionQueue.length;

    if (leng) {
        tempDirection = directionQueue[leng - 1];
    } else {
        tempDirection = direction;
    }
    
    //Adding next direction to the directionQueue based in the key pressed
    switch(event.keyCode) {
        case 13: matchStarted ? direction = direction : startMatch(); break;

        case 37: (tempDirection !== right) ? directionQueue.push(left) : direction = direction; break;  // Set direction left

        case 38: (tempDirection !== down) ? directionQueue.push(up) : direction = direction; break; // Set direction up

        case 39: (tempDirection !== left) ? directionQueue.push(right) : direction = direction; break; // Set direction right

        case 40: (tempDirection !== up) ? directionQueue.push(down) : direction = direction; break; //Set direction down
    }
    });
}

function moveSnake() {

    //Getting head position
    var nextWidth = head.width;
    var nextHeight = head.height;

    // A Direction Queue is used for saving all next movements, considering that there's a delay between a rendering and another, but,
    // the event keydown occurs almost instantly. I'm avoiding the snake of passing through itself
    if (directionQueue.length) {
        direction = directionQueue[0];
        directionQueue.shift();
    }

    //Choosing next head position based in the direction
    switch (direction) {
        case up:
            (nextHeight - 1 < 0) ? nextHeight = tabHeight - 1 : nextHeight -= 1;
            break;

        case down:
            (nextHeight + 1 >= tabHeight) ? nextHeight = 0 : nextHeight += 1;
            break;

        case left:
            (nextWidth - 1 < 0) ? nextWidth = tabWidth - 1 : nextWidth -= 1;
            break;

        case right:
            (nextWidth + 1 >= tabWidth) ? nextWidth = 0 : nextWidth += 1;
            break;
    }
    // Check for collisions
    if (checkCollision(nextHeight, nextWidth)) {
        gameOver(true); // Reset all values
        return;
    }

    //Note: The food eating logic is as follows: The tail just isn't cleaned and the food becomes snake's head

    //In case the snake doesn't eat the food
    cleanTail(nextHeight, nextWidth);

    //Setting next head position
    setHeadPosition(nextHeight, nextWidth);
}

function checkCollision(tempHeight, tempWidth) {

    if (tableArray[tempHeight][tempWidth]) { //Check if next position is occupied

        if (tempHeight !== foodPosition.height || tempWidth !== foodPosition.width) { //Check if next position isn't a food

            tail = queue[0];

            if (tail.height !== tempHeight || tail.width !== tempWidth) { //Check if next position isn't its own tail
                return true;
            }
        }
    }
    return false;
}

function cleanTail(tempHeight, tempWidth) {

    tail = queue[0];

    if (tempHeight !== foodPosition.height || tempWidth !== foodPosition.width) { //Checking if it's not a food

        tableArray[tail.height][tail.width] = 0;
        queue.shift();

        renderObject(tail, colorEnv); // Set the tail position back to the environment color

    } else {
        //If it's a food, the tail stays, the scoreboard is updated and a new food is setted in a new random position 

        updateScoreBoard();
        
        setRandomFood();
    }
}

function setHeadPosition(tempHeight, tempWidth) {
    tableArray[tempHeight][tempWidth] = 1;

    head = {
        height: tempHeight,
        width: tempWidth
    }
    queue.push(head);

    renderObject(head, colorSnake);
}

function updateScoreBoard() {
    const scoreBoard = document.querySelector('div.scoreBoard #number');
    scoreBoard.innerHTML = '';
    score += 1;
    scoreBoard.appendChild(document.createTextNode(score));
}

function gameOver(collision = false) {
    matchStarted = false;
    tableArray.length = 0;
    queue.length = 0;
    directionQueue.length = 0;
    direction = 1;
    clearInterval(interval);
    if (collision) alert(`Game Over!\nScore: ${score}`);
    score = 0;
    setHomeDiv();
}

launch();