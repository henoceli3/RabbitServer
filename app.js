import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/utils/router.js";
import dotenv from "dotenv";
import { inject } from "@vercel/analytics";
inject();
dotenv.config();

//appelle de express()
const app = express();

// definition du port
const port = process.env.PORT || 4000;

//
app.use(cors());

// pour renvoyer le corps en json
app.use(bodyParser.json());

// routes
app.use("/", router);

// au cas ou la route demandée n'existe pas
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

// demarrage du serveur
app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur: http://localhost:${port}`
  )
);

//Exporter l'appli
export default app;
