import myRabbitServer from "../../../utils/myRabbitServer.js";
const receiveRedisoMsg = async (req, res) => {
  try {
    const message  = req.body;
    const rabbitServer = myRabbitServer;
    await rabbitServer.connect();
    await rabbitServer.publishToQueue("fileRedis", message);
    await rabbitServer.close();
    const message_response = `Nouveau message publiée sur la file Redis`;
    res.status(200).json({ message_response, message });
  } catch (error) {
    const message_response = `Erreur lors de la publication du message sur la file Redis : ${error}`;
    res.status(500).json({ message_response });
  }
};

export default receiveRedisoMsg;
