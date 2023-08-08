import { connect } from "amqplib";

const receiveMangoMsg = async (req, res) => {
  try {
    const exchange = "mangoQueu";
    const newMessage = {
      id: req.body.id,
      content: req.body.content,
    };
    const connection = await connect({
      hostname:
        "b-05e91662-2e5f-4d08-b2c0-0e580f88c71d.mq.eu-north-1.amazonaws.com",
      protocol: "amqps",
      port: 5671,
      username: "ouatt",
      password: "R@bbitP@ssWord2023",
    });
    const channel = await connection.createChannel();

    // Publier le nouveau message sur l'échange de type "fanout"
    await channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(newMessage)));

    const message = `Nouveau message publiée`;
    console.log(message, newMessage);

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
