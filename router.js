import express from "express";
import addPost from "./src/routes/social_network_api/v1/create_post.js";
import upload from "./src/multer/multer_midelware.js";
import receiveMangoMsg from "./src/routes/moov_bd/v1/mangoDB/receiveMango.js";
import receivePostgreeMsg from "./src/routes/moov_bd/v1/postGree/receivePostgree.js";
import receiveRedisoMsg from "./src/routes/moov_bd/v1/reddis/receiveRedis.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const message = "Hello World! 🤞🤞🤞🤞";
  res.json({ message });
});

router.post("/api/v1/mangoDB/receiveMsg", receiveMangoMsg);
router.post("/api/v1/redis/receiveMsg", receiveRedisoMsg);
router.post("/api/v1/postgree/receiveMsg", receivePostgreeMsg);
router.post("/api/social_network_api/v1/create_post", upload.single("file"), addPost);

export default router;