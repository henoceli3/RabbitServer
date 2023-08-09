import connectRabbitServer from "../../../utils/connectRabbitServer.js";

const receiveRedisoMsg = async (req, res) => {
  try {
    const queuName = "redisQueu"; // la file sur la quelle on va publier le message
    const newMessage = req.body;

    // connexion avec RabbitMQ
    const connection = await connectRabbitServer();
    const channel = await connection.createChannel();

    // Publier le nouveau message sur une fille d'attente
    await channel.assertQueue(queuName, { durable: false });
    channel.sendToQueue(queuName, Buffer.from(JSON.stringify(newMessage)));

    // message de réponse
    const message = `Nouveau message publiée sur la file Redis`;

    // Fermer la connexion avec RabbitMQ
    await channel.close();
    await connection.close();

    res.status(200).json({ message });
  } catch (error) {
    console.warn(error);
    res.status(500).json(error);
  }
};

export default receiveRedisoMsg;
