// require basic flashcard module
var BasicCard = require('./basic_flashcard.js');
// require cloze flashcard module
var ClozeCard = require('./cloze_flashcard.js');
// require inquirer for sweet CLI
var inquirer = require('inquirer');
// require fs
var fs = require('fs');

// Function to create a new basic flashcard
function generateBasicFlashcard() {
    // CLI prompts
    inquirer.prompt([{
        type: 'input',
        message: 'What should go on the front of the card?',
        name: 'front'
    }, {
        type: 'input',
        message: 'What should go on the back of the card?',
        name: 'back'
    }]).then(function(response) {
        // create a new flashcard variable
        var newBasicFlashcard = new BasicCard(response.front, response.back);
        // create and append JSON to file via the prototyped function
        newBasicFlashcard.createCardJSON();
        // log the entries to the console
        console.log('Front: ' + newBasicFlashcard.front);
        console.log('Back: ' + newBasicFlashcard.back);
        // restart the CLI from the beginning
        startCLI();
    // Catch errors a promise may swallow
    }).catch(function(err) {
			console.log(err);
		});
}

function generateClozeFlashcard() {
    // CLI prompts
    inquirer.prompt([{
        type: 'input',
        message: 'What the full text of the card be?',
        name: 'fullText'
    }, {
        type: 'input',
        message: 'What should the cloze be?',
        name: 'fullCloze'
    }]).then(function(response) {
        // create a new flashcard variable
        var newClozeFlashcard = new ClozeCard(response.fullText, response.fullCloze);
        // create the cloze deleted property value via prototyped function
        newClozeFlashcard.createClozeDeleted()
        // log the entries to the console
        console.log('Full text: ' + newClozeFlashcard.text);
        console.log('Cloze: ' + newClozeFlashcard.cloze);
        console.log('Full text with cloze deleted: ' + newClozeFlashcard.clozeDeleted);
        if (newClozeFlashcard.clozeDeleted !== '') {
	        // create and append JSON to file via the prototyped function
	        newClozeFlashcard.createCardJSON();
	      } else {
	      	console.log('The cloze did not exist in the original text, and will not be saved.')
	      }
        // restart the CLI from the beginning
        startCLI();
    // Catch errors a promise may swallow
    }).catch(function(err) {
			console.log(err);
		});
}

// shows the cards to user via CLI
var showCard = function(cardArray, cardIndex) {
    // current card
    card = cardArray[cardIndex];
    // card parsed from JSON
    var parsedCard = JSON.parse(card);
    // define cardText for reuse
    var cardText = '';
    // define answer for reuse
    var answer = '';
    // determine card type and assign variable values as necessary
    if (parsedCard.type === 'basicCard') {
        cardText = parsedCard.front;
        answer = parsedCard.back;
    } else if (parsedCard.type === 'clozeCard') {
        cardText = parsedCard.clozeDeleted;
        answer = parsedCard.cloze;
    }
    // CLI prompts for flashcardQ&A
    inquirer.prompt([{
        name: 'flashcard',
        message: cardText
    }]).then(function(response) {
        // Determinator of right and wrong answers.
        if (response.flashcard === answer) {
            console.log('Nicely done.');
        } else {
            console.log('NO!');
        }
    }).then(function(response) {
		    // Card looper: if the card index is in the array, increase it and run showCard
		    if (cardIndex < cardArray.length - 1) {
		        showCard(cardArray, cardIndex + 1);
		        // else restart the CLI
		    } else {
		        // restart the CLI from the beginning
		        startCLI();
		    }
    // Catch errors a promise may swallow
    }).catch(function(err) {
			console.log(err);
		});
};

function previousFlashcards() {
    // read the log.txt
    fs.readFile('./log.txt', 'utf8', function(err, data) {
        //if error, log error
        if (err) {
            console.log('Error: ' + err);
        }
        // split data by semicolon
        var cards = data.split(';');
        // this returns data values
        var data = function(val) {
            return val;
        };
        // this saves only data with values
        cards = cards.filter(data);
        // this is an incrementer for recursion
        var cardNumber = 0;
        // shows the cards to user via CLI
        showCard(cards, cardNumber);
    });
}

// Function to initiate CLI and triage responses
function startCLI() {
    // Prompts to determine actions
    inquirer.prompt([{
        type: 'list',
        message: 'Welcome to your ultimate flashcard creating tool! Please choose an option:',
        choices: ['Add a new flashcard', 'Show all previous flashcards', 'EXIT'],
        name: 'begin'
    }, {
        type: 'list',
        message: 'Would you like to create a basic flashcard, or a cloze card (the dumb one)?',
        choices: ['Basic Flashcard', 'Cloze Flashcard'],
        name: 'cardType',
        // Only show this prompt if a new flashcard is wanted
        when: function(response) {
            return response.begin === 'Add a new flashcard';
        }
    }]).then(function(response) {
        // call flashcard related functions
        if (response.begin === 'Add a new flashcard') {
            // generate a basic flashcard
            if (response.cardType === 'Basic Flashcard') {
                generateBasicFlashcard();
                // generate a cloze flashcar
            } else if (response.cardType === 'Cloze Flashcard') {
                generateClozeFlashcard();
                // log an error
            } else {
                console.log('Something has gone wrong with flashcard creation! Abort!!!');
            }
            // show previous flashcards
        } else if (response.begin === 'Show all previous flashcards') {
            previousFlashcards();
            // exit the CLI
        } else if (response.begin === 'EXIT') {
            console.log('Goodbye');
            return;
            // if error, show this message and exit CLI
        } else {
            console.log('Something has gone wrong with displaying the JSON object! Abort!!!');
            return;
        }
    // Catch errors a promise may swallow
    }).catch(function(err) {
			console.log(err);
		});
}

// Start CLI
startCLI();
