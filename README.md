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

The basic flashcard constructor looks like this:

```javascript
function BasicCard(front, back) {
    this.front = front;
    this.back = back;
    // Function to add the card to a log file
    this.createCardJSON = function() {
        // Flashcard object to be appended to log.txt
        var data = {
            front: this.front,
            back: this.back,
            type: 'basicCard',
        };
        // Append card to log.txt
        fs.appendFile('log.txt', JSON.stringify(data) + ';', 'utf8', function(err) {
            // If error, log error
            if (err) {
                console.log(err);
            }
        });
    };
}
```

It takes in the arguments `front` and `back`, which it saves to the properties of the same name.

The `createCardJSON` is a function that saves the data to the `log.txt` file as stringified JSON data.

Here is an example of outputted data:

```json
{
		"front":"What is Darth Vader's birth name?",
		"back":"Anakin Skywalker",
		"type":"basicCard"
}
```

## Example of a Cloze Flashcard

The cloze flashcard constructor looks like this:

```javascript
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = '';
    // Function for creating the cloze deleted text
    this.createClozeDeleted = function() {
        // Checks if the cloze is in the text...
        if (this.text.indexOf(this.cloze) >= 0) {
            // Replace the cloze in the text with ellipses
            this.clozeDeleted = this.text.replace(this.cloze, '...');
        } else {
            // If the cloze is not the text, console log this error
            console.log('ERROR: YOU DID SOMETHING WRONG')
        }
    };
    // function to add the card to a log file
    this.createCardJSON = function() {
        // Flashcard object to be appended to log.txt
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: 'clozeCard'
        };
        // Append card to log.txt
        fs.appendFile('log.txt', JSON.stringify(data) + ';', 'utf8', function(err) {
            // If error, log error
            if (err) {
                console.log(err);
            }
        });
    };
}
```

It takes in the arguments `text` and `cloze`, which it saves to the properties of the same name.

The `createClozeDeleted` is a prototype function that generates the proper value of `clozeDeleted`, which upon initiation is an empty string.
If the given `cloze` matches no part of the full `text`, it will throw an error, and leave the value as an empty string.

The `createCardJSON` is a function that saves the data to the `log.txt` file as stringified JSON data.

Here is an example of outputted data:

```json
{
		"text":"Darth Vader's birth name is Anakin Skywalker?",
		"cloze":"Anakin Skywalker",
		"clozeDeleted":"Darth Vader's birth name is ...",
		"type":"clozeCard"
}
```
