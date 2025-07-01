import express, { json } from "express";
import { dollarRatesRouter } from "./routes/dollarRates.js";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
app.use(json());
app.use(cors());
app.disable("x-powered-by");

app.use("/dollarRates", dollarRatesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
