import express, { json } from "express";
/* Routes */
import { corsMiddleware } from "./middlewares/cors.js";
import { PORT } from "./config.js";

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/bcv", (req, res) => {
  res.send("Hola, todavia no tengo la tasa del bcv");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
