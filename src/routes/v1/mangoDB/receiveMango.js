import connectRabbitServer from "../../../utils/connectRabbitServer.js";

const receiveMangoMsg = async (req, res) => {
  try {
    const queuName = "mangoQueu"; // la file sur laquelle on va publier le message
    const newMessage = req.body;

    // connexion avec RabbitMQ
    const connection = await connectRabbitServer();
    const channel = await connection.createChannel();

    // Publier le nouveau message sur une fille d'attente
    await channel.assertQueue(queuName, { durable: false });
    channel.sendToQueue(queuName, Buffer.from(JSON.stringify(newMessage)));

    const message = `Nouveau message publiée sur la file MangoDB`;

    // Fermer la connexion avec RabbitMQ
    await channel.close();
    await connection.close();

    res.status(200).json({ message, data: newMessage });
  } catch (error) {
    console.warn(error);
    res.status(500).json(error);
  }
};

export default receiveMangoMsg;
