const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer-config");

router.get("/:id", userCtrl.findOneUser);
router.put("/:id", multer, userCtrl.modifyUser);
router.delete("/:id", multer, userCtrl.deleteUser);

module.exports = router;
