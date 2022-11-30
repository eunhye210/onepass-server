const randomWords = require("random-words");

function createLowerUpperNumPassword(length) {
  let randomString = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return randomString;
}

function createLowerUpperNumSymbolPassword(length) {
  let randomString = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*_-+=<>?";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return randomString;
}

function createWordBasedPassword() {
  const randomWordsArr = randomWords(3);
  const numbers = "0123456789";
  let randomNumberString = "";

  for (let i = 0; i < 5; i++) {
    randomNumberString += numbers.charAt(Math.floor(Math.random() * 10));
  }

  const randomWordsNumbersArr = randomWordsArr.concat(
    randomNumberString.split("")
  );
  const shuffledArr = randomWordsNumbersArr.sort(() => Math.random() - 0.5);

  return shuffledArr.join("");
}

function createRandomPassword(type) {
  if (type === "good") {
    const result = createLowerUpperNumPassword(12);
    return result;
  }

  if (type === "strong") {
    const result = createLowerUpperNumSymbolPassword(12);
    return result;
  }

  if (type === "weak") {
    const result = createWordBasedPassword();
    return result;
  }
}

module.exports = { createLowerUpperNumPassword, createRandomPassword };
