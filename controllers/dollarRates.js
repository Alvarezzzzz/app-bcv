import { DollarRateModel } from "../models/dollarRate.js";
import { validateDateOrRange } from "../schemas/dollarRates.js";
import getDate from "../utils/getDate.js";
import getInfoBCV from "../utils/getDollarBCV.js";
import getRate from "../utils/getRate.js";

export class DollarRateController {
  static async getToday(req, res) {
    const { dolarRate, success } = await DollarRateModel.getToday();
    if (!success) return res.status(500).json({ message: "Server error" });
    if (!dolarRate) return res.status(404).json({ message: "Not found" });
    res.json(dolarRate);
  }

  static async getHistory(req, res) {
    const { dolarRates, success } = await DollarRateModel.getHistory();
    if (!success) return res.status(500).json({ message: "Server error" });
    if (!dolarRates) return res.status(404).json({ message: "Not found" });
    res.json(dolarRates);
  }

  static async getRange(req, res) {
    const { range } = req.query;
    const resul = validateDateOrRange(range);
    if (!resul.success) return res.status(400).json(resul.error);
    const [date1, date2] = resul.data.split("-to-");
    const { dolarRates, success } = await DollarRateModel.getRange({
      date1,
      date2,
    });

    if (!success) return res.status(500).json({ message: "Server error" });
    if (!dolarRates) return res.status(404).json({ message: "Not found" });
    res.json(dolarRates);
  }

  static async create(req, res) {
    const {
      dolarBCV: { tasa, fecha },
    } = await getInfoBCV();
    const parsedDate = getDate(fecha);
    const parseRate = getRate(tasa);
    const { dolarRate, success } = await DollarRateModel.create({
      rate: parseRate,
      date: parsedDate,
    });
    if (!success) return res.status(500).json({ message: "Server error" });
    if (!dolarRate) return res.status(404).json({ message: "Not found" });
    res.json(dolarRate);
  }
}
