// require fs
var fs = require('fs');

// basic flashcard object constructor
function BasicFlashcard(front, back) {
    this.front = front;
    this.back = back;
    this.create = function() {
        // flashcard object to be appended to log.txt
        var data = {
            front: this.front,
            back: this.back,
            type: 'basic',
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

module.exports = BasicFlashcard;
