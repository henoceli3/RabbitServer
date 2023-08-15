import myRabbitServer from "./src/utils/myRabbitServer.js";

const publish = async () => {
  const rabbitServer = myRabbitServer;
  await rabbitServer.connect();
  await rabbitServer.publishToQueue("filePostgree", {
    message: "Hello World!",
  });
  await rabbitServer.close();
};
publish();
