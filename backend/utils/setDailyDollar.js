import { DollarRateModel } from "../models/dollarRate.js";
import getInfoBCV from "./getDollarBCV.js";
import getDate from "./getDate.js";
import getRate from "./getRate.js";
const setDailyDollar = async () => {
  const {
    dolarBCV: { tasa, fecha },
  } = await getInfoBCV();
  const parsedDate = getDate(fecha);
  const parseRate = getRate(tasa);
  const { dolarRate, success } = await DollarRateModel.create({
    rate: parseRate,
    date: parsedDate,
  });
  if (success)
    return console.log(
      "Actualizacion de tasa diaria realizada con exito: ",
      dolarRate
    );
};

export default setDailyDollar;
