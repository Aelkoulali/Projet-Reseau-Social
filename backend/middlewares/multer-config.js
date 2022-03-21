// Stockage de l'image dans le serveur
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // on prend le nom du fichier, on remplace espace par underscore
    const extension = MIME_TYPES[file.mimetype]; //on utilise mimetypes pour générer extension de fichier
    callback(null, name + Date.now() + "." + extension); //on créer le file name en utilisant le name + le timestamp point extension du fichier
  },
});

module.exports = multer({ storage: storage }).single("image");
