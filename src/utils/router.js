import express from "express";
import receiveMangoMsg from "../routes/v1/mangoDB/receiveMango.js";
import receiveRedisoMsg from "../routes/v1/reddis/receiveRedis.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json("Hello World! 🤞🤞🤞🤞");
});

router.post("/api/v1/mangoDB/receiveMsg", receiveMangoMsg);
router.post("/api/v1/redis/receiveMsg", receiveRedisoMsg);

export default router;
