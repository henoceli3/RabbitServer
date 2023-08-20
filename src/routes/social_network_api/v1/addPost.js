import { models } from "../../../db/sequelize.js";
import RabbitServer from "../../../utils/RabbitClasse.js";
import myRabbitServer from "../../../utils/myRabbitServer.js";

const addPost = async (req, res) => {
  try {
    const {
      idmembre,
      post_texte,
      post_allfiles,
      fileType,
      post_titre1,
      post_titre2,
    } = req.body;
    const setPostObjetct = (post_fichier) => {
      const postSended = {
        idmembre: idmembre,
        idtype: fileType,
        fichier: post_fichier,
        datecrea: Date.now(),
        memo: post_texte,
        idcateg: "0",
        lienvideo: "",
        thb: "",
        declarercarte: 0,
        vue: 0,
        titre_1: post_titre1,
        titre_2: post_titre2,
      };
      return postSended;
    };

    // Instanciation du serveur RabbitMQ
    const myRabbitServer = new RabbitServer(
      process.env.RABBIT_HOST_NAME,
      process.env.RABBIT_PROTOCOL,
      process.env.RABBIT_PORT,
      process.env.RABBIT_USERNAME,
      process.env.RABBIT_PASSWORD
    );
    await myRabbitServer.connect();

    if (!post_texte) {
      return res.status(200).json({
        error: 1,
        infos: "Aucun texte associé à la publication !",
        fichier: "",
      });
    }

    if (idmembre) {

      if (post_allfiles === 0) {
        await myRabbitServer.publishToQueue("fileRedis", setPostObjetct(""));
        return res
          .status(200)
          .json({ error: "0", fichier: "" });
      }

      if (req.files && post_allfiles > 0) {
        console.log("fdvbdffn");
        const uploadedFiles = req.files;
        for (let i = 0; i < uploadedFiles.length; i++) {
          const file = uploadedFiles[i];
          await myRabbitServer.publishToQueue(
            "fileRedis",
            setPostObjetct(file.filename)
          );
          return res
            .status(200)
            .json({ error: 0, id: newPost.id, fichier: file.filename });
        }
      }
    } else {
      return res.json({ error: "1", infos: "Vous n'êtes pas connecté" });
    }

    await myRabbitServer.close();
  } catch (error) {
    console.error("Create error:", error);
  }
};

export default addPost;
