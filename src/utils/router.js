import express from "express";
import receiveMangoMsg from "../routes/v1/mangoDB/receiveMango.js";
import receiveRedisoMsg from "../routes/v1/reddis/receiveRedis.js";
import receivePostGreeMsg from "../routes/v1/postGree/receivePostgree.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const message = "Hello World! 🤞🤞🤞🤞";
  res.json({ message });
});

router.post("/api/v1/mangoDB/receiveMsg", receiveMangoMsg);
router.post("/api/v1/redis/receiveMsg", receiveRedisoMsg);
router.post("/api/v1/postgree/receiveMsg", receivePostGreeMsg);

export default router;