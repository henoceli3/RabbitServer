import dotenv from "dotenv";
import RabbitServer from "./RabbitClasse.js";
dotenv.config();

/**
 * Instanciation du serveur RabbitMQ
 *
 * @type {RabbitServer} - Le serveur RabbitMQ.
 */
const myRabbitServer = new RabbitServer(
  process.env.RABBIT_HOST_NAME,
  process.env.RABBIT_PROTOCOL,
  process.env.RABBIT_PORT,
  process.env.RABBIT_USERNAME,
  process.env.RABBIT_PASSWORD
);

export default myRabbitServer;
