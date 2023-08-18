import myRabbitServer from "../../../../utils/myRabbitServer.js";


/**
 * Reçoit un message Mango et le publie dans la file "fileMango".
 *
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @return {Promise} Une promesse qui se résout lorsque le message est publié.
 */
const receiveMangoMsg = async (req, res) => {
  try {
    const message = req.body;
    const rabbitServer = myRabbitServer;
    await rabbitServer.connect();
    await rabbitServer.publishToQueue("fileMango", message);
    await rabbitServer.close();
    const message_response = `Nouveau message publiée sur la file Mango`;
    res.status(200).json({ message_response });
  } catch (error) {
    const message_response = `Erreur lors de la publication du message sur la file Mango : ${error}`;
    res.status(500).json({ message_response });
  }
};

export default receiveMangoMsg;
