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

  /**
   * Se connecte au serveur RabbitMQ.
   *
   * @return {Promise<void>} - Une promesse qui se résout lorsque la connexion est établie.
   */
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

  /**
   * Publie un message dans la file d'attente spécifiée.
   *
   * @param {string} queuName - Le nom de la file d'attente.
   * @param {any} message - Le message à publier.
   * @return {Promise<void>} - Une promesse qui se résout lorsque le message est publié avec succès.
   */
  async publishToQueue(queuName, message) {
    if (!this.channel) {
      console.warn("La connexion n'est pas ouverte.");
    }
    await this.channel.assertQueue(queuName, { durable: false });
    this.channel.sendToQueue(queuName, Buffer.from(JSON.stringify(message)));
    console.log(`Message publié sur la file ${queuName}`, message);
  }

  /**
   * Abonnez-vous à une file d'attente et exécutez une fonction de rappel lorsque vous recevez un message.
   *
   * @param {string} queueName - Le nom de la file d'attente à laquelle s'abonner.
   * @param {function} callback - La fonction de rappel à exécuter lorsqu'un message est reçu.
   * @return {Promise<void>} - Une promesse qui se résout lorsque l'abonnement est réussi.
   */
  async subscribeToQueue(queuName, callback) {
    if (!this.channel) {
      console.warn("La connexion n'est pas ouverte.");
    }
    await this.channel.assertQueue(queuName, { durable: false });
    this.channel.consume(queuName, callback, { noAck: true });
    console.log(`Ecoute de la file ${queuName}`);
  }

  /**
   * Publie un message sur un échange spécifique avec une clé de routage.
   *
   * @param {string} exchangeName - Le nom de l'échange.
   * @param {string} routingKey - La clé de routage.
   * @param {any} message - Le message à publier.
   * @return {Promise<void>} - Une promesse qui se résout lorsque le message est publié avec succès.
   */
  async publishToExchange(exchangeName, routingKey, message) {
    if (!this.channel) {
      console.warn("La connexion n'est pas ouverte.");
    }

    await this.channel.assertExchange(exchangeName, "direct", {
      durable: false,
    });
    this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    console.log(
      `Message publié sur l'échange ${exchangeName} avec la clé de routage ${routingKey}`,
      message
    );
  }

  /**
   * S'abonne à un échange avec une clé de routage spécifique et exécute une fonction de rappel lorsque vous recevez un message.
   *
   * @param {string} exchangeName - Le nom de l'échange à écouter.
   * @param {string} routingKey - La clé de routage à écouter.
   * @param {function} callback - La fonction de rappel à exécuter lorsqu'un message est reçu.
   * @return {Promise<void>} - Une promesse qui se résout lorsque l'abonnement est réussi.
   */
  async subscribeToExchange(exchangeName, routingKey, callback) {
    if (!this.channel) {
      console.warn("La connexion n'est pas ouverte.");
    }

    await this.channel.assertExchange(exchangeName, "direct", {
      durable: false,
    });
    const queueInfo = await this.channel.assertQueue("", { exclusive: true });
    this.channel.bindQueue(queueInfo.queue, exchangeName, routingKey);
    this.channel.consume(queueInfo.queue, callback, { noAck: false });
    console.log(
      `Écoute de l'échange ${exchangeName} avec la clé de routage ${routingKey}`
    );
  }

  /**
   * Ferme le canal et la connexion s'ils existent.
   *
   * @return {Promise<void>} - Une promesse qui se résout lorsque le canal et la connexion sont fermés.
   */

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    console.log("Connexion fermée");
  }
}
export default RabbitServer;
