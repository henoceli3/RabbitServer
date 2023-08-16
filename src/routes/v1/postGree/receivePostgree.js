import myRabbitServer from "../../../utils/myRabbitServer.js";

/**
 * Reçoit un message Postgree depuis le corps de la requête et le publie dans la file "filePostgree" en utilisant un serveur RabbitMQ.
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise<void>} Une promesse qui se résout lorsque le message a été publié avec succès ou est rejetée avec un message d'erreur.
 */
const receivePostgreeMsg = async (req, res) => {
  try {
    const message = req.body;
    const rabbitServer = myRabbitServer;
    await rabbitServer.connect();
    await rabbitServer.publishToQueue("filePostgree", message);
    await rabbitServer.close();
    const message_response = `Nouveau message publiée sur la file Postgree`;
    res.status(200).json({ message_response });
  } catch (error) {
    const message_response = `Erreur lors de la publication du message sur la file Postgree : ${error}`;
    res.status(500).json({ message_response });
  }
};

export default receivePostgreeMsg;
