const randomWords = require("random-words");

function wordBasedPasswordGenerator() {
  const randomWordsArr = randomWords(3);
  const numbers = "0123456789";
  let randomNumberString = "";

  for (let i = 0; i < 5; i++) {
    randomNumberString += numbers.charAt(Math.floor(Math.random() * 10));
  }

  const randomWordsNumbersArr = randomWordsArr.concat(randomNumberString.split(""));
  const shuffledArr = randomWordsNumbersArr.sort(() => Math.random() - 0.5);

  return shuffledArr.join("");
}

module.exports = wordBasedPasswordGenerator;
