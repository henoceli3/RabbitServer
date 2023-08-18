import myRabbitServer from "./src/utils/myRabbitServer.js";

const callback = (message) => {
  console.log(`Nouveau message reçu sur la file Reddis : ${message.content.toString()}`);
}
const subcription = async () => {
  const rabbitServer = myRabbitServer;
  await rabbitServer.connect();
  await rabbitServer.subscribeToQueue("fileRedis", callback);
};
subcription();