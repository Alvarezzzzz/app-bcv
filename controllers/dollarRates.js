import { DollarRateModel } from "../models/dollarRate.js";
/* Importamos las validaciones */
import getInfoBCV from "../utils/getDollarBCV.js";

export class DollarRateController {
  static async getToday(req, res) {
    const { dolarRate, success } = await DollarRateModel.getToday();
    if (!success) return res.status(500).json({ message: "Server error" });
    if (!dolarRate) return res.status(404).json({ message: "Not found" });
    res.json(dolarRate);
  }

  static async getHistory(req, res) {
    const dolarRate = await DollarRateModel.getHistory();
    res.json(dolarRate);
  }

  static async getRange(req, res) {
    const { range } = req.query;
    /* Hay que validar el range */
    const dolarRates = await DollarRateModel.getRange({ range });
    res.json(dolarRates);
  }

  static async create(req, res) {
    const { tasa, fecha } = await getInfoBCV();
    const dolarRate = await DollarRateModel.create({ tasa, fecha });
    res.json(dolarRate);
  }
}
