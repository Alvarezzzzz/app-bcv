import { Router } from "express";
import { DollarRateController } from "../controllers/dollarRates.js";

export const dollarRatesRouter = Router();

dollarRatesRouter.get("/today", DollarRateController.getToday);
dollarRatesRouter.get("/history", DollarRateController.getHistory);
dollarRatesRouter.get("/range", DollarRateController.getRange);

dollarRatesRouter.post("/", DollarRateController.create);
