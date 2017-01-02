// require fs
var fs = require('fs');

// basic flashcard object constructor
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

// export this thing!
module.exports = BasicCard;
