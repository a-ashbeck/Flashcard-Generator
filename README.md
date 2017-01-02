# Flashcard-Generator

This is homework 9 for the Northwestern Coding Bootcamp. This is a flashcard generator with a snazzy CLI.

## Setup

You will need to add a `log.txt` file to your repo when you pull it down. Keep it top level. This file is where flashcard JSON data will be stored. You do not need to touch it once it has been created.

Next, navigate to your repo in your command terminal, and enter:

`npm install`

This will ensure you have all the necessary NPM packages installed to run this generator.

## Using the Flashcard Generator

If you are not already there, navigate into the repo via the command line, and then enter:

`node generator.js`

You will then be prompted with 3 options: 

`Add a new flashcard`
`Show all previous flashcards`
`EXIT`

### Add a new flashcard

`Add a new flashcard` will branch to a new prompt with the follwing options:

`Basic Flashcard`
`Cloze Flashcard`

The `Basic Flashcard` will then prompt you to input text you want on the `front` of the card, as well as the answer text on the `back` of the card.
The `Cloze Flashcard` will prompt you to input text for a full phrase (`text`), followed by the `cloze` text, which is the portion you of the original text you would like to have deleted for the user to guess. The deleted text will be replaced with ellipses.

If the `cloze` text does not completely match a portion of the `text`, you will receive a log of your entries, but you will get error messages informaing you of such, and the data will not be saved to the `log.txt` file.

See the last two sections for examples of how the basic and cloze constructors work.

### Show all previous flashcards

`Show all previous flashcards` will use the data stored in the `log.txt` file to loop through each flashcard previously created, and then follow a classic question and response format for using flashcards. 

Answers must be typed EXACTLY as created, or else the answer will be marked incorrect.

### EXIT

Choosing the `EXIT` option will allow the user to exit the application. 

## Tech Notes

The CLI used in this application was built to above all else test the validity and reliability of the constructors and export system built into it, and therefore is not, and was never meant to be polished. This is a backend first project. 

All errors should log appropriately to the console. 

## Example of a Basic Flashcard

```javascript
function BasicCard(front, back) {
    this.front = front;
    this.back = back;
    // function to add the card to a log file
    this.createCardJSON = function() {
        // flashcard object to be appended to log.txt
        var data = {
            front: this.front,
            back: this.back,
            type: 'basicCard',
        };
        // append card to log.txt
        fs.appendFile('log.txt', JSON.stringify(data) + ';', 'utf8', function(err) {
            // if error, log error
            if (err) {
                console.log(err);
            }
        });
    };
}
```

## Example of a Cloze Flashcard

