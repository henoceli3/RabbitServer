import {models} from "../../../db/sequelize.js";
import { join } from "path";
import { renameSync } from "fs";

const addPost = (req, res) => {
  const idmembre = req.body.idmembre;
  const post_texte = req.body.post_texte;
  const post_allfiles = req.body.post_allfiles;
  const fileType = req.body.fileType;

  // Gérer la sauvegarde du contenu de la publication dans la base de données
  // Remplacez cette partie par votre logique de base de données
  if (!post_texte) {
    return res.json({ error: "1", infos: "Aucun texte !" });
  }
  const tt = models;

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
};

// export default addPost;
