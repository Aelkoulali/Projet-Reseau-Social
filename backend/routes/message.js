const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const multer = require("../middlewares/multer-config");

router.post("/", multer, messageCtrl.createMessage);
router.put("/:id", multer, messageCtrl.modifyMessage);
router.get("/", messageCtrl.findAllMessages);
router.get("/users/:id", messageCtrl.findAllMessagesForOne);
router.get("/:id", messageCtrl.findOneMessage);
router.delete("/:id", messageCtrl.deleteMessage);

module.exports = router;
