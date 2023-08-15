import myRabbitServer from "../../../utils/myRabbitServer.js";


const receivePostgreeMsg = async (req, res) => {
  try {
    const { message } = req.body;
    const rabbitServer = myRabbitServer;
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
