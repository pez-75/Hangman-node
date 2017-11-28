function Letter(letter) {
  this.letter = letter;
  this.gussed = false;
  this.blank = '_';


  // get result based on the flag of guessed letter object
  this.getResult = (letter) =>{
    if (this.gussed) {
      return this.letter;
    }
    else{
      return this.blank;
    }
  };
}

// prototype function to change the flag of guessed letter object
Letter.prototype.replace = function() {
  this.gussed = true;
  return this.gussed;
};



// export the module
module.exports = Letter;