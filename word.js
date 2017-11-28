// require the Letter module
const Letter = require('./letter');

const chalk = require('chalk');

function Word(word) {
  this.word = word;
  this.displayWord = '';
  this.allLetters = [];
  this.attempts = 5;

// generate blank space
  this.blankSpace = () => {
    let wordArr = word.split('');
    // store 'this' in a variable to avoid conflicts
    let thisWord = this;
    wordArr.forEach(function(element, index) {
      let objLetter = new Letter(element);
      thisWord.allLetters.push(objLetter)
      thisWord.displayWord += objLetter.getResult();
    });
    this.attempts += this.allLetters.length;
    return this.displayWord;
  };

}

// prototype function to check the status after every letter entered
Word.prototype.check = function(letter) {
      let flag = 0;
      // store 'this' in a variable to avoid conflicts
      let thisWord = this;
      if (this.displayWord.toLowerCase().indexOf(letter) == -1) {
        if (this.word.toLowerCase().indexOf(letter) > -1) {
          this.allLetters.forEach(function(element, index) {
            if (element.letter.toLowerCase() == letter.toLowerCase()) {
              element.replace();
              thisWord.displayWord = thisWord.displayWord.substr(0, index) + element.getResult() + thisWord.displayWord.substr(index + 1);
              flag = 1;
            }
          });
          // user gussed the letter right
          if(flag == 1){
            console.log(chalk.greenBright('Correct!'))
          }
        }
        // user gussed the letter wrong
       else {
          console.log(chalk.redBright('Incorrect!'))
          this.attempts--;
          console.log(this.attempts+ ' Gusses left!');

        }
      }
      // user had already gussed the letter
       // else{
      //     this.attempts--;
      //     console.log('Already Gussed!')
      //    console.log(this.attempts+ ' Gusses left!');
       // }
        return thisWord.displayWord;
};
// export the module
module.exports = Word;