import myRabbitServer from "./src/utils/myRabbitServer.js";

const subcription = async () => {
  const rabbitServer = myRabbitServer;
  await rabbitServer.connect();
  await rabbitServer.subscribeToQueue("filePostgree", (message) => {
    console.log(`Nouveau message reçu sur la file Reddis : ${message}`);
  });
};
subcription();
