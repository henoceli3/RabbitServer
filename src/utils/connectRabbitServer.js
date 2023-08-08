import { connect } from "amqplib";
import dotenv from "dotenv";
dotenv.config();

/**
 * Connects to the RabbitMQ server.
 *
 * @return {Promise} A promise that resolves to a connection object.
 */

const connectRabbitServer = () => {
  return connect({
    hostname: process.env.RABBIT_HOST_NAME || "localhost",
    protocol: process.env.RABBIT_PROTOCOL,
    port: process.env.RABBIT_PORT,
    username: process.env.RABBIT_USERNAME,
    password: process.env.RABBIT_PASSWORD,
  });
};

export default connectRabbitServer;
