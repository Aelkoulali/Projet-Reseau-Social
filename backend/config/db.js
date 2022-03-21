const Sequelize = require("sequelize");
require("dotenv").config({ path: "./.env" });

// Database Connection Settings
const sequelize = new Sequelize(process.env.DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

// Database Connection Test 
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de donnée SUCCESS");
  })
  .catch((err) => {
    console.error("Connexion à la base de donnée FAIL", err);
  });

module.exports = sequelize;
global.sequelize = sequelize;