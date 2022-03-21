const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post("/signup", authCtrl.checkDuplicateEmail, authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
