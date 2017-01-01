// require fs
var fs = require('fs');

// cloze flashcard object constructor
function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, '...');
    this.create = function() {
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

module.exports = ClozeFlashcard;
