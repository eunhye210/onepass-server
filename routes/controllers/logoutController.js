module.exports = {
  logout: function (req, res, next) {
    res.clearCookie("sessionKey");
    res.sendStatus(200);
  }
}