// require prompt module to get user input
const prompt = require('prompt');
// require the word module
const Word = require('./word');

const chalk = require('chalk');

function Game() {
  this.words = ['Bears', 'Packers', 'Jets', 'Steelers', 'Ravens', 'Rams', 'Buccaneers', 'Lions', 'Saints'];
  this.index = 0;
  this.objWord;
  this.showWord;

//prompt function
  this.promptInput = () => {
    let objThis = this;
    let schema = {
      properties: {
        letter: {
          description: 'Guess a letter',
          type: 'string',
          pattern: /^\w$/,
          message: 'You must enter only one letter at a time',
          required: true,
        }
      }
    };
    prompt.start();
    prompt.get(schema, function(err, result) {
      objThis.checkLetter(result.letter);
    });
  }

// start the game
  this.play = () => {
    if (this.index == this.words.length - 1) this.index = 0;
    this.objWord = new Word(this.words[this.index]);
    this.objWord.blankSpace(this.words[this.index]);
    console.log(this.objWord.displayWord);
    this.index++;
    this.promptInput();
  }

// check the letter for match
  this.checkLetter = (letter) => {
    this.showWord = this.objWord.check(letter);
    console.log(this.objWord.displayWord);
    // user gussed the word right
    if (this.objWord.word === this.objWord.displayWord) {
      console.log(chalk.yellowBright('You Won! Guess the next word!'))
      this.play();
      // user ran out of attempts
    } else if (this.objWord.attempts == 0) {
      console.log(chalk.redBright('You Lost! Guess the next word!'))
      this.play();
      // user has attempts left
    } else {
      this.promptInput();
    }
  }
}

let objGame = new Game();
// start the game for the first time
objGame.play();