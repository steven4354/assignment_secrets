// /services/Session.js
const SECRET = process.env["secret"] || "puppies";
const md5 = require("md5");

const createSignedSessionId = email => {
  return `${email}:${generateSignature(email)}`;
};

const generateSignature = email => md5(email + SECRET);

const User = require("../models/user");

const loginMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) return next();

  const [email, signature] = sessionId.split(":");

  User.findOne({ email }, (err, user) => {
    if (signature === generateSignature(email)) {
      req.user = user;
      res.locals.currentUser = user;
      next();
    } else {
      res.send("You've tampered with your session!");
    }
  });
};

const loggedInOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("login");
  }
};

const loggedOutOnly = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  createSignedSessionId,
  loginMiddleware,
  loggedOutOnly,
  loggedInOnly
}
