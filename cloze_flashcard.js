// require fs
var fs = require('fs');

// cloze flashcard object constructor
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = '';
    // function for creating the cloze deleted text
    this.createClozeDeleted = function() {
        // checks if the cloze is in the text...
        if (this.text.indexOf(this.cloze) >= 0) {
            // replace the cloze in the text with ellipses
            this.clozeDeleted = this.text.replace(this.cloze, '...');
        } else {
            // if the cloze is not the text, console log this error
            console.log('ERROR: YOU DID SOMETHING WRONG')
        }
    };
    // function to add the card to a log file
    this.createCardJSON = function() {
        // flashcard object to be appended to log.txt
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: 'clozeCard'
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

// export this thing!
module.exports = ClozeCard;
