const express = require("express");
const app = express();
const path = require("path");
const auth = require("./middlewares/auth");

// Use Helmet To protect Express App
const helmet = require("helmet");
const cors = require("cors");

// Routes
require("dotenv").config({ path: "./config/.env" });

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");

// Database Connection
require("./_database/db.connexion");

// Database Syncronize To Models
const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
db.sequelize.sync().then(() => {
  console.log("Drop and Resync Database");
});

require("./config/admin");

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

// Cross Error Handler
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Endpoints
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/api/messages", auth, messageRoutes);
app.use("/api/comments", auth, commentRoutes);

module.exports = app;
