const db = require("../models");
const Comment = db.comments;
const User = db.users;

// Display All Comments
exports.findAllComments = (req, res, next) => {
  const CommentsForOneMessage = {};
  Comment.findAll({
    where: {
      MessageId: req.params.id,
    },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "isActive", "firstName", "lastName"],
    },
    order: [["id", "DESC"]],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Select One Comment
exports.findOneComment = (req, res, next) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: User,
      required: true,
      attributes: ["userName", "avatar", "firstName", "lastName"],
    },
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error }));
};

// Add One Comment
exports.createComment = (req, res, next) => {
  const comment = new Comment({
    UserId: req.body.UserId,
    MessageId: req.body.MessageId,
    comment: req.body.comment,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modify One Comment
exports.modifyComment = (req, res, next) => {
  Comment.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Delete One Comment
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
