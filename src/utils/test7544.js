import express, { json } from "express";
import multer, { diskStorage } from "multer";
import { extname, join } from "path";
import { renameSync } from "fs";
const app = express();

app.use(json());

const storage = diskStorage({
  destination: function (req, file, cb) {
    // Configure le répertoire de destination en fonction du type de fichier
    if (req.body.fileType === "1") {
      cb(null, "./posts/images/");
    } else if (req.body.fileType === "2") {
      cb(null, "./posts/audios/");
    } else if (req.body.fileType === "3") {
      cb(null, "./posts/videos/");
    }
  },
  filename: function (req, file, cb) {
    const ext = extname(file.originalname);
    const fileName = `${req.body.idmembre}_${Date.now()}_${
      file.fieldname
    }${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("fichier", 10), (req, res) => {
  const idmembre = req.body.idmembre;
  const post_texte = req.body.post_texte;
  const post_allfiles = req.body.post_allfiles;
  const fileType = req.body.fileType;

  // Gérer la sauvegarde du contenu de la publication dans la base de données
  // Remplacez cette partie par votre logique de base de données
  if (!post_texte) {
    return res.json({ error: "1", infos: "Aucun texte !" });
  }

  if (idmembre) {
    if (post_allfiles === "0") {
      // Enregistrer le contenu de la publication sans fichier
      // Remplacez cette partie par votre logique de base de données
      return res.json({ error: "0", id: lastID, fichier: "" });
    }

    if (req.files && post_allfiles > "0") {
      // Traiter les fichiers téléchargés
      const uploadedFiles = req.files;

      // Gérer chaque fichier téléchargé
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const fileSize = file.size;
        const filePath = file.path;

        // Gérer la validation et le traitement des fichiers en fonction du fileType
        // Remplacez cette partie par votre logique de validation et de traitement des fichiers
        // Déplacer le fichier vers le répertoire approprié
        const destinationPath = join(
          __dirname,
          "posts",
          "images",
          file.filename
        );
        renameSync(filePath, destinationPath);

        // Enregistrer le contenu de la publication et les informations du fichier dans la base de données
        // Remplacez cette partie par votre logique de base de données
        // Obtenir le dernier ID inséré à partir de la base de données
        const lastID = 123; // Remplacez par le dernier ID inséré réel

        return res.json({ error: "0", id: lastID, fichier: file.filename });
      }
    }
  } else {
    return res.json({ error: "1", infos: "Vous n'êtes pas connecté" });
  }
});

app.listen(3000, () => {
  console.log("Le serveur écoute sur le port 3000");
});
