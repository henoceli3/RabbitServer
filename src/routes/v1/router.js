import express from "express";
import receiveMangoMsg from "./mangoDB/receiveMango.js";


const router = express.Router();

router.get("/", async (req, res) => {
    res.json("Hello World! 🤞🤞🤞🤞");
})
router.post("/api/v1/mangoDB/receiveMsg", receiveMangoMsg);

export default router;
