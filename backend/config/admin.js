const db = require("../models");
const bcrypt = require("bcrypt");

require("dotenv").config({ path: "./.env" });

// Function That Create Admin Account
function setAdmin(req, res) {
  db.User.findOne({ where: { email: process.env.ADMIN_EMAIL } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(process.env.Admin_password, 10)
          .then((hash) => {
            const admin = db.User.create({
              userName: process.env.ADMIN_USERNAME,
              firstName: process.env.ADMIN_FIRSTNAME,
              lastName: process.env.ADMIN_LASTNAME,
              email: process.env.ADMIN_EMAIL,
              password: hash,
              isAdmin: true,
              isActive: true,
            })
              .then((admin) => {
                console.log(admin);
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "l'admin est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setAdmin();