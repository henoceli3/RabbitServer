import { connect } from "amqplib";

class RabbitServer {
  constructor(hostname, protocol, port, username, password) {
    this.hostname = hostname;
    this.protocol = protocol;
    this.port = port;
    this.username = username;
    this.password = password;
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await connect({
        hostname: this.hostname,
        protocol: this.protocol,
        port: this.port,
        username: this.username,
        password: this.password,
      });
      this.channel = await this.connection.createChannel();
      const message = `Connexion au serveur RabbitMQ réussie.`;
      console.log(message);
    } catch (error) {
      const message = `Une erreur est survenue lors de la connexion au serveur RabbitMQ : ${error}`;
      console.warn(message);
      throw new Error(message);
    }
  }

  async publishToQueue(queuName, message) {
    if (!this.channel) {
      console.warn("La connexion n'est pas ouverte.");
    }
    await this.channel.assertQueue(queuName, { durable: false });
    this.channel.sendToQueue(queuName, Buffer.from(JSON.stringify(message)));
    console.log(`Message publié sur la file ${queuName}: ${message}`);
  }

  async subscribeToQueue(queuName, callback) {
    if (!this.channel) {
      console.warn("La connexion n'est pas ouverte.");
    }
    await this.channel.assertQueue(queuName, { durable: false });
    this.channel.consume(queuName, callback, { noAck: true });
    console.log(`Ecoute de la file ${queuName}`);
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
    console.log("Connexion fermée");
  }
}
export default RabbitServer;