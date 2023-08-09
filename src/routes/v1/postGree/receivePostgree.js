import connectRabbitServer from "../../../utils/connectRabbitServer.js";

const receivePostGreeMsg = async (req, res) => {
  try {
    const exchange = "postGreeQueu";
    const newMessage = req.body;
    const connection = await connectRabbitServer();
    const channel = await connection.createChannel();

    // Publier le nouveau message sur l'échange de type "fanout"
    await channel.assertExchange(exchange, "fanout", { durable: true });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(newMessage)));

    const message = `Nouveau message publiée`;

    // Fermer la connexion avec RabbitMQ
    await channel.close();
    await connection.close();

    res.status(200).json({ message, data: newMessage });
  } catch (error) {
    console.warn(error);
    res.status(500).json(error);
  }
};

export default receivePostGreeMsg;
