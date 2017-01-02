// require fs
var fs = require('fs');

// cloze flashcard object constructor
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = '';
    this.createClozeDeleted = function() {
        if (this.text.indexOf(this.cloze) >= 0) {
            this.clozeDeleted = this.text.replace(this.cloze, '...');
        } else {
            console.log('ERROR: YOU DID SOMETHING WRONG')
        }
    };
    this.createCardJSON = function() {
        // flashcard object to be appended to log.txt
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: 'cloze'
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

module.exports = ClozeCard;
