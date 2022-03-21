const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var emailValidator = require("email-validator");
var passwordValidator = require("password-validator");
require("dotenv").config({ path: "./config/.env" });

// Create Password Schema
const passwordSchema = new passwordValidator();
passwordSchema.is().min(5).is().max(20).has().uppercase(1).has().lowercase().has().digits(2).has().not().spaces();

// Create New User
exports.signup = (req, res, next) => {
  if (!emailValidator.validate(req.body.email)) {
    return res.status(400).json({ message: "Merci de rentrer une adresse email valide" });
  } else if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 5 caractères, 1 majuscule et 2 chiffres",
    });
  }
  return bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      return user
        .save()
        .then(() => res.status(201).json({ message: "Votre compte a été enregistré avec succès!" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// check E-mail Duplicate
exports.checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Un compte utilisant cet email existe déjà!",
      });
      return;
    }
    next();
  });
};

// User Login
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: "Utilisateur connecté !",
            userId: user.id,
            role: user.isAdmin,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            userEmail: user.email,
            avatar: user.avatar,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(502).json({ error }));
};
