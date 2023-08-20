import express from "express";
import upload from "./src/multer/multer_midelware.js";
import receiveMangoMsg from "./src/routes/moov_bd/v1/mangoDB/receiveMango.js";
import receivePostgreeMsg from "./src/routes/moov_bd/v1/postGree/receivePostgree.js";
import receiveRedisoMsg from "./src/routes/moov_bd/v1/reddis/receiveRedis.js";
import addPost from "./src/routes/social_network_api/v1/addPost.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const message = "Hello World! 🤞🤞🤞🤞";
  res.json({ message });
});

router.post("/api/v1/mangoDB/receiveMsg", receiveMangoMsg);
router.post("/api/v1/redis/receiveMsg", receiveRedisoMsg);
router.post("/api/v1/postgree/receiveMsg", receivePostgreeMsg);
router.post("/api/social_network_api/v1/create_post", upload.single("fichier"), addPost);

export default router;