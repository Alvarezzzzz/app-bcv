import express, { json } from "express";
import { dollarRatesRouter } from "./routes/dollarRates.js";
import cors from "cors";
import cron from "node-cron";
import { PORT } from "./config.js";
import setDailyDollar from "./utils/setDailyDollar.js";

const app = express();
app.use(json());
app.use(cors());
app.disable("x-powered-by");

app.use("/dollarRates", dollarRatesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

/* Cada dia a las 6pm se actualiza la tasa diaria */
cron.schedule("0 18 * * *", () => setDailyDollar());
