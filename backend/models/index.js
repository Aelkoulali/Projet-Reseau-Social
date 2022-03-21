"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const filename = path.basename(__filename);
require("dotenv").config({ path: "./.env" });

const db = {};

// Database Connection Settings
const sequelize = new Sequelize(process.env.DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== filename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
db.messages = require("./messages.js")(sequelize, Sequelize);
db.comments = require("./comments.js")(sequelize, Sequelize);

//Relations entre les tables
db.comments.belongsTo(db.messages);
db.comments.belongsTo(db.users);
db.messages.hasMany(db.comments);
db.messages.belongsTo(db.users);
db.users.hasMany(db.messages);
db.users.hasMany(db.comments);

module.exports = db;
