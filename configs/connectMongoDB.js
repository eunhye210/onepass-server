const mongoose = require("mongoose");

module.exports = function () {
  try {
    const url = process.env.MONGOOSE_URL;
    mongoose.connect(url, { useNewUrlParser: true });
  } catch (err) {
    console.error(err);
  }
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", console.log.bind(console, "Connected to database.."));
