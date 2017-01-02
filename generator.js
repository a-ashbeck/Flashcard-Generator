// require basic flashcard module
var BasicCard = require('./basic_flashcard.js');
// require cloze flashcard module
var ClozeCard = require('./cloze_flashcard.js');
// require inquirer for sweet CLI
var inquirer = require('inquirer');
// require fs
var fs = require('fs');

inquirer.prompt([{
    type: 'list',
    message: 'Welcome to your ultimate flashcard creating tool! Please choose an option:',
    choices: ['Add a new flashcard', 'Show all previous flashcards JSON '],
    name: 'begin'
}, {
    type: 'list',
    message: 'Would you like to create a basic flashcard, or a cloze card (the dumb one)?',
    choices: ['Basic Flashcard', 'Cloze Flashcard'],
    name: 'cardType',
    when: function(answers) {
        return answers.begin === 'Add a new flashcard';
    }
}]).then(function(answers) {
    if (answers.begin === 'Add a new flashcard') {
        if (answers.cardType === 'Basic Flashcard') {
            generateBasicFlashcard();
        } else if (answers.cardType === 'Cloze Flashcard') {
            generateBasicClozecard();
        } else {
            console.log('Something has gone wrong with flashcard creation! Abort!!!');
        }
    } else if (answers.begin === 'Show all previous flashcards') {
        showPreviousFlashcardsJSON();
    } else {
        console.log('Something has gone wrong with displaying the JSON object! Abort!!!');
    }
});

function = generateBasicFlashcard() {
    inquirer.prompt([{
        type: 'input',
        message: 'What should go on the front of the card?',
        name: 'front'
    }, {
        type: 'input',
        message: 'What should go on the back of the card?',
        name: 'back'
    }]).then(function(answers) {
        var newBasicFlashcard = new BasicCard(answers.front, answers.back);
        newBasicFlashcard.createCardJSON();
        console.log('Front: ' + newBasicFlashcard.front);
        console.log('Back: ' + newBasicFlashcard.back);
    });
}
